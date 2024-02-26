import { API_BASE, API_AUTH, API_REGISTER } from "../constants.js";
import { authFetch } from "../fetch.js";

export async function register(name, email, password, avatar) {
  const userData = { name, email, password };

  if (avatar) {
    userData.avatar = avatar;
  }

  try {
    const response = await authFetch(API_BASE + API_AUTH + API_REGISTER, {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const responseBody = await response.json();
      console.error("Registration errors:", responseBody.errors);
      const errorMessage = responseBody.message || "Unknown error occurred";
      console.error("Registration error:", errorMessage);
      throw new Error(`Failed to register: ${errorMessage}`);
    }

    // Success message display and redirect
    displaySuccessMessage();
    setTimeout(() => {
      window.location.href = "/index.html"; // Redirect to login page
    }, 3000); // 3 seconds delay
  } catch (error) {
    console.error(error);
    // Handle error display here, if needed
  }
}

function displaySuccessMessage() {
  const messageContainer = document.createElement("div");
  messageContainer.innerHTML = `
    <p style="color: green; font-size: 20px; text-align: center;">Registration successful! Redirecting to login page...</p>
  `;
  messageContainer.style.position = "fixed";
  messageContainer.style.top = "50%";
  messageContainer.style.left = "50%";
  messageContainer.style.transform = "translate(-50%, -50%)";
  messageContainer.style.backgroundColor = "white";
  messageContainer.style.padding = "20px";
  messageContainer.style.borderRadius = "10px";
  messageContainer.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";

  document.body.appendChild(messageContainer);
}
