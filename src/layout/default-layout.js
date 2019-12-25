import { html } from "utils/html.js";
import "components/nav-links.js";

const globalcss = html`
  <style>
    h1,
    html,
    body {
      margin: 0;
      padding: 0;
    }
    body {
      font-family: "Helvetica Neue", "HelveticaNeueLT Std", Helvetica, Arial,
        sans-serif;
    }
    a,
    a:visited {
      color: black;
      text-decoration: none;
    }
    img {
      width: 100%;
    }
  </style>
`;

const css = html`
  <style>
    :host {
      margin: 1rem;
      display: grid;
      grid-template-columns: max-content auto;
      grid-auto-rows: min-content 1fr;
      grid-gap: 1rem;
      max-width: 56rem;
    }
    :host > main {
      grid-row: span 2;
    }
    :host > header {
      position: sticky;
      top: 1rem;
      background: white;
    }
  </style>
`;

class DefaultLayout extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    const path = this.getAttribute("path") || "";
    this.parentNode.insertAdjacentHTML("beforebegin", globalcss);
    this.shadowRoot.innerHTML =
      globalcss +
      css +
      html`
        <header>
          <h1>
            <a href="/">Chez soi,</a>
            <a href="/${path}">${path}</a>
          </h1>
        </header>
        <main>
          <slot></slot>
        </main>
        <nav-links></nav-links>
      `;
  }
}

customElements.define("default-layout", DefaultLayout);
