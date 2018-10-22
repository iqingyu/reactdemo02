import React from "react";
import { Affix, Button } from "antd";
import "./index.less";

class AffixsDemo extends React.Component {
  render() {
    return (
      <div style={{ height: "10000px" }}>
          <Affix offsetTop={50}>
            <Button type="primary">Affix top</Button>
          </Affix>
          效果不符合预期
      </div>
    );
  }
}

export default AffixsDemo;
