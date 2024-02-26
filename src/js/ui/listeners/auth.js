import { onAuth } from "../events/onAuth.js";

export function setAuthListener() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", onAuth);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", onAuth);
  }
}
