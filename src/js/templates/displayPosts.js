// displayPosts.js
import { getPosts } from "../api/posts/get.js";

export async function displayPosts() {
  try {
    const posts = await getPosts();
    renderPosts("#postsContainer", posts.data);
  } catch (error) {
    console.error("Failed to load posts:", error);
  }
}

export function renderPosts(containerSelector, posts) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = ""; // Clear existing content

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    container.appendChild(postElement);
  });
}

export function createPostElement(post) {
  const element = document.createElement("div");
  element.className =
    "rounded-2xl bg-gray-800 px-8 py-10 mb-8 mx-auto max-w-lg md:max-w-xl lg:max-w-2xl";

  // Use default images if avatar or media is not available
  const defaultImagePath = "../../src/images/defaultImage.jpg";
  const defaultAvatarPath = "../../src/images/defaultAvatar.jpg";
  const mediaUrl =
    post.media && post.media.url ? post.media.url : defaultImagePath;
  const avatarUrl =
    post.author && post.author.avatar
      ? post.author.avatar.url
      : defaultAvatarPath;
  const authorName = post.author ? post.author.name : "Unknown";

  const createdAt = new Date(post.created).toLocaleDateString();
  const commentsCount = post._count ? post._count.comments : 0;
  const reactionsCount = post._count ? post._count.reactions : 0;

  // Processing comments
  const commentsHtml =
    post.comments
      ?.map((comment) => {
        const commentAuthorAvatar =
          comment.author?.avatar?.url || defaultAvatarPath;
        return `
      <div class="comment">
        <img src="${commentAuthorAvatar}" alt="Comment author avatar" class="comment-avatar">
        <span class="comment-author">${
          comment.author ? comment.author.name : "Unknown"
        }</span>
        <p class="comment-body">${comment.body}</p>
      </div>
    `;
      })
      .join("") || "";

  // Processing reactions
  const reactionsHtml =
    post.reactions
      ?.map((reaction) => {
        return `
      <div class="reaction">
        <span>${reaction.symbol}</span> <span>${reaction.count}</span>
      </div>
    `;
      })
      .join("") || "";

  element.innerHTML = `
    <a href="/feed/post/index.html?id=${post.id}" class="text-white no-underline block">
      <div class="relative">
        <img src="${mediaUrl}" onerror="this.onerror=null; this.src='${defaultImagePath}'" alt="${post.title}" class="w-full">
        <div class="absolute top-0 left-0 mt-4 ml-4 flex items-center">
          <img src="${avatarUrl}" onerror="this.onerror=null; this.src='${defaultAvatarPath}'" alt="Author's avatar" class="w-10 h-10 rounded-full mr-4">
          <span class="text-white">${authorName}</span>
        </div>
      </div>
      <div class="mt-4">
        <h3 class="text-base font-semibold leading-7 tracking-tight">${post.title}</h3>
        <p class="text-sm leading-6 text-gray-400">${post.body}</p>
        <p class="text-sm text-gray-400">Created: ${createdAt}</p>
        <p class="text-sm text-gray-400">Comments: ${commentsCount}</p>
        <p class="text-sm text-gray-400">Reactions: ${reactionsCount}</p>
      </div>
    </a>
  `;

  return element;
}

document.addEventListener("DOMContentLoaded", displayPosts);
