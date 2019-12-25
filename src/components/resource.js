import YAML from "yamljs";

const render = ({ slug, title, url, description }) => `
  <img src="/content/resources/screenshots/${slug}.200.png" />
  <a href="${url}">${title}</a> ${description
    ? `<div>${description.slice(0, 200)}</div>`
    : ""}
`;

const trigger = {
  src: (host, _, newValue) =>
    fetch(newValue)
      .then(r => r.text())
      .then(YAML.parse)
      .catch(console.error)
      .then(
        content =>
          (host.innerHTML = render({
            slug: newValue
              .split("/")
              [newValue.split("/").length - 1].replace(".yml", ""),
            ...content
          }))
      )
};

class ItemResource extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const fn = trigger[name];
    fn(this, oldValue, newValue);
  }
}

customElements.define("item-resource", ItemResource);
