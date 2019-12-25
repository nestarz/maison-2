import "layout/default-layout.js";
import "components/resource.js";

const css = `
<style>
  .resources {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(8rem,1fr));
    grid-gap: 1rem;
  }
  item-resource {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr min-content;
    grid-gap: .5rem;
  }
  item-resource img {
    width: 8rem;
  }
  item-resource a {
    width: 8rem;
    overflow: hidden;
    white-space: nowrap;
    color: inherit;
    text-decoration: none;
  }
  item-resource div {
    display: none;
  }
</style>
`

const Resource = resource => `
  <item-resource src="/${resource.path}">s</item-resource>
`;

class PageResources extends HTMLElement {
  async connectedCallback() {
    const cat = this.getAttribute("category");
    const { default: resources } = await import(`build/resources-${cat}.json`);
    this.innerHTML = `
      ${css}
      <default-layout path="resources">
        <div class="resources">${resources.map(Resource).join("")}</div>
      </default-layout>
    `;
  }
}

customElements.define("page-resources", PageResources);
