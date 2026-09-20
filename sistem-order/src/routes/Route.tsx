import type { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login/>
    }
]

export default routes;