import React from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { loginAction } from "../../actions/userAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.less";

const FormItem = Form.Item;

class Login extends React.Component {
  static propTypes = {
    loginAction: PropTypes.func
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let content = {
        username: values["username"],
        password: values["password"]
      };

      let url = window.YWGlobal.baseApi + window.YWGlobal.apiNames.LOGIN;

      let option = window.YWFetch.getDefaultOption();

      option.callback = (success, data) => {
        if (!success) {
          console.log(data);
          message.error("登录失败");
          return;
        }

        console.log(data);

        if (data.ResultCode != 1) {
          message.error(data.ResultMsg);
          return;
        }

        window.YWStore.setData(
          window.YWGlobal.sessionKeys.USER,
          data.ResultData
        );

        this.props.loginAction(data.ResultData);
        this.props.history.push(window.YWGlobal.defaultPath);
        return;
      };

      window.YWFetch.post(url, JSON.stringify(content), option);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-box">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <h3 className="title">系统登录</h3>
          </FormItem>
          <FormItem>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入用户名!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>记住密码</Checkbox>)}
            <a className="login-form-forgot" href="">
              忘记密码
            </a>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     loginAction: (username, userIcon, userData) => {
//       dispatch(loginAction(username, userIcon, userData));
//     }
//   };
// };

Login = connect(
  null,
  { loginAction: loginAction }
)(Login);

export default Form.create()(Login);
