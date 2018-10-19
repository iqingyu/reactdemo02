import React from "react";
import { Tree, Button, Icon, message } from "antd";
import AddMenu from "../addMenu";
import EditMenu from "../editMenu";

const TreeNode = Tree.TreeNode;

class MenuList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMenu: null,
      data: [],
      selectedKeys: [],
      defaultExpandedKeys: ["default"],
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
        selectedMenu: JSON.parse(info.selectedNodes[0].props["data-data"]),
        selectedKeys: selectedKeys
      });
    } else {
      this.setState({ selectedMenu: null, selectedKeys: [] });
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

    if (parent.id <= 0) {
      message.error("根菜单不可以编辑");
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

    if (menu.id <= 0) {
      message.error("根菜单不可以删除");
      return;
    }

    let url =
      window.YWGlobal.baseApi + window.YWGlobal.apiNames.DELETEMENU + menu.id;
    let option = window.YWFetch.getDefaultOption();
    option.callback = (success, data) => {
      if (!success || !data) {
        message.error("删除菜单失败");
        return;
      }

      if (data.ResultCode != 1) {
        message.error(data.ResultMsg);
        return;
      }

      message.success("删除菜单成功");
      this.getMenus();
    };

    window.YWFetch.deleteMethod(url, "", option);
  };

  getMenus = () => {
    let url = window.YWGlobal.baseApi + window.YWGlobal.apiNames.GETMENULIST;
    let option = window.YWFetch.getDefaultOption();
    option.callback = (success, data) => {
      if (!success || !data) {
        message.error("获取菜单列表失败");
        return;
      }

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
    };

    window.YWFetch.get(url, option);
  };

  componentDidMount() {
    this.getMenus();
  }

  render() {
    return (
      <div>
        <div className="yw-toolbar-normal">
          <Button
            icon="plus-circle"
            type="primary"
            className="yw-button-normal"
            onClick={this.handleAddSub}
          >
            新建子菜单
          </Button>
          <Button
            icon="edit"
            type="primary"
            className="yw-button-normal"
            onClick={this.handleEdit}
          >
            编辑菜单
          </Button>
          <Button
            icon="delete"
            type="primary"
            className="yw-button-normal"
            onClick={this.handleDelete}
          >
            删除菜单
          </Button>
        </div>

        <div className="whiteBackground">
          <Tree
            showLine={true}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
            defaultExpandedKeys={this.state.defaultExpandedKeys}
          >
            <TreeNode
              title={"根菜单(不可修改,不可删除)"}
              key={"default"}
              data-data={JSON.stringify({ id: -1, name: "根菜单" })}
            >
              {this.getNodes(this.state.data)}
            </TreeNode>
          </Tree>
        </div>

        <AddMenu {...this.state} addMenuAction={this.addMenuAction} />
        <EditMenu {...this.state} editMenuAction={this.editMenuAction} />
      </div>
    );
  }
}

export default MenuList;
