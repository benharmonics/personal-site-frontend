export function handleRes(res) {
  if (res.status >= 300) {
    throw new Error(
      `Request failed with status ${res.status} ${res.statusText}`
    );
  }
};