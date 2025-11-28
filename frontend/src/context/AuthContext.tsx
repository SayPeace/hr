// frontend/src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "admin" | "user" | "external";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  jobTitle?: string;
  avatarUrl?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

// Default admin + one normal user (mock only)
const MOCK_USERS: AuthUser[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@saypeace.com",
    role: "admin",
    jobTitle: "HR Admin",
  },
  {
    id: "2",
    name: "Test Employee",
    email: "user@saypeace.com",
    role: "user",
    jobTitle: "Operations Staff",
  },
];

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (email: string, password: string) => {
    // 🔐 DEV-ONLY: hardcoded password
    const PASSWORD = "password123";

    const found = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!found || password !== PASSWORD) {
      throw new Error("Invalid email or password");
    }

    setUser(found);
    return found; // so caller can redirect based on role
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
