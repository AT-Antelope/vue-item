import cookie from "cookie_js";

const adminToken = "admin_token";

const adminUsername = "admin_username";

export function getToken() {
  return cookie.get(adminToken);
}

export function setToken(token) {
  return cookie.set(adminToken, token, 1);
}

export function removeToken(token) {
  return cookie.remove(adminToken);
}

export function getUserName() {
  return cookie.get(adminUsername);
}

export function setUserName(value) {
  return cookie.set(adminUsername, value, 1);
}

export function removeUserName() {
  return cookie.remove(adminUsername);
}
