import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PropTypes {
    children: ReactNode;
}

const ProtectedRoute = (props: PropTypes) => {
    const {children} = props;
    const auth = localStorage.getItem('auth');
    const currentLogin = useLocation().pathname;

    if(!auth && currentLogin !== '/login') {
        return <Navigate to='/login'/>
    }
    if(auth && currentLogin === '/login') {
        return <Navigate to='/orders'/>
    }

    return <>{children}</>
}

export default ProtectedRoute;