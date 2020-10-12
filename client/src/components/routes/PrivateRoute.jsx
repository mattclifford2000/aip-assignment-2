import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();
  const auth = localStorage.getItem("loggedIn");

  return (
    <Route
      {...rest}
      render={
        (props) =>
          localStorage.getItem("loggedIn") == true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        /*if (localStorage.getItem('loggedIn') == true)
        {
(<Component {...props} />
        }
        else
        {
          (<Redirect to="/login" />)
          
        }
        */
      }
    />
  );
}

export default PrivateRoute;
