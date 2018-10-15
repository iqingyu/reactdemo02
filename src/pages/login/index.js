import React from "react";
import Store from "../../components/store";

import { Form, Icon, Input, Button, Checkbox, message } from "antd";

import { loginAction } from "../../actions/userAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "whatwg-fetch";

import "./login.css";
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
      var content = {
        username: values["username"],
        password: values["password"]
      };
      fetch("http://localhost:23075/api/user/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
      })
        .then(response => response.json())
        .then(data => {
          if (data.ResultCode != 1) {
            message.error(data.ResultMsg);
            return;
          }

          this.props.loginAction(content.username, "usericon", data.ResultData);
          this.props.history.push("/");
        })
        .catch(error => {
          message.error("登录失败");
        });
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

Login = connect(
  null,
  { loginAction }
)(Login);

export default Form.create()(Login);
