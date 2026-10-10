import {
  readFile,
  writeFile,
} from "node:fs/promises";

import { join } from "node:path";

import type { User } from "@/types/user";

type NewUser = Pick<
  User,
  | "name"
  | "email"
  | "role"
  | "status"
>;

type UpdateUser = Pick<
  User,
  | "name"
  | "email"
  | "role"
  | "status"
>;

const usersFilePath = join(
  process.cwd(),
  "data",
  "users.json",
);

export async function getUsers(): Promise<User[]> {
  console.log(
    "[USERS] Reading fresh users:",
    new Date().toISOString(),
  );

  try {
    const contents =
      await readFile(
        usersFilePath,
        "utf8",
      );

    return JSON.parse(
      contents,
    ) as User[];
  } catch (error) {
    console.error(
      "Failed to load users:",
      error,
    );

    throw new Error(
      "Failed to load users.",
    );
  }
}

export async function getUserById(
  id: string | number,
): Promise<User | undefined> {
  const users =
    await getUsers();

  const userId =
    Number(id);

  if (
    !Number.isInteger(userId)
  ) {
    return undefined;
  }

  return users.find(
    (user) =>
      user.id === userId,
  );
}

export async function hasUserWithEmail(
  email: string,
  excludeUserId?: number,
): Promise<boolean> {
  const users =
    await getUsers();

  const normalizedEmail =
    email
      .trim()
      .toLowerCase();

  return users.some(
    (user) => {
      const sameEmail =
        user.email
          .trim()
          .toLowerCase() ===
        normalizedEmail;

      const differentUser =
        excludeUserId ===
          undefined ||
        user.id !==
          excludeUserId;

      return (
        sameEmail &&
        differentUser
      );
    },
  );
}

export async function addUser(
  user: NewUser,
): Promise<User> {
  const users =
    await getUsers();

  const nextId =
    Math.max(
      0,
      ...users.map(
        (existingUser) =>
          existingUser.id,
      ),
    ) + 1;

  const createdUser: User = {
    id: nextId,

    name: user.name.trim(),

    email: user.email
      .trim()
      .toLowerCase(),

    role: toDisplayLabel(
      user.role,
    ),

    status: toDisplayLabel(
      user.status,
    ),

    createdAt:
      new Date().toISOString(),
  };

  await writeUsers([
    createdUser,
    ...users,
  ]);

  return createdUser;
}

export async function updateUserById(
  id: number,
  data: UpdateUser,
): Promise<User | undefined> {
  const users =
    await getUsers();

  const userIndex =
    users.findIndex(
      (user) =>
        user.id === id,
    );

  if (userIndex === -1) {
    return undefined;
  }

  const existingUser =
    users[userIndex];

  const updatedUser: User = {
    ...existingUser,

    id,

    name: data.name.trim(),

    email: data.email
      .trim()
      .toLowerCase(),

    role: toDisplayLabel(
      data.role,
    ),

    status: toDisplayLabel(
      data.status,
    ),
  };

  users[userIndex] =
    updatedUser;

  await writeUsers(users);

  return updatedUser;
}

export async function deleteUserById(
  id: number,
): Promise<boolean> {
  const users =
    await getUsers();

  const updatedUsers =
    users.filter(
      (user) =>
        user.id !== id,
    );

  if (
    updatedUsers.length ===
    users.length
  ) {
    return false;
  }

  await writeUsers(
    updatedUsers,
  );

  return true;
}

async function writeUsers(
  users: User[],
) {
  await writeFile(
    usersFilePath,
    `${JSON.stringify(
      users,
      null,
      2,
    )}\n`,
    "utf8",
  );
}

function toDisplayLabel(
  value: string,
): string {
  const normalized =
    value
      .trim()
      .toLowerCase();

  if (!normalized) {
    return "";
  }

  return (
    normalized
      .charAt(0)
      .toUpperCase() +
    normalized.slice(1)
  );
}