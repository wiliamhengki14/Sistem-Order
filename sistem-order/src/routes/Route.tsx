import type { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import ListOrder from "../pages/ListOrder";
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
    }
]

export default routes;