import React from "react";
import { Menu, Dropdown, Button, Icon } from "antd";

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

class DropDownsDemo extends React.Component {
  render() {
    return (
      <div>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button>bottomLeft</Button>
        </Dropdown>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button>bottomCenter</Button>
        </Dropdown>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button>bottomRight</Button>
        </Dropdown>

        <br />
        <Dropdown overlay={menu} placement="topLeft">
          <Button>topLeft</Button>
        </Dropdown>
        <Dropdown overlay={menu} placement="topCenter">
          <Button>topCenter</Button>
        </Dropdown>
        <Dropdown overlay={menu} placement="topRight">
          <Button>topRight</Button>
        </Dropdown>

        <br />
        <Dropdown.Button overlay={menu}>Dropdown</Dropdown.Button>

        <br />

        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link">
            Click me <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    );
  }
}

export default DropDownsDemo;
