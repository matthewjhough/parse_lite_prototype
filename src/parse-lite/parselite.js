class ParseLite extends URLSearchParams {
  constructor(queryString) {
    super();
    this.params = queryString
      ? this.parseQueryString(queryString.substring(1))
      : "string=none";
  }

  parseQueryString(queryString) {
    var params = {},
      queries,
      temp,
      i,
      l;
    // Split into key/value pairs
    queries = queryString.split("&");
    // Convert the array of strings into an object
    for (i = 0, l = queries.length; i < l; i++) {
      temp = queries[i].split("=");
      params[temp[0]] = temp[1];
    }
    return params;
  }
}

export default ParseLite;
