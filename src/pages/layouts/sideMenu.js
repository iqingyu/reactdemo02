import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class SideMenuView extends Component {
  static propTypes = {
    menuList: PropTypes.array
  };

  getMenu = data => {
    console.log("data : getmenu");
    console.log(data);
    var r = data.map(menu => (
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

    console.log(r);

    return r;
  };

  render() {
    return (
      <div>
        <div style={{ height: "64px", background: "#20a0ff" }} />
        <Menu mode="vertical-right">{this.getMenu(this.props.menuList)}</Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let v = {
    menuList: state.user.userData.menuList
  };
  console.log("menu: mapStateToProps");
  console.log(state);
  console.log(v);
  return v;
};

SideMenuView = connect(mapStateToProps)(SideMenuView);

export default SideMenuView;