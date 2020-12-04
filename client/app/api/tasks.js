import { makeRequest } from "./utils";

export function create(data) {
  return makeRequest("POST", "/tasks", data);
}
