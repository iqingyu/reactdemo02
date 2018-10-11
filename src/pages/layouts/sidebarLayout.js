import { Layout, Icon, Row, Col } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import HeaderView from './header.js';
import FooterView from './footer.js';
import SideMenuView from './sideMenu.js';
import ContentView from './content.js';

const { Header, Content, Footer, Sider } = Layout;




export default class SidebarLayout extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout style={{height:'100%'}}>
                <Sider
                    style={{background:'#FFFFFF'}}
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}>
                    <SideMenuView />
                </Sider>
                <Layout>
                    <Header style={{ background: '#20a0ff', padding: 0 }}>
                        
                        <Row>
                            <Col span={4}>
                                <span style={{color:'#FFFFFF', paddingLeft:'16px', fontSize:'1.4em'}}>
                                <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle}
                                        style={{cursor: 'pointer'}}
                                    />
                                </span>
                            </Col>
                             <Col span={20}>
                                <HeaderView />   
                            </Col>
                        </Row>                             
                    </Header>
                    <Content style={{height:'86vh',paddingRight:'2%',overflow:'auto',textAlign:'center'}}>
                       <ContentView />
                    </Content>
                    {/* <Footer>
                        <FooterView />
                    </Footer> */}
                </Layout>
            </Layout>
        );
    }
}
