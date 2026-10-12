import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { User } from "@/types/user";

type NewUser = Omit<User, "id">;

type UpdateUser = Omit<User, "id">;

const usersFilePath = join(
  process.cwd(),
  "data",
  "users.json",
);

export async function getUsers(): Promise<User[]> {
  const contents = await readFile(
    usersFilePath,
    "utf8",
  );

  return JSON.parse(contents) as User[];
}

export async function getUserById(
  id: string | number,
): Promise<User | undefined> {
  const users = await getUsers();

  const userId = Number(id);

  if (!Number.isInteger(userId)) {
    return undefined;
  }

  return users.find(
    (user) => user.id === userId,
  );
}

export async function hasUserWithEmail(
  email: string,
  excludeUserId?: number,
): Promise<boolean> {
  const users = await getUsers();

  const normalizedEmail = email
    .trim()
    .toLowerCase();

  return users.some((user) => {
    const sameEmail =
      user.email.trim().toLowerCase() ===
      normalizedEmail;

    const differentUser =
      excludeUserId === undefined ||
      user.id !== excludeUserId;

    return sameEmail && differentUser;
  });
}

export async function addUser(
  user: NewUser,
): Promise<User> {
  const users = await getUsers();

  const nextId =
    Math.max(
      0,
      ...users.map(
        (existingUser) => existingUser.id,
      ),
    ) + 1;

  const createdUser: User = {
    id: nextId,
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    role: toDisplayLabel(user.role),
    status: toDisplayLabel(user.status),
  };

  await writeFile(
    usersFilePath,
    `${JSON.stringify(
      [createdUser, ...users],
      null,
      2,
    )}\n`,
    "utf8",
  );

  return createdUser;
}

export async function updateUserById(
  id: number,
  data: UpdateUser,
): Promise<User | undefined> {
  const users = await getUsers();

  const userIndex = users.findIndex(
    (user) => user.id === id,
  );

  if (userIndex === -1) {
    return undefined;
  }

  const updatedUser: User = {
    id,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    role: toDisplayLabel(data.role),
    status: toDisplayLabel(data.status),
  };

  users[userIndex] = updatedUser;

  await writeFile(
    usersFilePath,
    `${JSON.stringify(
      users,
      null,
      2,
    )}\n`,
    "utf8",
  );

  return updatedUser;
}

function toDisplayLabel(
  value: string,
): string {
  const normalizedValue = value
    .trim()
    .toLowerCase();

  if (!normalizedValue) {
    return "";
  }

  return (
    normalizedValue.charAt(0).toUpperCase() +
    normalizedValue.slice(1)
  );
}