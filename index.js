var { parse } = require("shell-quote");
var visit = require("unist-util-visit");

module.exports = attacher;

function attacher() {
  return transformer;

  function transformer(tree, file) {
    const importedCode = {};
    let count = 0;
    visit(tree, "code", visitor);

    function visitor(node) {
      const argv = parse(node.meta || "");
      const fileArg = argv.find(arg => arg.startsWith("file="));
      if (fileArg) {
        const [, filePath] = fileArg.split(/=(.*)/);

        if (!(filePath in importedCode)) {
          importedCode[filePath] = `___code${count++}`;
          tree.children.push({
            type: "import",
            value: `import ${
              importedCode[filePath]
            } from "!!raw-loader!${filePath}"\n`
          });
        }

        node.value = `___CODE_IMPORT(${importedCode[filePath]})___`;
      }
    }
  }
}
