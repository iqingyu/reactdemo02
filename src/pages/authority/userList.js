import React from "react";
import { Button, Table, Tag } from "antd";

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    id: i,
    name: "John Brown",
    staffCode: `${i}-2`,
    username: "用户名",
    tel: "17600372177",
    phone: "454646",
    roles: ["1", "2"],
    sex: "男",
    email: "imengqingyu@qq.com",
    department: "北京信息中心技术部",
    post: "软件开发工程师"
  });
}

const expandedRowRenderDiv = record => (
  <span>
    {record &&
      record.roles &&
      record.roles.map(role => (
        <Tag color="blue" key={role}>
          {role}
        </Tag>
      ))}
  </span>
);

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bordered: true,
      loading: false,
      pagination: { position: "bottom" },
      expandedRowRender: expandedRowRenderDiv,
      hasData: true,
      data: data,
      rowKey: recod => recod.id
    };
  }

  handleAdd = () => {};

  handleResetPassword = record => {
    console.log(record);
  };

  columns = [
    {
      title: "员工编号",
      width: 100,
      dataIndex: "staffCode",
      fixed: "left"
    },
    {
      title: "姓名",
      width: 150,
      dataIndex: "name",
      fixed: "left"
    },
    {
      title: "用户名",
      width: 150,
      dataIndex: "username",
      fixed: "left"
    },
    { title: "性别", dataIndex: "sex", width: 50 },
    { title: "电话", dataIndex: "phone", width: 100 },
    { title: "固话", dataIndex: "tel", width: 150 },
    { title: "邮箱", dataIndex: "email", width: 200 },
    { title: "部门", dataIndex: "department", width: 200 },
    { title: "岗位", dataIndex: "post" },
    {
      title: "操作",
      key: "id",
      fixed: "right",
      width: 210,
      render: (text, record) => (
        <span>
          <Button onClick={this.handleResetPassword.bind(this, record)}>
            重置密码
          </Button>
          <Button onClick={this.handleResetPassword.bind(this, record)}>
            停用账号
          </Button>
        </span>
      )
    }
  ];

  render() {
    return (
      <div>
        <div style={{ height: 60, padding: 15, textAlign: "left" }}>
          <Button
            onClick={this.handleAdd}
            type="primary"
            icon="plus-circle"
            height="45"
          >
            新建用户
          </Button>
        </div>
        <Table
          size="small"
          {...this.state}
          columns={this.columns}
          dataSource={this.state.hasData ? this.state.data : null}
          scroll={{ x: 1210, y: 600 }}
        />
      </div>
    );
  }
}

// UserList = connect(
//     null,
//     null
//   )(UserList);

export default UserList;
