import * as ActionTypes from "./actionTypes";

export const loginAction = (username, userIcon, userData) => {
  var r = {
    type: ActionTypes.USER_LOGIN,
    username: username,
    userIcon: userIcon,
    userData: userData
  };

  console.log("loginAction");
  console.log(r);

  return r;
};

export const logoutAction = () => ({
  type: ActionTypes.USER_LOGOUT
});
