import { createStore } from "redux";
import rootReducer from "../reducers";

function getGlobalStore() {
  let user = window.YWStore.getData(window.YWGlobal.sessionKeys.USER);

  return createStore(rootReducer, { user: user || {} });
}

let haveStore = getGlobalStore();

export default haveStore;
