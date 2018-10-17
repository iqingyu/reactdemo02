const YWGlobal = {
  appName: "燕文物流",
  loginPath: "/login",
  defaultPath: "/",
  baseApi: "http://localhost:23075/",
  apiNames: {
    LOGIN: "api/user/login",
    ADDMENU: "api/user/addMenu",
    ADDROLE: "api/user/addRole/",
    ADDUSER: "api/user/addUser",
    SAVEROLEMENULIST: "api/user/saveRoleMenuList/",
    SAVEUSERROLELIST: "api/user/saveUserRoleList/",
    GETMENULIST: "api/user/getMenuList",
    GETROLEMENULIST: "api/user/getRoleMenuList/",
    GETROLELIST: "api/user/getRoleList",
    GETUSERROLELIST: "api/user/getUserRoleList/",
    GETUSERLIST: "api/user/getUserList",

    SAVEMENU: "api/user/saveMenu",
    SAVEROLE: "api/user/saveRole",

    DELETEMENU: "api/user/deleteMenu/",
    DELETEROLE: "api/user/deleteRole/",
    RESETPASSWORD: "api/user/resetPassword/"
  },
  sessionKeys: {
    USER: "user"
  }
};

export default YWGlobal;
