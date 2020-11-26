const { makeRequest } = require("./utils");

export function getList() {
  return makeRequest("GET", "/boards");
}
