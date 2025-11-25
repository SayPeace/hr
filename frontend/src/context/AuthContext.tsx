import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
import type { User } from "../types/user";
import { defaultUser, DEFAULT_PASSWORD } from "../mock/users";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load from localStorage on first mount (optional but nice)
  useEffect(() => {
    const stored = localStorage.getItem("saypeace_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login logic for now
    if (email === defaultUser.email && password === DEFAULT_PASSWORD) {
      setUser(defaultUser);
      localStorage.setItem("saypeace_user", JSON.stringify(defaultUser));
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("saypeace_user");
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem("saypeace_user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
