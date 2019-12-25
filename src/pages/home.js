import "layout/default-layout.js";

class PageHome extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <default-layout>
      Bienvenue
    </default-layout>
    `;
  }
}

customElements.define("page-home", PageHome);
