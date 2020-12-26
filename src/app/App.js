import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import Home from "../views/Home";
import About from "../views/About";
import Login from "../views/Login";
import Chat from "../views/Chat";
import Dashboard from "../views/Dashboard";
import Nav from "../components/Nav";

import CustomThemeProvider from "../components/ThemeContext";
import UserProvider from "../components/UserContext";

const App = () => {
  return (
    <UserProvider>
      <CustomThemeProvider>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <PublicRoute
            exact
            path="/login"
            component={Login}
            reroute="/dashboard"
          />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            reroute="/login"
          />
          <PrivateRoute
            exact
            path="/chats/:id"
            component={Chat}
            reroute="/login"
          />
        </Switch>
      </CustomThemeProvider>
    </UserProvider>
  );
};

export default App;
