import React from "react";
import { Button, Table, Tag, message } from "antd";
import "whatwg-fetch";
import AddUser from "./addUser";
import AllocationRole from "./allocationRole";

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
      pagination: false,
      expandedRowRender: expandedRowRenderDiv,
      hasData: true,
      data: [],
      rowKey: recod => recod.id,
      addVisible: false,
      allocationVisible: false
    };
  }

  addUserAction = success => {
    this.setState({ addVisible: false });
    if (success) {
      this.getUserList(); // 刷新用户列表
    }
  };

  handleAdd = () => {
    this.setState({ addVisible: true });
  };

  handleResetPassword = record => {
    var url = "http://localhost:23075/api/user/resetPassword/";

    console.log(record);

    fetch(url + record.id, {
      method: "post"
    })
      .then(response => response.json())
      .then(data => {
        if (data.ResultCode === 1) {
          message.success("重置密码成功");
        } else {
          message.error("重置密码失败");
        }
      })
      .catch(error => {
        console.log(error);
        message.error("重置密码失败");
      });
  };

  handleAllocationRole = record => {
    this.setState({
      allocationVisible: true,
      userId: record.id,
      username: record.username
    });
  };

  columns = [
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
    {
      title: "员工编号",
      width: 150,
      dataIndex: "userCode"
    },
    { title: "性别", dataIndex: "sexName", width: 50 },
    { title: "电话", dataIndex: "phone", width: 100 },
    { title: "固话", dataIndex: "tel", width: 150 },
    { title: "邮箱", dataIndex: "email", width: 200 },
    { title: "部门", dataIndex: "department", width: 200 },
    { title: "岗位", dataIndex: "post" },
    {
      title: "操作",
      key: "id",
      fixed: "right",
      width: 250,
      render: (text, record) => (
        <span>
          <Button onClick={this.handleResetPassword.bind(this, record)}>
            重置密码
          </Button>
          <Button onClick={this.handleAllocationRole.bind(this, record)}>
            设置角色
          </Button>
        </span>
      )
    }
  ];

  getUserList = () => {
    fetch("http://localhost:23075/api/user/getUserList", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data.ListData });
      })
      .catch(error => {
        console.log(error);
        message.error("获取用户列表失败");
      });
  };

  allocationRoleAction = success => {
    this.setState({
      allocationVisible: false,
      userId: null,
      username: null
    });
    if (success) {
      this.getUserList();
    }
  };

  componentDidMount() {
    this.getUserList();
  }

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
          scroll={{ x: 1600, y: 600 }}
        />
        <AddUser {...this.state} addUserAction={this.addUserAction} />
        <AllocationRole
          {...this.state}
          allocationRoleAction={this.allocationRoleAction}
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
