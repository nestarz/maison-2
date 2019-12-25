import { component, html } from "haunted";

const Page1 = () => html`
  <div>
    <div>A way with your own hands</div>
  </div>
`;

window.customElements.define("page-1", component(Page1));
  