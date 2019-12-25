import { html } from "utils/html.js";
import "layout/default-layout.js";

class PageHome extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html`
      <default-layout>
        <img src="https://thelane.com/wp-content/uploads/2018/08/Hero-Ann-Hamilton.jpg"/>
      </default-layout>
    `;
  }
}

customElements.define("page-home", PageHome);
