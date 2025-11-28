// src/mock/adminUsers.ts
export type AdminUserRole = "admin" | "user" | "external";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  isActive: boolean;
  jobTitle?: string;
  department?: string;
  createdAt: string;
  lastActiveAt?: string;
}

const daysFromNow = (days: number) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

export const mockAdminUsers: AdminUser[] = [
  {
    id: "u1",
    name: "Usman Umar Garba",
    email: "usman@saypeace.com",
    role: "admin",
    isActive: true,
    jobTitle: "Operations Lead",
    department: "Operations",
    createdAt: daysFromNow(-120),
    lastActiveAt: daysFromNow(-1),
  },
  {
    id: "u2",
    name: "Yakubu Sani",
    email: "yakubu.doe@saypeace.com",
    role: "user",
    isActive: true,
    jobTitle: "HR Officer",
    department: "HR",
    createdAt: daysFromNow(-60),
    lastActiveAt: daysFromNow(-2),
  },
  {
    id: "u3",
    name: "Salisu Gaya",
    email: "salisu@saypeace-contracts.com",
    role: "external",
    isActive: true,
    jobTitle: "Contractor",
    department: "External",
    createdAt: daysFromNow(-30),
    lastActiveAt: daysFromNow(-5),
  },
  {
    id: "u4",
    name: "Ubaida Muhammad",
    email: "ubaidah.connor@saypeace.com",
    role: "user",
    isActive: false,
    jobTitle: "Analyst",
    department: "Finance",
    createdAt: daysFromNow(-200),
    lastActiveAt: daysFromNow(-40),
  },
];
