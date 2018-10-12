import React from "react";
import { message, Form, Button, Input, Modal } from "antd";
import PropTypes from "prop-types";

import { formItemLayout, tailFormItemLayout } from '../styles/formStyles' 

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

      console.log(values);

      const { data } = this.state;

      var role = { id: data.length + 1, roleName: values["roleName"] };

      message.success("保存角色成功");

      this.props.editRoleAction(role);
    });
  };

  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal visible={this.props.editVisible} title="编辑角色名" footer={null}>
        <Form horizontal="true" onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="原角色名">
            {this.props.editRoleName}
          </Form.Item>

          <Form.Item {...formItemLayout} label="新角色名">
            {getFieldDecorator("roleName", {
              rules: [{ required: true, message: "请输入新角色名!" }]
            })(<Input height="45" placeholder="新角色名" />)}
          </Form.Item>
          
          <Form.Item {...tailFormItemLayout}>
            <Button
              icon="edit"
              height="45"
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 15 }}
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
