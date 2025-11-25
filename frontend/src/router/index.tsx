import { useRoutes, type RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import UserDashboard from "../pages/dashboard/UserDashboard";
import TaskListPage from "../pages/tasks/TaskListPage";


const routes: RouteObject[] = [
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <UserDashboard />,
            },
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "admin",
                element: <AdminDashboard />,
            },
            {
                path: "dashboard",
                element: <UserDashboard />,
            },
            {
                path: "tasks",
                element: <TaskListPage />,
            },

        ],
    },
];

export const AppRouter = () => {
    return useRoutes(routes);
};
