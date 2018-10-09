import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon, Row, Col } from 'antd';
 
export default class SideMenuView extends Component {
 
    render() {
        return (
        <div>
            <div style={{height:'64px', background: '#20a0ff'}} />
            <Menu mode="inline" defaultSelectedKeys={['test1']}>
                <Menu.Item key="test1" >
                    <Row>
                        <Col span={4}>
                            <Icon type="user" />
                        </Col>
                        <Col >
                        <Link to={'/test1'} style={{color:'#000000'}}>价格列表</Link>                    
                        </Col>
                    
                    </Row>
                </Menu.Item>                
            </Menu>
        </div>
        );
    }
}
