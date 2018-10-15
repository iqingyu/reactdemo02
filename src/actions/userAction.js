import * as ActionTypes from "./actionTypes";

export const loginAction = (userData) => {
  var r = {
    type: ActionTypes.USER_LOGIN,
    userData: userData
  };

  console.log("loginAction");
  console.log(r);

  return r;
};

export const logoutAction = () => ({
  type: ActionTypes.USER_LOGOUT
});
