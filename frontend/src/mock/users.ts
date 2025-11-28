import type { AuthUser } from "../types/user";

export const defaultUser: AuthUser = {
  id: "u1",
  name: "Usman Umar Garba",
  email: "user@saypeace.com",
  role: "user",
  avatarUrl: "https://pbs.twimg.com/profile_images/1865509128254185472/qb8qK5B2_400x400.jpg",
  jobTitle: "Software Engineer",
  department: "Engineering",
  
};

// And a default password just for frontend demo
export const DEFAULT_PASSWORD = "password123";
