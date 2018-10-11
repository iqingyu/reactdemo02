import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import globalStore from "../configs/globalStore";
import RouterPage from "../routers/routerPage";

// 引入全局样式配置
import "./index.css";

render(
  <Provider store={globalStore} style={{ height: "100%" }}>
      <RouterPage />
  </Provider>,
  document.getElementById("root")
);
