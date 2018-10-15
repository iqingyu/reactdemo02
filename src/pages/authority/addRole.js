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

      var roleName = values["roleName"];

      var url = "http://localhost:23075/api/user/addRole/";
      fetch(url + roleName, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: ""
      })
        .then(response => response.json())
        .then(data => {
          if (data.ResultCode != 1) {
            message.error(data.ResultMsg);
            return;
          }

          message.success("新建角色成功");
          this.props.form.resetFields(); // 清空表单
          this.props.addRoleAction(true);
        })
        .catch(error => {
          console.log(error);
          message.error("新建角色失败");
        });
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
