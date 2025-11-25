import { type RouteObject, useRoutes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminTasksPage from "../pages/admin/AdminTaskPages";
import UserDashboardPage from "../pages/user/UserDashboardPage";
import UserTasksPage from "../pages/user/UserTaskPages";
import { RequireAuth } from "./RequiredAuth";
import UserProfilePage from "../pages/user/UserProfilePage";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "tasks", element: <AdminTasksPage /> },
    ],
  },
  {
    path: "/app",
    element: (
      <RequireAuth>
        <UserLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <UserDashboardPage /> },
      { path: "tasks", element: <UserTasksPage /> },
      { path: "profile", element: <UserProfilePage /> },
    ],
  },
];

export const AppRouter = () => useRoutes(routes);
