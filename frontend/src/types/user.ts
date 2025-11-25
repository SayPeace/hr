export type UserRole = "admin" | "user" | "external";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  jobTitle?: string;
  department?: string;
}
