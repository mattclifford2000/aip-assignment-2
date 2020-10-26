import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {

    /***
     * NASTY BUG. getItem("loggedIn") returned a string, not a bool, so an
     * if statement was always checking if ('true' == true)
     */
    //  console.log(localStorage.getItem("loggedIn") == true);
    //  console.log(localStorage.getItem("loggedIn") == "true");

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
