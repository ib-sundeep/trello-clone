export function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    fetch(`/api${path}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : null
    })
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
  });
}
