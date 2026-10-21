import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";

const DJANGO_API_URL = process.env.DJANGO_API_URL;

// Helper: Decode the JWT expiration timestamp (exp)
function getJwtExp(token: string): number {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedJson = Buffer.from(payloadBase64, "base64").toString("utf-8");
    const payload = JSON.parse(decodedJson);
    return payload.exp ? payload.exp * 1000 : Date.now() + 15 * 60 * 1000;
  } catch {
    return Date.now() + 15 * 60 * 1000; // Fallback: 15 mins
  }
}

// Helper: Request a new access token from Django when expired
async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${DJANGO_API_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token.refreshToken }),
    });

    const refreshedTokens = await res.json();

    if (!res.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires: getJwtExp(refreshedTokens.access),
      // If your Django SimpleJWT has ROTATE_REFRESH_TOKENS=True:
      refreshToken: refreshedTokens.refresh ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Failed to refresh Django access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Django API",
      credentials: {
        email: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // 1. Post credentials to your Django endpoint
          // Note: If Django expects "username", change email to username below:
          const res = await fetch(`${DJANGO_API_URL}/api/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            return null;
          }

          const data = await res.json();

          // 2. Return user object with Django tokens
          if (data && data.access) {
            return {
              id: data.user?.id ? String(data.user.id) : (credentials.email as string),
              name: data.user?.name || (credentials.email as string),
              email: data.user?.email || (credentials.email as string),
              accessToken: data.access,
              refreshToken: data.refresh,
            };
          }

          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // 3. Store tokens inside the NextAuth JWT cookie
    async jwt({ token, user }) {
      // First sign in:
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessToken ? getJwtExp(user.accessToken) : 0,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
      }

      // Return previous token if access token has not expired yet:
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // If access token has expired, refresh it with Django:
      return refreshAccessToken(token);
    },

    // 4. Expose the tokens in the session for use in React components / actions
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;
      if (token.user && session.user) {
        session.user.id = token.user.id ?? "";
        session.user.name = token.user.name;
        session.user.email = token.user.email ?? "";
      }
      return session;
    },
  },
});