import * as ActionTypes from "./actionTypes";

export const loginAction = (username, usericon, userdata) => {
  var r = {
    type: ActionTypes.USER_LOGIN,
    username: username,
    usericon: usericon,
    userdata: userdata
  };

  console.log("loginAction");
  console.log(r);

  return r;
};

export const logoutAction = () => ({
  type: ActionTypes.USER_LOGOUT
});
