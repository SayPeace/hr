// frontend/src/routes/RequireAdmin.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

export const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={`/login?mode=admin`}
        replace
        state={{ from: location }}
      />
    );
  }

  if (user.role !== "admin") {
    // Non-admin trying to hit /admin → send to /app
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
};
