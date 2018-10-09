import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Avatar, Dropdown, Icon, Menu } from "antd";
import { connect } from "react-redux";

const menu = (
  <Menu>
    <Menu.Item>退出登录</Menu.Item>
  </Menu>
);

class HeaderView extends Component {
  static propTypes = {
    username: PropTypes.string,
    usericon: PropTypes.string
  };

  render() {
    return (
      <Row>
        <Col span={20} />
        <Col>
          <Avatar
            style={{ backgroundColor: "#87d068", marginRight: 10 }}
            icon="user"
          />
          <Dropdown overlay={menu}>
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
        username: state.user.username,
        usericon: state.user.usericon
    }
    console.log("mapStateToProps");
    console.log(state);
    console.log(v);
    return v;
};

HeaderView = connect(mapStateToProps)(HeaderView);

export default HeaderView;
