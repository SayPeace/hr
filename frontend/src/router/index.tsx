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
import AdminUsersPage from "../pages/admin/AdminUserPage";
import AdminSettingsPage from "../pages/admin/AdminSettingPage";
import LandingPage from "../pages/LandingPage";
import { RequireAdmin } from "./RequiredAdmin";
import AdminProfilePage from "../pages/admin/AdminProfilePage";



const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />, // 👈 landing
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "tasks", element: <AdminTasksPage /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "settings", element: <AdminSettingsPage /> },
       { path: "profile", element: <AdminProfilePage /> },
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
