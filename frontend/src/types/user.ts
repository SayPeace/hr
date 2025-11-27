export type UserRole = "admin" | "user" | "external";

export interface User {
  [x: string]: string;
  [x: string]: string;
  [x: string]: string;
  phone: string;
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  jobTitle?: string;
  department?: string;
}
