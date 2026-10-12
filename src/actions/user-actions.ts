"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  addUser,
  deleteUserById,
  getUserById,
  hasUserWithEmail,
  updateUserById,
} from "@/lib/data";

import {
  userSchema,
} from "@/lib/validation";

export type UserFormState = {
  success: boolean;

  errors?: {
    name?: string[];
    email?: string[];
    role?: string[];
    status?: string[];
  };

  message?: string;

  values?: {
    name: string;
    email: string;
    role: string;
    status: string;
  };
};

export async function createUser(
  _previousState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  const values =
    getFormValues(formData);

  const result =
    userSchema.safeParse(
      values,
    );

  if (!result.success) {
    const {
      fieldErrors,
    } = result.error.flatten();

    return {
      success: false,
      errors: fieldErrors,
      message:
        "Please fix the errors before continuing.",
      values,
    };
  }

  const emailExists =
    await hasUserWithEmail(
      String(result.data.email),
    );

  if (emailExists) {
    return {
      success: false,

      errors: {
        email: [
          "A user with this email already exists.",
        ],
      },

      message:
        "Please fix the errors before continuing.",

      values,
    };
  }

  await addUser(
    result.data as Parameters<typeof addUser>[0],
  );

  revalidatePath(
    "/dashboard/users",
  );

  revalidatePath(
    "/dashboard",
  );

  redirect(
    "/dashboard/users",
  );
}

export async function updateUser(
  userId: number,
  _previousState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  const values =
    getFormValues(formData);

  const result =
    userSchema.safeParse(
      values,
    );

  if (!result.success) {
    const {
      fieldErrors,
    } = result.error.flatten();

    return {
      success: false,
      errors: fieldErrors,
      message:
        "Please fix the errors before continuing.",
      values,
    };
  }

  const existingUser =
    await getUserById(
      userId,
    );

  if (!existingUser) {
    return {
      success: false,
      message:
        "User could not be found.",
      values,
    };
  }

  const emailExists =
    await hasUserWithEmail(
      String(result.data.email),
      userId,
    );

  if (emailExists) {
    return {
      success: false,

      errors: {
        email: [
          "A user with this email already exists.",
        ],
      },

      message:
        "Please fix the errors before continuing.",

      values,
    };
  }

  await updateUserById(
    userId,
    values,
  );

  revalidatePath(
    "/dashboard/users",
  );

  revalidatePath(
    `/dashboard/users/${userId}`,
  );

  revalidatePath(
    "/dashboard",
  );

  redirect(
    "/dashboard/users",
  );
}

export async function deleteUser(
  userId: number,
) {
  if (
    !Number.isInteger(
      userId,
    ) ||
    userId <= 0
  ) {
    return {
      success: false,
      message:
        "Invalid user ID.",
    };
  }

  const deleted =
    await deleteUserById(
      userId,
    );

  if (!deleted) {
    return {
      success: false,
      message:
        "User could not be found.",
    };
  }

  revalidatePath(
    "/dashboard/users",
  );

  revalidatePath(
    "/dashboard",
  );

  return {
    success: true,
  };
}

function getFormValues(
  formData: FormData,
) {
  return {
    name: String(
      formData.get(
        "name",
      ) ?? "",
    ),

    email: String(
      formData.get(
        "email",
      ) ?? "",
    ),

    role: String(
      formData.get(
        "role",
      ) ?? "",
    ),

    status: String(
      formData.get(
        "status",
      ) ?? "",
    ),
  };
}