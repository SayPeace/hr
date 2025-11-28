// src/types/user.ts

// frontend/src/types/user.ts
export type UserRole = "admin" | "user" | "external";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  jobTitle?: string;
  department?: string;
}

export interface AdminUser extends AuthUser {
  status?: "active" | "inactive";
  createdAt?: string;
}