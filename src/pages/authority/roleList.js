import React from "react";
import { Button, Table, message } from "antd";
import AddRole from "./addRole";
import EditRole from "./editRole";
import AllocationMenu from "./allocationMenu";
import "whatwg-fetch";

class RoleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bordered: true,
      loading: false,
      pagination: false,
      hasData: true,
      data: [],
      rowKey: recod => recod.id,

      editVisible: false,
      editRoleId: -1,
      editRoleName: null,

      alVisible: false,
      alRoleId: -1,
      alRoleName: null
    };
  }

  handleDelete = recod => {
    var url = "http://localhost:23075/api/user/deleteRole/";
    fetch(url + recod.id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: ""
    })
      .then(response => response.json())
      .then(data => {
        if (data.ResultCode != 1) {
          message.error(data.ResultMsg);
          return;
        }
        message.success("删除角色成功");
        this.getRoles();
      })
      .catch(error => {
        console.log(error);
        message.error("删除角色失败");
      });
  };

  handleEdit = record => {
    this.setState({
      editVisible: true,
      editRoleId: record.id,
      editRoleName: record.roleName
    });
  };

  handleAllocation = record => {
    this.setState({
      alVisible: true,
      alRoleId: record.id,
      alRoleName: record.roleName
    });
  };

  getRoles = () => {
    fetch("http://localhost:23075/api/user/getRoleList", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.ResultCode != 1) {
          message.error(data.ResultMsg);
          return;
        }

        if (!data.ListData || data.ListData.length <= 0) {
          message.success("没有获取到角色列表");
          return;
        }

        let roles = [];

        data.ListData.forEach(role => {
          roles.push({ roleName: role.name, id: role.id });
        });

        // 设置角色列表
        this.setState({ data: roles });
      })
      .catch(error => {
        message.error("获取角色列表失败");
      });
  };

  addRoleAction = success => {
    this.getRoles();
  };

  editRoleAction = success => {
    this.setState({
      editVisible: false,
      editRoleId: null,
      editRoleName: null
    });
    if (success) {
      this.getRoles();
    }
  };

  allocationMenuAction = success =>{
    this.setState({
      alVisible: false,
      alRoleId: null,
      alRoleName: null
    });
  };

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
    },
    {
      title: "操作",
      render: (text, record) => (
        <span>
          <Button
            icon="edit"
            onClick={this.handleAllocation.bind(this, record)}
          >
            分配菜单
          </Button>
          <Button icon="edit" onClick={this.handleEdit.bind(this, record)}>
            编辑
          </Button>
          <Button icon="delete" onClick={this.handleDelete.bind(this, record)}>
            删除
          </Button>
        </span>
      )
    }
  ];

  componentDidMount() {
    this.getRoles();
  }

  render() {
    return (
      <div>
        <div style={{ height: 60, padding: 15, textAlign: "left" }}>
          <AddRole addRoleAction={this.addRoleAction} />
        </div>

        <Table
          size="small"
          {...this.state}
          columns={this.columns}
          dataSource={this.state.hasData ? this.state.data : null}
          scroll={{ x: false, y: 600 }}
        />

        <EditRole {...this.state} editRoleAction={this.editRoleAction} />
        <AllocationMenu {...this.state} allocationMenuAction ={this.allocationMenuAction} />
      </div>
    );
  }
}

export default RoleList;
