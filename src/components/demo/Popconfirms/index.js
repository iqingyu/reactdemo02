import React from "react";
import { Popconfirm, message } from "antd";

export default class PopconfirmsDemo extends React.Component {
  handleConfirm = e => {
    console.log(e);
    message.success("Click on Yes");
  };

  handleCancel = e => {
    console.log(e);
    message.error("Click on No");
  };

  render() {
    return (
      <Popconfirm
        title="Are you sure delete this task?"
        onConfirm={this.handleConfirm}
        onCancel={this.handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <a>Delete</a>
      </Popconfirm>
    );
  }
}
