import React from "react";
import { Tree, Button, Icon, message } from "antd";
import AddMenu from "./addMenu";
import EditMenu from "./editMenu";

const TreeNode = Tree.TreeNode;

class MenuList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMenu: null,
      data: [],
      defaultExpandedKeys: [],
      selectedKeys: [],

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
        selectedMenu: JSON.parse(info.selectedNodes[0].props["data-data"])
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
            {node.name} ({node.path})
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

  addMenuAction = success => {
    this.setState({
      addParentId: -1,
      addParentName: "",
      addVisible: false
    });

    if (success) {
      this.getMenus();
    }
  };

  editMenuAction = success => {
    this.setState({ edit: null, editVisible: false });
    if (success) {
      this.getMenus();
    }
  };

  handleDelete = () => {
    let menu = this.state.selectedMenu;

    if (!menu) {
      message.error("请先选中一个需要删除的菜单");
      return;
    }

    var url = "http://localhost:23075/api/user/deleteMenu/";
    fetch(url + menu.id, {
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
        message.success("删除菜单成功");
        this.getMenus();
      })
      .catch(error => {
        console.log(error);
        message.error("删除菜单失败");
      });
  };

  getMenus = () => {
    fetch("http://localhost:23075/api/user/getMenuList", {
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
          message.success("没有获取到菜单列表");
          return;
        }

        // 设置菜单列表
        this.setState({
          data: data.ListData,
          selectedKeys: [],
          selectedMenu: null
        });
      })
      .catch(error => {
        message.error("获取菜单列表失败");
      });
  };

  componentDidMount() {
    this.getMenus();
  }

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

        <AddMenu {...this.state} addMenuAction={this.addMenuAction} />
        <EditMenu {...this.state} editMenuAction={this.editMenuAction} />
      </div>
    );
  }
}

export default MenuList;
