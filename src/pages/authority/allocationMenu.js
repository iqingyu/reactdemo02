import React from "react";
import { Layout, Table } from "antd";
const { Content, Sider } = Layout;

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    id: i,
    roleName: "John Brown"
  });
}

class Allocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bordered: true,
      loading: false,
      pagination: false,
      hasData: true,
      data: data,
      rowKey: recod => recod.id
    };
  }

  columns = [
    {
      title: "序号",
      width: 30,
      key: "id",
      render: (text, record, index) => <span>{index}</span>
    },
    {
      title: "角色",
      width: 300,
      dataIndex: "roleName"
    }
  ];

  render() {
    return (
      <div>
        <Layout>
          <Content>
            <div style={{ height: 60, padding: 15 }} />

            <Table
              size="small"
              {...this.state}
              columns={this.columns}
              dataSource={this.state.hasData ? this.state.data : null}
              scroll={{ x: false, y: 600 }}
            />
          </Content>
          <Sider reverseArrow={true} width={300}>
            <Table
              size="small"
              {...this.state}
              columns={this.columns}
              dataSource={this.state.hasData ? this.state.data : null}
              scroll={{ x: false, y: 600 }}
            />
          </Sider>
        </Layout>
      </div>
    );
  }
}

export default Allocation;
