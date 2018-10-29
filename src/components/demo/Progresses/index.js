import React from "react";
import { Progress } from "antd";

export default class ProgressesDemo extends React.Component {
  render() {
    return (
      <div>
        <Progress percent={30} />
        <Progress percent={50} status="active" />
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
        <Progress percent={50} showInfo={false} />

        <Progress
          type="circle"
          percent={75}
          format={percent => `${percent} Days`}
        />
        <Progress type="circle" percent={100} format={() => "Done"} />

        <br />
        <br />

        <Progress strokeLinecap="square" type="circle" percent={85} />
        <Progress
          strokeLinecap="square"
          type="circle"
          gapPosition="bottom"
          percent={85}
        />
        <Progress
          strokeLinecap="square"
          type="circle"
          gapPosition="left"
          percent={85}
        />

        <br />
        <br />
        <Progress type="circle" strokeLinecap="square" percent={75} />
        <Progress type='dashboard' strokeLinecap="square" percent={75}  format={percent => `${percent} Km/h`}/>
      </div>
    );
  }
}
