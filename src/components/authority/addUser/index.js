import React from "react";
import { message, Form, Button, Input, Modal, Select } from "antd";
import PropTypes from "prop-types";

import { formItemLayout, tailFormItemLayout } from "../../../styles/formStyles";

const Option = Select.Option;

class AddUser extends React.Component {
  static propTypes = {
    addUserAction: PropTypes.func
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let url = window.YWGlobal.baseApi + window.YWGlobal.apiNames.ADDUSER;
      let option = window.YWFetch.getDefaultOption();
      option.callback = (success, data) => {
        if (!success || !data) {
          message.error("保存用户失败");
          return;
        }

        if (data.ResultCode != 1) {
          message.error(data.ResultMsg);
          return;
        }

        message.success("保存用户成功");
        this.props.form.resetFields(); // 清空表单
        this.props.addUserAction(true);
      };

      window.YWFetch.post(url, JSON.stringify(values), option);
    });
  };

  cancel = () => {
    this.props.form.resetFields(); // 清空表单
    this.props.addUserAction(false);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={this.props.addVisible}
        title="新建用户"
        footer={null}
        onCancel={this.cancel}
      >
        <Form horizontal="true" onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="用户名">
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入用户名!" }]
            })(<Input placeholder="用户名" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="默认密码">
            {"yanwen"}
          </Form.Item>

          <Form.Item {...formItemLayout} label="姓名">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入姓名!" }]
            })(<Input placeholder="姓名" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="员工编号">
            {getFieldDecorator("userCode", {
              rules: [{ required: true, message: "请输入员工编号!" }]
            })(<Input placeholder="员工编号" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="性别">
            {getFieldDecorator("sex", {
              initialValue: "0",
              rules: [{ required: true, message: "请选择性别!" }]
            })(
              <Select style={{ width: 120 }}>
                <Option value="0">未知</Option>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="电话">
            {getFieldDecorator("tel", {
              rules: [{ required: true, message: "请输入电话!" }]
            })(<Input placeholder="电话" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="固话">
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入固话!" }]
            })(<Input placeholder="固话" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="邮箱">
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "请输入邮箱!" }]
            })(<Input placeholder="邮箱" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="部门">
            {getFieldDecorator("department", {
              rules: [{ required: true, message: "请输入部门!" }]
            })(<Input placeholder="部门" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="岗位">
            {getFieldDecorator("post", {
              rules: [{ required: true, message: "请输入岗位!" }]
            })(<Input placeholder="岗位" />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              icon="plus-circle"
              type="primary"
              htmlType="submit"
              className='yw-button-normal'
            >
              新建用户
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddUser);
