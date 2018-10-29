import React from "react";
import { Badge } from "antd";
import "./index.less";

class BadgesDemo extends React.Component {
  render() {
    return (
      <div>
        <Badge count={99}>
          <div className="head-example" />
        </Badge>
        <Badge count={100}>
          <div className="head-example" />
        </Badge>
        <Badge count={99} overflowCount={10}>
          <div className="head-example" />
        </Badge>
        <Badge count={1000} overflowCount={999}>
          <div className="head-example" />
        </Badge>

        <Badge dot>
          <div className="head-example" />
        </Badge>
        <Badge count={0} dot>
          <div className="head-example" />
        </Badge>
      </div>
    );
  }
}

export default BadgesDemo;
