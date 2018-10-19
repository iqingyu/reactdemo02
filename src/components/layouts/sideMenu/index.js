import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import './index.less'

class SideMenuView extends Component {
  static propTypes = {
    menuList: PropTypes.array
  };

  getMenu = data => {
    return data.map(menu => (
      <Menu.SubMenu
        key={menu.name}
        title={
          <span>
            <Icon type={menu.icon} />
            <span>{menu.name}</span>
          </span>
        }
      >
        {menu &&
          menu.children.map(child => (
            <Menu.Item key={child.path}>
              <Link to={child.path}> {child.name} </Link>
            </Menu.Item>
          ))}
      </Menu.SubMenu>
    ));
  };

  render() {
    return (
      <div>
        <div className="app-appname">{window.YWGlobal.appName}</div>
        <Menu mode="vertical-right">{this.getMenu(this.props.menuList)}</Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let v = {
    menuList: state.user ? state.user.menuList || [] : []
  };
  console.log("menu: mapStateToProps");
  console.log(state);
  console.log(v);
  return v;
};

SideMenuView = connect(mapStateToProps)(SideMenuView);

export default SideMenuView;
