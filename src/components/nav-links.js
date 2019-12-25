import posts from "build/blog.json";
import resources from "build/resources.json";

const css = `
<style>
  nav-links {
    display: grid;
    grid-gap: 1rem;
  }
  summary {
    margin-bottom: 1rem;
    cursor: pointer;
    outline: none;
  }
  details a {
    text-transform: capitalize;
  }
</style>`;

const Link = endpoint => post => `
  <div><a href="/${endpoint}/${post.name}">${post.name.replace(/-/g, ' ').replace('.md', '')}</a></div>
`;

class NavLinks extends HTMLElement {
  constructor() {
    super();
    const postLinks = posts.map(Link("blog")).join("");
    const resourcesLinks = resources.map(Link("resources")).join("");
    this.innerHTML = `
      ${css}
      <details open><summary>Blog</summary>${postLinks}</details>
      <details open><summary>Resources</summary>${resourcesLinks}</details>
    `;
  }
}

customElements.define("nav-links", NavLinks);
