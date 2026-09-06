const API_BASE = (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_URL) || "http://localhost:3001/api";

async function fetchAPI(endpoint) {
  const res = await fetch(API_BASE + endpoint);
  if (!res.ok) {
    throw new Error("API error: " + res.status);
  }
  return res.json();
}

async function postAPI(endpoint, body) {
  const res = await fetch(API_BASE + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("API error: " + res.status);
  }
  return res.json();
}

async function patchAPI(endpoint, body) {
  const res = await fetch(API_BASE + endpoint, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("API error: " + res.status);
  }
  return res.json();
}

export function getStats() {
  return fetchAPI("/stats");
}

export function getBridgeRequests(status) {
  const q = status && status !== "all" ? "?status=" + status : "";
  return fetchAPI("/bridge-requests" + q);
}

export function getValidators(status) {
  const q = status && status !== "all" ? "?status=" + status : "";
  return fetchAPI("/validators" + q);
}

export function getFunds(category) {
  const q = category && category !== "all" ? "?category=" + category : "";
  return fetchAPI("/funds" + q);
}

export function getFundSummary() {
  return fetchAPI("/funds/summary");
}

export function createBridgeRequest(data) {
  return postAPI("/bridge-requests", data);
}

export function updateBridgeRequest(id, data) {
  return patchAPI("/bridge-requests/" + id, data);
}

export function updateValidator(id, data) {
  return patchAPI("/validators/" + id, data);
}
