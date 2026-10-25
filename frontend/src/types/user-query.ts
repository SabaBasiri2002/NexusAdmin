export const userSortFields = [
  "name",
  "email",
  "role",
  "status",
  "createdAt",
] as const;

export type UserSortKey =
  (typeof userSortFields)[number];

export type SortOrder =
  | "asc"
  | "desc";

export type UserQuery = {
  search?: string;
  role?: string;
  status?: string;
  sort?: UserSortKey;
  order: SortOrder;
  page: number;
};