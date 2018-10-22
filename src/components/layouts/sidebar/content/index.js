import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import UserList from "../../../authority/userList";
import RoleList from "../../../authority/roleList";
import MenuList from "../../../authority/menuList";

import ButtonsDemo from "../../../demo/Buttons";
import GridsDemo from "../../../demo/Grids";
import AffixsDemo from "../../../demo/Affixs";
import DropDownsDemo from "../../../demo/DropDowns";

export default class ContentView extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/userList" exact component={UserList} />
          <Route path="/roleList" exact component={RoleList} />
          <Route path="/menuList" exact component={MenuList} />
          <Route path="/buttonsDemo" exact component={ButtonsDemo} />
          <Route path="/gridsDemo" exact component={GridsDemo} />
          <Route path="/affixsDemo" exact component={AffixsDemo} />
          <Route path="/dropDownsDemo" exact component={DropDownsDemo} />
        </Switch>
      </div>
    );
  }
}
