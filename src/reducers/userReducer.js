import * as ActionTypes from "../actions/actionTypes";

const users = (state = [], action) => {
  console.log("userReducer");
  console.log(state);
  console.log(action);

  switch (action.type) {
    case ActionTypes.USER_LOGIN: {
      var r = action.userData;
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
