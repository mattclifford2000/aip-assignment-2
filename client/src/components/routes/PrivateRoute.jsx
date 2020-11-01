import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
    if (localStorage.getItem("loggedIn") === "true") {
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
        console.log("Redirecting to Login, not authed!");
        return (
            <Route
                {...rest}
                render={
                    (props) =>
                        <Redirect to="/login" />
                }
            />
        )
    }
}

export default PrivateRoute;
