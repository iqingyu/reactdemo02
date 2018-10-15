import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Store from "../store";

export default function Auth(WrappedComponent) {
  class AuthComponent extends Component {
    constructor(props) {
      super(props);
      this.islogin = true;
    }
    //只在首次Mount时来验证权限
    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      var key = window.YWGlobal.sessionKeys.USER;
      let user = Store.getData(key);

      if (user && user.userId && user.userId > 0) {
        this.islogin = true;
      } else {
        this.islogin = false;
      }

      if (!this.islogin) {
        this.props.history.push(window.YWGlobal.loginPath);
      }
    }

    render() {
      return (
        <div style={{ height: "100%" }}>
          {this.islogin === true ? <WrappedComponent {...this.props} /> : null}
        </div>
      );
    }
  }

  return withRouter(AuthComponent);
}
