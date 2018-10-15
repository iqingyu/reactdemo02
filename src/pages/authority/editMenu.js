import React from "react";
import { message, Form, Button, Input, Modal } from "antd";
import PropTypes from "prop-types";

import { formItemLayout, tailFormItemLayout } from "../styles/formStyles";
import { Object } from "core-js";

class EditMenu extends React.Component {
  static propTypes = {
    editMenuAction: PropTypes.func,
    edit: PropTypes.object,
    editVisible: PropTypes.bool
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      var menu = Object.assign({}, this.props.edit, values);

      var url = "http://localhost:23075/api/user/saveMenu";
      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(menu)
      })
        .then(response => response.json())
        .then(data => {
          if (data.ResultCode != 1) {
            message.error(data.ResultMsg);
            return;
          }

          message.success("保存菜单成功");
          this.props.form.resetFields(); // 清空表单
          this.props.editMenuAction(true);
        })
        .catch(error => {
          console.log(error);
          message.error("保存菜单失败");
        });
    });
  };

  cancel = () => {
    this.props.form.resetFields(); // 清空表单
    this.props.editMenuAction(false);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { edit } = this.props;
    return (
      <Modal
        visible={this.props.editVisible}
        title="编辑菜单"
        footer={null}
        onCancel={this.cancel}
      >
        <Form horizontal="true" onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="菜单名">
            {getFieldDecorator("name", {
              initialValue: edit ? edit.name : "",
              rules: [{ required: true, message: "请输入菜单名!" }]
            })(<Input height="45" placeholder="菜单名" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="菜单路由">
            {getFieldDecorator("path", {
              initialValue: edit ? edit.path : "",
              rules: [{ required: true, message: "请输入菜单路由!" }]
            })(<Input height="45" placeholder="菜单路由" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="菜单图标">
            {getFieldDecorator("icon", {
              initialValue: edit ? edit.icon : "",
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
