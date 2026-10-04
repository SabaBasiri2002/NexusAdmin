import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = Boolean(auth?.user);
      const isOnLogin = request.nextUrl.pathname.startsWith("/login");
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      if (isOnLogin) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", request.nextUrl));
        }
        return true;
      }

      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      }

      return true;
    },
  },

  providers: [],
};