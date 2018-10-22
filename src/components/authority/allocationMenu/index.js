import React from "react";
import { message, Form, Button, Modal, Tree } from "antd";
import PropTypes from "prop-types";
import { formItemLayout, tailFormItemLayout } from "../../../styles/formStyles";

const TreeNode = Tree.TreeNode;

class AllocationMenu extends React.Component {
  static propTypes = {
    allocationMenuAction: PropTypes.func,
    alVisible: PropTypes.bool,
    alRoleId: PropTypes.number,
    alRoleName: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: [],
      data: []
    };

    this.roleId = null;
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let url =
        window.YWGlobal.baseApi +
        window.YWGlobal.apiNames.SAVEROLEMENULIST +
        this.props.alRoleId;
      let option = window.YWFetch.getDefaultOption();
      option.callback = (success, data) => {
        if (!success || !data) {
          message.error("保存角色的菜单列表失败");
          return;
        }

        if (data.ResultCode != 1) {
          message.error(data.ResultMsg);
          return;
        }

        message.success("保存角色的菜单列表成功");
        this.roleId = null;
        this.props.form.resetFields(); // 清空表单
        this.props.allocationMenuAction(true);
      };

      window.YWFetch.post(url, JSON.stringify(values["menus"]), option);
    });
  };

  HandleCancel = () => {
    this.setState({ checkedKeys: [] });
    this.roleId = null;
    this.props.form.resetFields(); // 清空表单
    this.props.allocationMenuAction(false);
  };

  handleCheck = list => {
    console.log("handleCheck", list);
    this.setState({ checkedKeys: [...list.checked, ...list.halfChecked] });
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
      this.setState({ data: data.ListData }, () => {
        this.getRoleMenus(this.props.alRoleId);
      });
    };

    window.YWFetch.get(url, option);
  };

  getRoleMenus = roleId => {
    if (!roleId || roleId < 0) {
      return;
    }

    let url =
      window.YWGlobal.baseApi +
      window.YWGlobal.apiNames.GETROLEMENULIST +
      roleId;
    let option = window.YWFetch.getDefaultOption();
    option.callback = (success, data) => {
      if (!success || !data) {
        message.error("获取角色的菜单列表失败");
        return;
      }

      if (!data.ListData || data.ListData.length <= 0) {
        this.setState({ checkedKeys: [] });
        return;
      }

      this.setState({ checkedKeys: data.ListData });
    };

    window.YWFetch.get(url, option);
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

  componentDidMount() {
    this.getMenus();
  }

  componentWillUpdate(props) {
    if (this.roleId != props.alRoleId) {
      this.roleId = props.alRoleId;

      this.getRoleMenus(props.alRoleId);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={this.props.alVisible}
        title="分配菜单"
        footer={null}
        onCancel={this.HandleCancel}
      >
        <Form horizontal="true" onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="角色名">
            {this.props.alRoleName}
          </Form.Item>

          <Form.Item {...formItemLayout} label="菜单">
            {getFieldDecorator("menus", {
              initialValue: this.state.checkedKeys,
              valuePropName: "checkedKeys",
              rules: [{ type: "array" }]
            })(
              <Tree
                checkable={true}
                showLine={true}
                checkStrictly={true}
                onCheck={this.handleCheck}
              >
                {this.getNodes(this.state.data)}
              </Tree>
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              icon="save"
              type="primary"
              htmlType="submit"
              className='yw-button-normal'
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AllocationMenu);
