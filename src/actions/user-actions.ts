"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DJANGO_API_URL = process.env.DJANGO_API_URL;

export type UserFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  values?: any;
};

export async function createUser(prevState: any, formData: FormData) {
  const session = await auth();
  const token = session?.accessToken;

  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }

  if (!token) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    status: formData.get("status"),
  };

  try {
    const res = await fetch(`${DJANGO_API_URL}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rawData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        message: "Failed to create user",
        errors: errorData,
      };
    }

    revalidatePath("/dashboard/users");

    return {
      success: true,
      message: "User created successfully with default password!",
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, message: "A server error occurred." };
  }
}


// Add this to the bottom of src/actions/user-actions.ts

export async function updateUser(id: string | number, prevState: any, formData: FormData) {
  const session = await auth();
  
  // Kick user out if token refresh failed
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login"); 
  }

  const token = session?.accessToken;

  if (!token) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  // Extract the exact fields your UserForm sends
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    status: formData.get("status"),
    is_active: formData.get("status") === "active", 
  };

  try {
    // Note the method is PUT and the URL includes the user ID
    const res = await fetch(`${DJANGO_API_URL}/api/users/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(rawData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { 
        success: false, 
        message: "Failed to update user", 
        errors: errorData 
      };
    }

    // Clear Next.js cache so the updated data shows immediately
    revalidatePath("/dashboard/users");
    revalidatePath(`/dashboard/users/${id}`);
    
    return { 
      success: true, 
      message: "User updated successfully!" 
    };

  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, message: "A server error occurred." };
  }
}