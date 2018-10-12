import React from "react";
import { message, Form, Button, Input } from "antd";
import PropTypes from "prop-types";

class AddRole extends React.Component {
  static propTypes = {
    addRoleAction: PropTypes.func
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      var role = { id: 100, roleName: values["roleName"] };

      message.success("新建角色成功");

      this.props.addRoleAction(role);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="ant-form-inline">
        <Form.Item label="角色名">
          {getFieldDecorator("roleName", {
            rules: [{ required: true, message: "请输入角色名!" }]
          })(<Input height="45" placeholder="角色名" />)}
        </Form.Item>
        <Form.Item>
          <Button
            icon="plus-circle"
            height="45"
            type="primary"
            htmlType="submit"
            style={{ marginLeft: 15 }}
          >
            新建角色
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AddRole);
