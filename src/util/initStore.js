import { createStore } from "redux";
import rootReducer from "../reducers";
import Store from "../components/store";

function getGlobalStore() {
  let user = Store.getData(window.YWGlobal.sessionKeys.USER);

  return createStore(rootReducer, { user: user || {} });
}

let haveStore = getGlobalStore();

export default haveStore;
