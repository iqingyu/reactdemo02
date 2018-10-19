import { Layout, Icon, Row, Col } from "antd";
import React, { Component } from "react";

import HeaderView from "../header";
import SideMenuView from "../sideMenu";
import ContentView from "../content";

import "antd/dist/antd.css";
import './index.less';

const { Header, Content, Sider } = Layout;


export default class SidebarLayout extends Component {
  state = {
    collapsed: false,
    mode: "inline"
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout className="height100percent">
        <Sider
          className="whiteBackground"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <SideMenuView />
        </Sider>
        <Layout>
          <Header className="app-header">
            <Row>
              <Col span={4}>
                <span className="app-menu-button">
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.toggle}
                    style={{ cursor: "pointer" }}
                  />
                </span>
              </Col>
              <Col span={20}>
                <HeaderView />
              </Col>
            </Row>
          </Header>
          <Content className="app-content">
            <ContentView />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
