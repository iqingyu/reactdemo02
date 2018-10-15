import React from "react";
import { message, Form, Button, Checkbox, Modal, Tree, Icon } from "antd";
import PropTypes from "prop-types";
import { formItemLayout, tailFormItemLayout } from "../styles/formStyles";
import "whatwg-fetch";

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

      var url = "http://localhost:23075/api/user/saveRoleMenuList/";
      fetch(url + this.props.alRoleId, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values["menus"])
      })
        .then(response => response.json())
        .then(data => {
          if (data.ResultCode != 1) {
            message.error(data.ResultMsg);
            return;
          }
          message.success("保存成功");

          this.roleId = null;
          this.props.form.resetFields(); // 清空表单
          this.props.allocationMenuAction(true);
        })
        .catch(error => {
          console.log(error);
          message.error("保存用户的角色列表失败");
        });
    });
  };

  cancel = () => {
    this.roleId = null;
    this.props.form.resetFields(); // 清空表单
    this.props.allocationMenuAction(false);
  };

  onCheck = checkedKeys => {
    console.log("onCheck", checkedKeys);
    this.setState({ checkedKeys });
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
        this.setState({ data: data.ListData }, () => {
          this.getRoleMenus(this.props.alRoleId);
        });
      })
      .catch(error => {
        message.error("获取菜单列表失败");
      });
  };

  getRoleMenus = roleId => {
    if (!roleId) {
      return;
    }

    var url = "http://localhost:23075/api/user/getRoleMenuList/";
    fetch(url + roleId, {
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
          this.setState({ checkedKeys: [] });
          return;
        }

        this.setState({ checkedKeys: data.ListData });
      })
      .catch(error => {
        message.error("获取角色的菜单列表失败");
      });
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
        onCancel={this.cancel}
      >
        <Form horizontal="true" onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="角色名">
            {this.props.alRoleName}
          </Form.Item>

          <Form.Item {...formItemLayout} label="菜单">
            {getFieldDecorator("menus", {
              initialValue: this.state.checkedKeys,
              valuePropName: "checkedKeys",
              rules: [{ type: "array", required: true, message: "请勾选菜单!" }]
            })(
              <Tree
                checkable
                showLine
                checkStrictly={true}
                onCheck={this.onCheck}
                selectedKeys={this.state.selectedKeys}
              >
                {this.getNodes(this.state.data)}
              </Tree>
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              icon="save"
              height="45"
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 15 }}
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
