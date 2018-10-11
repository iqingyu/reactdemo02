import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import UserList from "../authority/userList";
import RoleList from "../authority/roleList";

export default class ContentView extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/userList" exact component={UserList} />
          <Route path="/roleList" exact component={RoleList} />
        </Switch>
      </div>
    );
  }
}
