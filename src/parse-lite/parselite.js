/* eslint-disable */

class ParseLite extends URLSearchParams {
  constructor(options) {
    super();
    // TODO: add save states to local storage
    this.options = options;
    this.params = window.location.search
      ? this.parseQueryString(window.location.search.substring(1))
      : { string: "none" };

    this.encrypt = btoa;
    this.decrypt = atob;
  }

  ENCRYPT_KEY = "query";

  setParams = () => {
    this.params = this.parseQueryString(window.location.search.substring(1));
  };

  parseQueryString = queryString => {
    var params = {},
      queries,
      temp,
      i,
      l;
    queries = queryString.split("&");
    for (i = 0, l = queries.length; i < l; i++) {
      temp = queries[i].split("=");
      if (temp[0] === this.ENCRYPT_KEY)
        params[temp[0]] = this.parseEncrypted(temp[1]);
      else params[temp[0]] = temp[1];
    }
    return params;
  };

  parseEncrypted = str => {
    try {
      const decrypted = atob(str);
      return JSON.parse(decrypted);
    } catch (err) {
      if (err) {
        console.warn(
          "Something went wrong when attempting to parse query string: ",
          err
        );
      }
      return str;
    }
  };

  updateURL = value => {
    const encryptedValue = btoa(JSON.stringify(value));
    this.insertParam(this.ENCRYPT_KEY, encryptedValue);
    this.setParams();
  };

  updateCustom = (key, value) => {
    this.insertParam(key, value);
    this.setParams();
  };

  insertParam = (key, value) => {
    if (history.pushState) {
      var currentUrl = window.location.href;
      var currentUrl = this.removeURLParameter(currentUrl, key);
      var queryStart;
      if (currentUrl.indexOf("?") !== -1) {
        queryStart = "&";
      } else {
        queryStart = "?";
      }

      var newurl = currentUrl + queryStart + key + "=" + value;
      window.history.pushState({ path: newurl }, "", newurl);
    }
  };

  removeURLParameter = (url, parameter) => {
    var urlparts = url.split("?");
    if (urlparts.length >= 2) {
      var prefix = encodeURIComponent(parameter) + "=";
      var pars = urlparts[1].split(/[&;]/g);

      for (var i = pars.length; i-- > 0; ) {
        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
          pars.splice(i, 1);
        }
      }

      url = urlparts[0] + (pars.length > 0 ? "?" + pars.join("&") : "");
      return url;
    } else {
      return url;
    }
  };

  // implement "window.location.replace, to destroy state changes" & save changes to local storage
  destory = () => {};
}

export default ParseLite;
