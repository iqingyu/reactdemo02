import React from "react";
import { message, Form, Button, Input, Modal } from "antd";
import PropTypes from "prop-types";

import { formItemLayout, tailFormItemLayout } from "../../../styles/formStyles";

class EditRole extends React.Component {
  static propTypes = {
    editRoleAction: PropTypes.func,
    editRoleId: PropTypes.number,
    editRoleName: PropTypes.string,
    editVisible: PropTypes.bool
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      var role = { id: this.props.editRoleId, name: values["roleName"] };

      let url = window.YWGlobal.baseApi + window.YWGlobal.apiNames.SAVEROLE;
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
        this.props.editRoleAction(true);
      };

      window.YWFetch.post(url, JSON.stringify(role), option);
    });
  };

  HandleCancel = () => {
    this.props.form.resetFields(); // 清空表单
    this.props.editRoleAction(false);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={this.props.editVisible}
        title="编辑角色名"
        footer={null}
        onCancel={this.HandleCancel}
      >
        <Form horizontal="true" onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="原角色名">
            {this.props.editRoleName}
          </Form.Item>

          <Form.Item {...formItemLayout} label="新角色名">
            {getFieldDecorator("roleName", {
              rules: [{ required: true, message: "请输入新角色名!" }]
            })(<Input placeholder="新角色名" />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              icon="edit"
              type="primary"
              htmlType="submit"
              className="yw-button-normal"
            >
              保存角色
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditRole);
