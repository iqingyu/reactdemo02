import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "../components/auth";

// 引入所有基础配置
import "../configs/globalConfig";
import "../configs/globalStore";

import MainLayout from "../pages/layouts";
import Login from "../pages/login";

export default class RouterPage extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login} />

          {/* 需要登录权限 */}
          <Route path="/" component={Auth(MainLayout)} />
        </Switch>
      </BrowserRouter>
    );
  }
}
