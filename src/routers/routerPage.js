import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "../components/auth";

import MainLayout from "../pages/layouts";
import Login from "../pages/login";

export default class RouterPage extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={Login} />

          {/* 需要登录权限 */}
          <Route path="/" component={Auth(MainLayout)} />
        </Switch>
      </HashRouter>
    );
  }
}
