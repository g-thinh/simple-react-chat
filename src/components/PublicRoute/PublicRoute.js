import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../UserContext";

export function PublicRoute({ component: Component, reroute, ...rest }) {
  const { user } = React.useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user.isLoggedIn === false ? (
          <Component {...props} />
        ) : (
          <Redirect to={reroute} />
        )
      }
    />
  );
}

export default PublicRoute;
