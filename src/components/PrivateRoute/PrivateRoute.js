import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../UserContext";

function PrivateRoute({ component: Component, reroute, ...rest }) {
  const { user } = React.useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: reroute, state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
