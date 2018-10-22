import React from "react";
import PropTypes from "prop-types";

import { message, Form, Button, Checkbox, Modal } from "antd";
import { formItemLayout, tailFormItemLayout } from "../../../styles/formStyles";

const CheckboxGroup = Checkbox.Group;

class AllocationRole extends React.Component {
  static propTypes = {
    allocationRoleAction: PropTypes.func,
    allocationVisible: PropTypes.bool,
    userId: PropTypes.number,
    username: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      defaultValues: []
    };
    this.userId = null;
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let url =
        window.YWGlobal.baseApi +
        window.YWGlobal.apiNames.SAVEUSERROLELIST +
        this.props.userId;

      let option = window.YWFetch.getDefaultOption();
      option.callback = (success, data) => {
        if (!success || !data) {
          message.error("保存用户的角色列表失败");
          return;
        }

        if (data.ResultCode != 1) {
          message.error(data.ResultMsg);
          return;
        }

        message.success("保存用户的角色列表成功");
        this.roleId = null;
        this.props.form.resetFields(); // 清空表单
        this.props.allocationRoleAction(true);
      };

      window.YWFetch.post(url, JSON.stringify(values["roles"]), option);
    });
  };

  HandleCancel = () => {
    this.userId = null;
    this.props.form.resetFields(); // 清空表单
    this.props.allocationRoleAction(false);
  };

  getRoles = () => {
    let url = window.YWGlobal.baseApi + window.YWGlobal.apiNames.GETROLELIST;
    let option = window.YWFetch.getDefaultOption();
    option.callback = (success, data) => {
      if (!success || !data) {
        message.error("获取角色列表失败");
        return;
      }

      if (data.ResultCode != 1) {
        message.error(data.ResultMsg);
        return;
      }

      if (!data.ListData || data.ListData.length <= 0) {
        message.success("没有获取到角色列表");
        return;
      }

      let roles = [];

      data.ListData.forEach(role => {
        roles.push({ label: role.name, value: role.id });
      });

      // 设置角色列表 并获取已设置的角色信息
      this.setState({ options: roles }, () => {
        this.getUserRoles(this.props.userId);
      });
    };

    window.YWFetch.get(url, option);
  };

  getUserRoles = userId => {
    if (!userId || userId < 0) {
      return;
    }

    let url =
      window.YWGlobal.baseApi +
      window.YWGlobal.apiNames.GETUSERROLELIST +
      userId;
    let option = window.YWFetch.getDefaultOption();
    option.callback = (success, data) => {
      if (!success || !data) {
        message.error("获取用户的角色列表失败");
        return;
      }

      if (!data.ListData || data.ListData.length <= 0) {
        this.setState({ defaultValues: [] });
        return;
      }

      this.setState({ defaultValues: data.ListData });
    };

    window.YWFetch.get(url, option);
  };

  componentDidMount() {
    this.getRoles();
  }

  componentWillUpdate(props) {
    if (this.userId != props.userId) {
      this.userId = props.userId;

      this.getUserRoles(props.userId);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={this.props.allocationVisible}
        title="分配角色"
        footer={null}
        onCancel={this.HandleCancel}
      >
        <Form horizontal="true" onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="用户名">
            {this.props.username}
          </Form.Item>

          <Form.Item {...formItemLayout} label="角色">
            {getFieldDecorator("roles", {
              initialValue: this.state.defaultValues,

              rules: [{ type: "array", required: true, message: "请勾选角色!" }]
            })(<CheckboxGroup options={this.state.options} />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              icon="save"
              type="primary"
              htmlType="submit"
              className='yw-button-normal'
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AllocationRole);
