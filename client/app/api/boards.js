const { makeRequest } = require("./utils");

export function getList() {
  return makeRequest("GET", "/boards");
}

export function create(data) {
  return makeRequest("POST", "/boards", data);
}
