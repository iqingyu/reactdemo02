import { createStore } from "redux";
import rootReducer from "../reducers";

function getGlobalStore(store) {

  if (!store) {
    console.log(store);

    console.log("新建store");

    store = createStore(rootReducer);

    console.log(store);
  } else {
    console.log("store 已经缓存");
  }

  return store;
}

let haveStore = window.yanwenstore;

console.log("已有store");
console.log(haveStore);

haveStore = getGlobalStore(haveStore);

window.yanwenstore = haveStore;

export default haveStore;
