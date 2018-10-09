import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch, Redirect } from "react-router";
import Auth from '../components/auth';

// 引入所有基础配置
import "../configs/globalConfig";
import "../configs/globalStore";

import Store from "../components/store";

import MainLayout from "../pages/layouts";
import Login from "../pages/login";

export default class RouterPage extends React.Component {
  updateHandle() {
    console.log("每次router变化之后都会触发");
  }

  requireAuth(nextState, replaceState) {
    var userinfo = Store.get("user");
    if (!userinfo) {
      console.log("用户未登录");
      replaceState({ nextPathname: nextState.location.pathname }, "/login");
      return;
    }
  }

  render() {
    return (
      <BrowserRouter onUpdate={this.updateHandle.bind(this)}>
        <Switch>
          <Route path="/login" exact component={Login} />
          
          {/* 需要登录权限 */}
          <Route
            path = "/"
            exact
            component = { Auth(MainLayout) }
          >
          </Route>
          <Redirect to={"/"} />
        </Switch>
      </BrowserRouter>
    );
  }
}
