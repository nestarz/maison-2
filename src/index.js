import Router from "utils/router.js";
const router = new Router();

const app = document.getElementById("app");

router
  .get("/", async _ => {
    await import("pages/home.js");
    app.innerHTML = "<page-home></page-home>";
  })
  .get("/blog", async _ => {
    await import("pages/blog.js");
    app.innerHTML = `<page-blog></page-blog>`;
  })
  .get("/blog/:slug", async (_, [slug]) => {
    await import("pages/blog.js");
    app.innerHTML = `<page-blog slug="${slug}"></page-blog>`;
  })
  .get("/resources/:category", async (_, [category]) => {
    await import("pages/resources.js");
    app.innerHTML = `<page-resources category="${category}"></page-resources>`;
  })
  .get("/(.*)", async _ => {
    await import("pages/home.js");
    app.innerHTML = "<page-home></page-home>";
  })
  .init();
