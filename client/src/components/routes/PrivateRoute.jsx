import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
    const { authTokens } = useAuth();
    const auth = localStorage.getItem("loggedIn");
    console.log(localStorage.getItem("loggedIn"));

    if (localStorage.getItem("loggedIn") == true){
        return (
            <Route
                {...rest}
                render={
                    (props) =>
                        <Component {...props}
                    />
                }
            />
        )
    } else {
        return (
            <Route
                {...rest}
                render={
                    (props) =>
                        <Component {...props}
                        />
                }
            />
        )
    }
}

export default PrivateRoute;
