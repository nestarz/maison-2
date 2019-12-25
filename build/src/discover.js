const fs = require("fs").promises;
const path = require("path");
const dirTree = require("directory-tree");

const save = (filename, object) =>
  fs.writeFile(path.join("./build/", filename), JSON.stringify(object));

save(
  "blog.json",
  dirTree("./content/blog", {
    extensions: /\.(md)$/
  }).children
);

save(
  "resources.json",
  dirTree("./content/resources", {
    extensions: /\.(yml)$/
  })
    .children.map(child => {
      if (!child.children || !child.children.length) return null;
      delete child.children;
      return child;
    })
    .filter(x => x)
);

dirTree("./content/resources", {
  extensions: /\.(yml)$/
}).children.forEach(child => {
  save(
    `resources-${child.name}.json`,
    dirTree("./content/resources/" + child.name, {
      extensions: /\.(yml)$/
    }).children
  );
});
