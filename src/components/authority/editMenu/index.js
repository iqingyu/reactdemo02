import React from "react";
import { message, Form, Button, Input, Modal } from "antd";
import PropTypes from "prop-types";

import { formItemLayout, tailFormItemLayout } from "../../../styles/formStyles";
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

      let url = window.YWGlobal.baseApi + window.YWGlobal.apiNames.SAVEMENU;
      let option = window.YWFetch.getDefaultOption();
      option.callback = (success, data) => {
        if (!success || !data) {
          message.error("保存菜单失败");
          return;
        }

        if (data.ResultCode != 1) {
          message.error(data.ResultMsg);
          return;
        }

        message.success("保存菜单成功");
        this.props.form.resetFields(); // 清空表单
        this.props.editMenuAction(true);
      };

      window.YWFetch.post(url, JSON.stringify(menu), option);
    });
  };

  HandleCancel = () => {
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
        onCancel={this.HandleCancel}
      >
        <Form horizontal="true" onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="菜单名">
            {getFieldDecorator("name", {
              initialValue: edit ? edit.name : "",
              rules: [{ required: true, message: "请输入菜单名!" }]
            })(<Input placeholder="菜单名" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="菜单路由">
            {getFieldDecorator("path", {
              initialValue: edit ? edit.path : "",
              rules: [{ required: true, message: "请输入菜单路由!" }]
            })(<Input placeholder="菜单路由" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="菜单图标">
            {getFieldDecorator("icon", {
              initialValue: edit ? edit.icon : "",
              rules: [{ required: true, message: "请输入菜单图标!" }]
            })(<Input placeholder="菜单图标" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="菜单序号">
            {getFieldDecorator("order", {
              initialValue: edit ? edit.order : 1,
              rules: [{ required: true, message: "请输入菜单序号!" }]
            })(<Input placeholder="菜单序号(小号在前，大号在后)" />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              icon="edit"
              type="primary"
              htmlType="submit"
              className="yw-button-normal"
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
