import React from "react";
import { message, Form, Button, Input, Modal } from "antd";
import PropTypes from "prop-types";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

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

      message.success("修改角色成功");

      this.props.editRoleAction(role);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal visible={this.props.editVisible} title="修改角色名" footer={null}>
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
              修改角色
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditRole);
