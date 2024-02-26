import { login } from "../../api/auth/login.js";
import { register } from "../../api/auth/register.js";
import { getPosts } from "../../api/posts/get.js";

export async function onAuth(event) {
  event.preventDefault();
  const name = event.target.name?.value;
  const email = event.target.email.value;
  const password = event.target.password.value;
  const avatar = event.target.avatar?.value;

  if (event.submitter.dataset.auth === "login") {
    await login(email, password);
  } else {
    await register(name, email, password, avatar);
    await login(email, password);
  }

  await getPosts();
}
