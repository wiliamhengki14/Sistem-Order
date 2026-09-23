import type { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import ListOrder from "../pages/ListOrder";
import DetailOrder from "../pages/DetailOrder";
import CreateOrder from "../pages/CreateOrder";
const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <ProtectedRoute><Login/></ProtectedRoute>
    },
    {
        path: '/orders',
        element: <ProtectedRoute><ListOrder/></ProtectedRoute>
    },
    {
        path: '/orders/:id',
        element: <ProtectedRoute><DetailOrder /></ProtectedRoute>
    },
    {
        path: '/create',
        element: <ProtectedRoute><CreateOrder /></ProtectedRoute>
    }
]

export default routes;