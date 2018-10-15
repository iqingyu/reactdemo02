import React from "react";

export default class Store extends React.Component {
  static set(key, str) {
    console.log("set");
    console.log(key);
    console.log(str);
    sessionStorage.setItem(key, str);
  }

  static get(key) {
    let r = sessionStorage.getItem(key);
    console.log("get");
    console.log(key);
    console.log(r);
    return r;
  }

  static setData(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data || {}));
  }

  static getData(key) {
    return JSON.parse(sessionStorage.getItem(key) || "{}");
  }

  static remove(key) {
    sessionStorage.removeItem(key);
  }
}
