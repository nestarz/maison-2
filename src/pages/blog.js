import { html } from "utils/html.js";

import "layout/default-layout.js";
import "components/render-markdown.js";

class PageBlog extends HTMLElement {
  connectedCallback() {
    const slug = this.getAttribute("slug");
    this.innerHTML = slug
      ? html`
          <default-layout path="blog">
            <render-markdown src="/content/blog/${slug}"></render-markdown>
          </default-layout>
        `
      : html`
          <default-layout path="blog"></default-layout>
        `;
  }
}

customElements.define("page-blog", PageBlog);
