import React from "react";
import { Button, Table } from "antd";
import AddRole from "./addRole";
import EditRole from "./editRole";

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    id: i,
    roleName: "John Brown"
  });
}

class RoleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bordered: true,
      loading: false,
      pagination: false,
      hasData: true,
      data: data,
      rowKey: recod => recod.id,

      editVisible: false,
      editRoleId: null,
      editRoleName: null
    };
  }

  handleDelete = recod => {};

  handleEdit = record => {
    this.setState({
      editVisible: true,
      editRoleId: record.id,
      editRoleName: record.roleName
    });
  };

  addRoleAction = role => {
    const { data } = this.state;
    this.setState({ data: [...data, role] });
  };

  editRoleAction = role => ({});

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
      </div>
    );
  }
}

export default RoleList;
