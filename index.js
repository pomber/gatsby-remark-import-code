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
      node.value = fs.readFileSync(fileAbsolutePath, "utf8");
      // const fileNode = files.find(f => f.absolutePath === fileAbsolutePath)
      // console.log(fileNode)
    }
  });
};
