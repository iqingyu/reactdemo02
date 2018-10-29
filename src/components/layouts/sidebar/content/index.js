import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import UserList from "../../../authority/userList";
import RoleList from "../../../authority/roleList";
import MenuList from "../../../authority/menuList";

import ButtonsDemo from "../../../demo/Buttons";
import GridsDemo from "../../../demo/Grids";
import AffixsDemo from "../../../demo/Affixs";
import DropDownsDemo from "../../../demo/DropDowns";

import StepsDemo from "../../../demo/Steps";
import CompletesDemo from "../../../demo/AutoComplete";

import CascadersDemo from "../../../demo/Cascader";
import CheckBoxsDemo from "../../../demo/CheckBoxs";
import DatePickersDemo from "../../../demo/DatePickers";
import FormsDemo from "../../../demo/Forms";
import InputsDemo from "../../../demo/Inputs";
import BadgesDemo from "../../../demo/Badges";
import CalendarsDemo from "../../../demo/Calendars";
import CardsDemo from "../../../demo/Cards";
import NotificationsDemo from "../../../demo/Notifications";
import ProgressesDemo from '../../../demo/Progresses';
import PopconfirmsDemo from '../../../demo/Popconfirms';
import ListsDemo from '../../../demo/Lists';
import TabsDemo from '../../../demo/Tabs';
import TransfersDemo from '../../../demo/Transfers';


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
          <Route path="/stepsDemo" exact component={StepsDemo} />
          <Route path="/completesDemo" exact component={CompletesDemo} />
          <Route path="/cascadersDemo" exact component={CascadersDemo} />
          <Route path="/checkBoxsDemo" exact component={CheckBoxsDemo} />
          <Route path="/datePickersDemo" exact component={DatePickersDemo} />
          <Route path="/formsDemo" exact component={FormsDemo} />
          <Route path="/inputsDemo" exact component={InputsDemo} />
          <Route path="/badgesDemo" exact component={BadgesDemo} />
          <Route path="/calendarsDemo" exact component={CalendarsDemo} />
          <Route path="/cardsDemo" exact component={CardsDemo} />
          <Route path="/notificationsDemo" exact component={NotificationsDemo} />
          <Route path="/progressesDemo" exact component={ProgressesDemo} />
          <Route path="/popconfirmsDemo" exact component={PopconfirmsDemo} />
          <Route path="/listsDemo" exact component={ListsDemo} />
          <Route path="/tabsDemo" exact component={TabsDemo} />
          <Route path="/transfersDemo" exact component={TransfersDemo} />
          

          
        </Switch>
      </div>
    );
  }
}

