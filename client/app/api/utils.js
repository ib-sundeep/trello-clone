export async function makeRequest(method, path, body = null) {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  const response = await fetch(`/api${path}`, {
    method,
    headers: defaultHeaders,
    body: body ? JSON.stringify(body) : null
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  } else {
    const error = new Error(response.statusText);
    error.isFromServer = true;
    error.response = response;
    error.responseJson = json;

    throw error;
  }
}
