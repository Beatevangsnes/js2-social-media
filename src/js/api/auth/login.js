import { save } from "../../storage/save.js";
import { API_BASE, API_AUTH, API_LOGIN } from "../constants.js";
import { authFetch } from "../fetch.js";

export async function login(email, password) {
  try {
    const response = await authFetch(API_BASE + API_AUTH + API_LOGIN, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const responseBody = await response.json();
    if (!response.ok) {
      // Display custom error message
      const errorContainer = document.getElementById("loginError");
      if (errorContainer) {
        errorContainer.textContent = "Incorrect username or password.";
        errorContainer.style.display = "block"; // Show the error message
      }
      return; // Stop further execution
    }

    const { accessToken, ...profile } = responseBody.data;
    save("token", accessToken);
    save("profile", profile);

    // Redirect to the feed page upon successful login
    window.location.href = "../../../../feed/index.html";
    // Redirect or update UI upon successful login
  } catch (error) {
    console.error("Login error:", error);
    // Optionally handle any additional unexpected errors
  }
}
