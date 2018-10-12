import React from "react";
import { Tree, Button, Icon, message } from "antd";
import AddMenu from "./addMenu";
import EditMenu from "./editMenu";

const TreeNode = Tree.TreeNode;

var data = [];
for (var i = 0; i < 5; i++) {
  data.push({
    id: i,
    parentId: i,
    name: "name" + i,
    path: "path" + i,
    icon: "plus-circle",
    order: 1,
    children: []
  });
}

class MenuList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMenu: null,
      data: data,
      defaultExpandedKeys: [],

      addParentId: -1,
      addParentName: "",
      addVisible: false,

      edit: null,
      editVisible: false
    };
  }

  onSelect = (selectedKeys, info) => {
    if (info && info.selectedNodes && info.selectedNodes.length > 0) {
      this.setState({
        selectedMenu: JSON.parse(info.selectedNodes[0].props['data-data'])
      });
    } else {
      this.setState({ selectedMenu: null });
    }
  };

  getNodes = nodes => {
    return nodes.map(node => (
      <TreeNode
        title={
          <span>
            <Icon type={node.icon} theme="twoTone" /> {node.name} ({node.path})
          </span>
        }
        key={node.id}
        data-data={JSON.stringify(node)}
      >
        {node.children && this.getNodes(node.children)}
      </TreeNode>
    ));
  };

  // 新建菜单
  handleAdd = () => {
    this.setState({
      addParentId: -1,
      addParentName: "",
      addVisible: true
    });
  };

  handleAddSub = () => {
    let parent = this.state.selectedMenu;

    if (!parent) {
      message.error("请先选中一个菜单，然后再添加子菜单");
      return;
    }

    console.log(parent);

    this.setState({
      addParentId: parent.id,
      addParentName: parent.name,
      addVisible: true
    });
  };
  handleEdit = () => {
    let parent = this.state.selectedMenu;

    if (!parent) {
      message.error("请先选中一个需要编辑的菜单");
      return;
    }

    this.setState({ edit: parent, editVisible: true });
  };
  handleDelete = () => {};

  render() {
    return (
      <div>
        <div style={{ height: 60, padding: 15 }}>
          <Button height="45" icon="plus-circle" onClick={this.handleAdd}>
            新建菜单
          </Button>
          <Button height="45" icon="plus-circle" onClick={this.handleAddSub}>
            新建子菜单
          </Button>
          <Button height="45" icon="edit" onClick={this.handleEdit}>
            编辑菜单
          </Button>
          <Button height="45" icon="delete" onClick={this.handleDelete}>
            删除菜单
          </Button>
        </div>

        <div
          style={{ marginLeft: 15, marginTop: 10, backgroundColor: "white" }}
        >
          <Tree
            showLine
            defaultExpandedKeys={this.defaultExpandedKeys}
            onSelect={this.onSelect}
          >
            {this.getNodes(this.state.data)}
          </Tree>
        </div>

        <AddMenu {...this.state} />
        <EditMenu {...this.state} />
      </div>
    );
  }
}

export default MenuList;
