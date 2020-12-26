import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../views/Home";
import About from "../views/About";
import Login from "../views/Login";
import Chat from "../views/Chat";
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/chats/:id" component={Chat} />
        </Switch>
      </CustomThemeProvider>
    </UserProvider>
  );
};

export default App;
