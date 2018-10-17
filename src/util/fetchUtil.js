import "whatwg-fetch";
import "es6-promise";

class Option {
  constructor() {
    // 开始函数
    this.start = null;
    // 结束函数
    this.end = null;
    this.callback = null; // success:bool, data:json|text,
    this.isJsonContent = true; // 默认返回json对象
    this.fetchOption = {
      mode: "cors", // 默认启用跨区
      credentials: "omit", //默认不附带cookie信息
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    };
  }
}

function thenCatchFinally(promise, option) {
  promise
    .then(
      function(response) {
        console.log("success");
        if (response.ok) {
          console.log("ok");
          if (option.isJsonContent) {
            return response.json();
          }
          return response.text();
        } else if (response.status >= 300 && response.status < 400) {
          console.log("status:3xx");
          return response;
        } else {
          console.log("status:" + response.status);
          var error = new Error(getHttpErrorMsg(response.status));
          error.response = response;
          throw error;
        }
      },

      function(response) {
        console.log("error");
        console.log(response);
        console.log(response.status);
        var error = new Error(getHttpErrorMsg(response.status));
        error.response = response;
        throw error;
      }
    )
    .then(data => {
      if (option.callback) {
        option.callback(true, data);
      }
    })
    .catch(function(error) {
      console.log("catch");
      console.log(error);
      if (option.callback) {
        option.callback(false, error.message || "网络异常，请重试");
      }
    });

  if (option.end) {
    promise.finally(option.end);
  }
}

function getDefaultOption() {
  return new Option();
}

function getHttpErrorMsg(code) {
  switch (code) {
    case 400:
      return "请求错误";
    case 401:
      return "未授权，请联系系统管理员";
    case 403:
      return "禁止访问";
    case 404:
      return "请求的资源不存在";
    case 405:
      return "请求的方法被禁用";
    case 408:
      return "请求超时";
    case 410:
      return "请求的资源已被删除";
    case 500:
      return "内部服务器错误，请重试";
    case 502:
      return "网关错误，请重试";
    case 503:
      return "服务不可用，请重试";
    case 504:
      return "网关超时，请重试";
    default:
      break;
  }

  return "网络异常，请重试";
}

function doHttp(url, option, method, body) {
  option = option || getDefaultOption();

  if (option.start) {
    option.start();
  }

  let doOption = Object.assign({}, option.fetchOption, { method: "" + method });

  if (body) {
    Object.assign(doOption, { body: "" + body });
  }

  let promise = fetch(url, doOption);

  thenCatchFinally(promise, option);

  return promise;
}

function get(url, option) {
  doHttp(url, option, "get");
}

function post(url, data, option) {
  doHttp(url, option, "post", data || "");
}

function put(url, data, option) {
  doHttp(url, option, "put", data || "");
}

function deleteMethod(url, data, option) {
  doHttp(url, option, "delete", data || "");
}

const YWFetch = {
  getDefaultOption: getDefaultOption,
  doHttp: doHttp,
  get: get,
  post: post,
  put: put,
  deleteMethod: deleteMethod
};

export default YWFetch;
