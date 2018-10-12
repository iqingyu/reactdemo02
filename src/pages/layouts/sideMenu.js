import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";

export default class SideMenuView extends Component {
  render() {
    return (
      <div>
        <div style={{ height: "64px", background: "#20a0ff" }} />
        <Menu mode="vertical-right">
          <Menu.SubMenu
            key="user"
            title={
              <span>
                <Icon type="mail" />
                <span>用户及权限</span>
              </span>
            }
          >
            <Menu.Item key="userList">
              <Link to="/userList"> 用户列表 </Link>
            </Menu.Item>
            <Menu.Item key="roleList">
              <Link to="/roleList"> 角色列表 </Link>
            </Menu.Item>
            <Menu.Item key="menuList">
              <Link to="/menuList"> 菜单列表 </Link>
            </Menu.Item>
            <Menu.Item key="allocationMenu">
              <Link to="/allocationMenu"> 分配菜单 </Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    );
  }
}
