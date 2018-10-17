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

      let roleName = values["roleName"];

      let url =
        window.YWGlobal.baseApi + window.YWGlobal.apiNames.ADDROLE + roleName;
      let option = window.YWFetch.getDefaultOption();
      option.callback = (success, data) => {
        if (!success || !data) {
          message.error("保存角色失败");
          return;
        }

        if (data.ResultCode != 1) {
          message.error(data.ResultMsg);
          return;
        }

        message.success("保存角色成功");
        this.props.form.resetFields(); // 清空表单
        this.props.addRoleAction(true);
      };

      window.YWFetch.post(url, "", option);
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
