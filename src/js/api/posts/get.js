import { API_POSTS, API_BASE } from "../constants.js";
import { authFetch } from "../fetch.js";

export async function getPosts() {
  const url = `${API_BASE}${API_POSTS}?_author=true&_comments=true&_reactions=true`;
  const response = await authFetch(url);
  return await response.json();
}
