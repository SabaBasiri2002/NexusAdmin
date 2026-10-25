"use server";

import { auth } from "@/auth"; // Adjust to where your auth() is exported
import { revalidatePath } from "next/cache";

const DJANGO_API_URL = process.env.DJANGO_API_URL;

export async function createProduct(prevState: any, formData: FormData) {
  // 1. Get the current NextAuth session to grab the Django access token
  const session = await auth();
  const token = session?.accessToken;

  if (!token) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  // 2. Extract the raw data from your form
  const rawData = {
    name: formData.get("name"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    status: formData.get("status") || "inactive",
    category: formData.get("category") || "displays",
  };

  try {
    // 3. Send the POST request to Django
    const res = await fetch(`${DJANGO_API_URL}/api/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Pass the JWT here
      },
      body: JSON.stringify(rawData),
    });

    if (!res.ok) {
      // Django DRF returns specific field errors (e.g., {"price": ["A valid number is required."]})
      const errorData = await res.json();
      return { 
        success: false, 
        message: "Failed to create product", 
        errors: errorData 
      };
    }

    // 4. Clear the Next.js cache so the new product instantly appears on the table
    revalidatePath("/dashboard/products");
    
    return { 
      success: true, 
      message: "Product created successfully!" 
    };

  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, message: "A server error occurred." };
  }
}


export type ProductFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  values?: any;
};

export async function updateProduct(id: string | number, prevState: any, formData: FormData) {
  const session = await auth();
  const token = session?.accessToken;

  if (!token) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  const rawData = {
    name: formData.get("name"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    status: formData.get("status") || "inactive",
    category: formData.get("category") || "displays",
  };

  try {
    // Target the specific product ID and use PUT to update
    const res = await fetch(`${DJANGO_API_URL}/api/products/${id}/`, {
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
        message: "Failed to update product", 
        errors: errorData 
      };
    }

    // Clear the cache for both the list and the specific product page
    revalidatePath("/dashboard/products");
    revalidatePath(`/dashboard/products/${id}`);
    
    return { 
      success: true, 
      message: "Product updated successfully!" 
    };

  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, message: "A server error occurred." };
  }
}