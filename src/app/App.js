import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../views/Home";
import About from "../views/About";
import Login from "../views/Login";
import Nav from "../components/Nav";

import CustomThemeProvider from "../components/ThemeContext";

const App = () => {
  return (
    <CustomThemeProvider>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
