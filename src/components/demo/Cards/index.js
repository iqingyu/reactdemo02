import React from "react";
import { Skeleton, Card, Icon, Avatar } from "antd";

const { Meta } = Card;

export default class CardsDemo extends React.Component {
  render() {
    return (
      <div>
        <Card style={{ width: 300, marginTop: 16 }} loading={false}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>

        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <Icon type="setting" />,
            <Icon type="edit" />,
            <Icon type="ellipsis" />
          ]}
        >
          <Skeleton loading={true} avatar active>
            <Meta
              avatar={null}
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </Card>
      </div>
    );
  }
}
