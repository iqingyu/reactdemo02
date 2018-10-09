import * as ActionTypes from "../actions/actionTypes";

const users = (state = [], action) => {
  console.log("userReducer");
  console.log(state);
  console.log(action);

  switch (action.type) {
    case ActionTypes.USER_LOGIN: {
      var r = {
        username: action.username,
        usericon: action.usericon,
        userdata: action.userdata
      };
      console.log(r);
      return r;
    }
    case ActionTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default users;
