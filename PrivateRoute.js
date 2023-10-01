import {Navigate,Outlet} from "react-router-dom";

import React from "react";
import spinner from "./spinner";
import useAuthState from "./../hooks/useAuthState";

const PrivateRoute = () => {
    const {loggedIn, checkState} = useAuthState();

    if(checkState){
        return <spinner/>;
    }

    return loggedIn ? <Outlet/> : <Navigate to="/signin"/>;
};

export default PrivateRoute;