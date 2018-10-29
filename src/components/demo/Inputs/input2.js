import React from "react";
import { Rate, Icon } from "antd";

class InputsDemo extends React.Component {
  render() {
    return (
      <div className="whiteBackground">
        <Rate character={<Icon type="heart" />} allowHalf defaultValue={2.5} />
        <br />
        <Rate
          character="A"
          allowHalf
          style={{ fontSize: 36 }}
          defaultValue={2.5}
        />
        <br />
        <Rate character="好" allowHalf defaultValue={2.5} />
      </div>
    );
  }
}

export default InputsDemo;
