import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import globalStore from "../../util/initStoreUtil";
import RouterPage from "../appRouters";

// 引入全局样式
import '../../styles/index.less';
import './index.less';

// 全局中文配置
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

render(
  <Provider store={globalStore} style={{ height: "100%" }}>
      <RouterPage />
  </Provider>,
  document.getElementById("root")
);
