import { component, html } from "haunted";
import LivreFaiseur from "components/livre.js";
import "/content/livre/page-1.js";

const Livre1 = component(
  () => html`
    <style>
      :host {
        --livre-font-size: 10mm;
        font-size: var(--livre-font-size);
      }
    </style>
    <livre-faiseur>
      <page-1 slot="page-1"></page-1>
    </livre-faiseur>
  `
);

window.customElements.define("livre-faiseur", LivreFaiseur);
window.customElements.define("livre-1", Livre1);
