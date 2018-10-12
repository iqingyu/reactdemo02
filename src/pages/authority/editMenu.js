import React from "react";
import { message, Form, Button, Input, Modal } from "antd";
import PropTypes from "prop-types";

import { formItemLayout, tailFormItemLayout } from "../styles/formStyles";

class EditMenu extends React.Component {
  static propTypes = {
    editMenuAction: PropTypes.func
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      var role = { id: 100, roleName: values["roleName"] };

      message.success("新建角色成功");

      this.props.editMenuAction(role);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { edit } = this.props;
    return (
      <Modal visible={this.props.editVisible} title="编辑菜单" footer={null}>
        <Form horizontal="true" onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="菜单名">
            {getFieldDecorator("name", {
              initialValue: edit ? edit.name : '',
              rules: [{ required: true, message: "请输入菜单名!" }]
            })(<Input height="45" placeholder="菜单名" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="菜单路由">
            {getFieldDecorator("path", {
              initialValue: edit ? edit.path : '',
              rules: [{ required: true, message: "请输入菜单路由!" }]
            })(<Input height="45" placeholder="菜单路由" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="菜单图标">
            {getFieldDecorator("icon", {
              initialValue: edit ? edit.icon : '',
              rules: [{ required: true, message: "请输入菜单图标!" }]
            })(<Input height="45" placeholder="菜单图标" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="菜单序号">
            {getFieldDecorator("order", {
              initialValue: edit ? edit.order : 1,
              rules: [{ required: true, message: "请输入菜单序号!" }]
            })(
              <Input height="45" placeholder="菜单序号(小号在前，大号在后)" />
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              icon="edit"
              height="45"
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 15 }}
            >
              保存菜单
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditMenu);