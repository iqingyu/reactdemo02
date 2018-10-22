import React from "react";
import { HashRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import Auth from "../auth";
import MainLayout from "../layouts";
import Login from "../login";

export default class RouterPage extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" component={Auth(MainLayout)} />
        </Switch>
      </HashRouter>
    );
  }
}
