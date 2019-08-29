const path = require("path");
const fs = require("fs");
const visit = require("unist-util-visit");
const { parse } = require("shell-quote");

module.exports = ({ markdownAST, markdownNode, getNode, files }) => {
  const parentNode = getNode(markdownNode.parent);

  visit(markdownAST, "code", function(node) {
    const argv = parse(node.meta || "");
    const fileArg = argv.find(arg => arg.startsWith("file="));
    if (fileArg) {
      const [, filePath] = fileArg.split(/=(.*)/);
      const fileAbsolutePath = path.join(parentNode.dir, filePath);

      if (!fs.existsSync(fileAbsolutePath)) {
        throw Error(
          `Invalid file in code block; no such file "${fileAbsolutePath}"`
        );
      }

      node.value = fs.readFileSync(fileAbsolutePath, "utf8").trim();
    }
  });
};
