"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
// import { loginSchema } from "./validation";

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function logoutAction() {
  await signOut({
    redirectTo: "/login",
  });
}

function getSafeRedirectPath(callbackUrl: FormDataEntryValue | null) {
  if (typeof callbackUrl !== "string") {
    return "/dashboard";
  }

  try {
    const url = new URL(callbackUrl, "http://localhost");
    const path = `${url.pathname}${url.search}${url.hash}`;

    return path.startsWith("/") ? path : "/dashboard";
  } catch {
    return "/dashboard";
  }
}

export async function loginAction(
  previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe") === "on",
  };
  // const result = loginSchema.safeParse(rawData);
  // if (!result.success) {
  //   return {
  //     success: false,
  //     errors: z.flattenError(result.error).fieldErrors,
  //     message: "Please check the form fields.",
  //   };
  // }
  const { email, password } = rawData;
  const redirectTo = getSafeRedirectPath(formData.get("callbackUrl"));

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }
    throw error;
  }

  return {
    success: true,
    message: "Validation successful.",
  };
}
