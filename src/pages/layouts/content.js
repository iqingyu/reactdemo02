import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import UserList from "../authority/userList";
import RoleList from "../authority/roleList";
import MenuList from "../authority/menuList";
import AllocationMenu from "../authority/allocationMenu";

export default class ContentView extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/userList" exact component={UserList} />
          <Route path="/roleList" exact component={RoleList} />
          <Route path="/menuList" exact component={MenuList} />          
          <Route path="/allocationMenu" exact component={AllocationMenu} />
        </Switch>
      </div>
    );
  }
}
