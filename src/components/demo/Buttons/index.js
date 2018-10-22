import React from "react";
import { Button } from "antd";

class ButtonsDemo extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "red" }}>
        <Button size="large">large button</Button>
        <Button size="default">default button</Button>
        <Button size="small">small button</Button>

        <Button shape="circle" icon="search" />

        <Button type="primary">primary button</Button>
        <Button type="ghost">ghost button(透明)</Button>
        <Button type="default">default button</Button>
        <Button type="dashed">dashed button</Button>
        <Button type="danger">danger button</Button>

        <Button disabled>disabled button</Button>

        <Button loading={true}>loading button</Button>
      </div>
    );
  }
}

export default ButtonsDemo;
