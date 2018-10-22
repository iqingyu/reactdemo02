import React from "react";
import { message, Form, Button, Input, Modal } from "antd";
import PropTypes from "prop-types";

import { formItemLayout, tailFormItemLayout } from "../../../styles/formStyles";
import { Object } from "core-js";

class AddMenu extends React.Component {
  static propTypes = {
    addMenuAction: PropTypes.func,
    addParentId: PropTypes.number,
    addParentName: PropTypes.string,
    addVisible: PropTypes.bool
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      var menu = Object.assign({}, values, {
        parentId: this.props.addParentId
      });

      let url = window.YWGlobal.baseApi + window.YWGlobal.apiNames.ADDMENU;
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
        this.props.addMenuAction(true);
      };

      window.YWFetch.post(url, JSON.stringify(menu), option);
    });
  };

  HandleCancel = () => {
    this.props.form.resetFields(); // 清空表单
    this.props.addMenuAction(false);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={this.props.addVisible}
        title="新建菜单"
        footer={null}
        onCancel={this.HandleCancel}
      >
        <Form horizontal="true" onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="父菜单名">
            {this.props.addParentName}
          </Form.Item>

          <Form.Item {...formItemLayout} label="菜单名">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入菜单名!" }]
            })(<Input placeholder="菜单名" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="菜单路由">
            {getFieldDecorator("path", {
              rules: [{ required: true, message: "请输入菜单路由!" }]
            })(<Input placeholder="菜单路由" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="菜单图标">
            {getFieldDecorator("icon", {
              rules: [{ required: true, message: "请输入菜单图标!" }]
            })(<Input placeholder="菜单图标" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="菜单序号">
            {getFieldDecorator("order", {
              rules: [{ required: true, message: "请输入菜单序号!" }]
            })(<Input placeholder="菜单序号(小号在前，大号在后)" />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              icon="plus-circle"
              type="primary"
              htmlType="submit"
              className="yw-button-normal"
            >
              新建菜单
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddMenu);
