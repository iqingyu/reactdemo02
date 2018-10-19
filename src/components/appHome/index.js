import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import globalStore from "../../util/initStoreUtil";
import RouterPage from "../appRouters";

// 引入全局样式
import '../../styles/index.less';
import './index.less';

render(
  <Provider store={globalStore} style={{ height: "100%" }}>
      <RouterPage />
  </Provider>,
  document.getElementById("root")
);
