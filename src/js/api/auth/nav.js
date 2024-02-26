// nav.js
import { load } from "../../storage/load.js";

export async function setupNav() {
  const navMenu = document.querySelector("header");
  const token = load("token");

  let middleNavContent;
  let rightNavContent;

  if (token != null) {
    // User is logged in
    middleNavContent = `
      <a href="/index.html" class="text-sm font-semibold leading-6 text-white">Home</a>
      <a href="/profile/" class="text-sm font-semibold leading-6 text-white">Profile</a>
      <a href="/new-post/" class="text-sm font-semibold leading-6 text-white">+ New Post</a>
    `;

    rightNavContent = `<button class="btn btn-ghost logout text-white">Logout</button>`;
  } else {
    // User is not logged in
    middleNavContent = ``;

    rightNavContent = `
      <a href="/profile/login/" class="text-sm font-semibold leading-6 text-white mr-4">Log in</a>
      <a href="/profile/register/" class="text-sm font-semibold leading-6 text-white">Register</a>
    `;
  }

  navMenu.innerHTML = `
    <nav class="flex items-center justify-between w-full p-6 bg-gray-900">
      <div class="flex flex-1">
        <a href="/index.html" class="text-sm font-semibold leading-6 text-white">Social Media Platform</a>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-x-12">
        ${middleNavContent}
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        ${rightNavContent}
      </div>
      <button class="ml-4 lg:hidden btn btn text-white" id="hamburger">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16" />
        </svg>
      </button>
    </nav>
    <div class="hidden lg:hidden bg-gray-700 p-4" id="mobile-menu">
      ${token ? `<a href="/index.html" class="block text-white">Home</a>` : ""}
      ${token ? `<a href="/profile/" class="block text-white">Profile</a>` : ""}
      ${
        token
          ? `<a href="/new-post/" class="block text-white">+ New Post</a>`
          : ""
      }
      ${token ? `<button class="block text-white logout">Logout</button>` : ""}
      ${
        !token
          ? `<a href="/profile/login/" class="block text-white">Log in</a>`
          : ""
      }
      ${
        !token
          ? `<a href="/profile/register/" class="block text-white">Register</a>`
          : ""
      }
    </div>
  `;

  setupMobileMenu();
  if (token) {
    setupLogout();
  }
}

function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

function setupLogout() {
  const logoutButtons = document.querySelectorAll(".logout");
  logoutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.replace("/index.html");
    });
  });
}

document.addEventListener("DOMContentLoaded", setupNav);
