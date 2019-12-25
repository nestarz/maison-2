import "components/nav-links.js";

class DefaultLayout extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    const path = this.getAttribute("path");
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          margin: 1rem;
          font-family: "Helvetica Neue", "HelveticaNeueLT Std", Helvetica, Arial,
            sans-serif;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
          max-width: 56rem;
        }
        main {
          grid-column: span 2;
        }
        h1 {
          margin: 0;
          padding: 0;
          text-transform: capitalize;
          position: sticky;
          top: 1rem;
          background: white;
        }
        a:visited {
          color: green;
        }
      </style>
      <h1><a href="/">Chez soi</a> ${
        path ? `> <a href="/${path}">${path}</a>` : ""
      }</h1>
      <main>
        <slot></slot>
      </main>
      <nav-links></nav-links>
    `;
  }
}

customElements.define("default-layout", DefaultLayout);
