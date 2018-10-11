import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export default function Auth(WrappedComponent) {
  class AuthComponent extends Component {
    static contextTypes = {
      store: PropTypes.object,
      username: PropTypes.string
    };

    constructor(props) {
      super(props);
      this.islogin = true;
    }
    //只在首次Mount时来验证权限
    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      const { store } = this.context;

      var contextState = store.getState();

      if (contextState && contextState.user && contextState.user.username) {
        this.islogin = true;
      } else {
        this.islogin = false;
      }

      if (!this.islogin) {
        //没有登录
        console.log("请先登录");
        this.props.history.push("/login");
      } else {
        console.log("登录验证通过");
      }
    }

    render() {
      console.log("auth render");
      return (
        <div style={{ height: "100%" }}>
          {this.islogin === true ? <WrappedComponent {...this.props} /> : null}
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    username: state.user.username
  });

  return connect(mapStateToProps)(withRouter(AuthComponent));
}
