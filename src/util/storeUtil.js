const YWStore = {
  set: function(key, str) {
    window.sessionStorage.setItem(key, str);
  },
  get: function(key) {
    return window.sessionStorage.getItem(key);
  },
  setData: function(key, data) {
    window.sessionStorage.setItem(key, JSON.stringify(data || {}));
  },
  getData: function(key) {
    return JSON.parse(window.sessionStorage.getItem(key) || "{}");
  },
  remove: function(key) {
    window.sessionStorage.removeItem(key);
  }
};

export default YWStore;
