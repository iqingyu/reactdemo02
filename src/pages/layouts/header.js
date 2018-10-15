import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Avatar, Dropdown, Icon, Menu } from "antd";
import { connect } from "react-redux";

import { logoutAction } from "../../actions/userAction";

import { withRouter } from "react-router-dom";

class HeaderView extends Component {
  static propTypes = {
    username: PropTypes.string,
  };

  handleLogout = e => {
    e.preventDefault();
    console.log("退出登录");
    logoutAction();
    this.props.history.push("/login");
  };

  handleUserIno = e => {
    e.preventDefault();
  };

  menu = (
    <Menu>
      <Menu.Item>
        <a href="#" onClick={this.handleUserIno}>
          个人中心
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#" onClick={this.handleLogout}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Row>
        <Col span={20} />
        <Col>
          <Avatar
            style={{ backgroundColor: "#87d068", marginRight: 10 }}
            icon="user"
          />
          <Dropdown overlay={this.menu}>
            <span
              className="ant-dropdown-link"
              href="#"
              style={{ color: "#fff", cursor: "pointer" }}
            >
              {this.props.username} <Icon type="down" />
            </span>
          </Dropdown>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  let v = {
    username: state.user ? state.user.username : ""
  };
  console.log("header mapStateToProps");
  console.log(state);
  console.log(v);
  return v;
};

HeaderView = connect(mapStateToProps)(withRouter(HeaderView));

export default HeaderView;
