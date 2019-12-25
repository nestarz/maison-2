import "components/render-markdown.js";
import "layout/default-layout.js";

class PageBlog extends HTMLElement {
  connectedCallback() {
    const slug = this.getAttribute("slug");
    this.innerHTML = `
    <default-layout path="blog">
      ${
        slug
          ? `<render-markdown src="/content/blog/${slug}"></render-markdown>`
          : ""
      }
    </default-layout>
    `;
  }
}

customElements.define("page-blog", PageBlog);
