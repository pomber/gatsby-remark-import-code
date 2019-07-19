module.exports = function(input) {
  return input
    .replace(
      /`___CODE_IMPORT\(([a-z0-9_]+)\)___[\n\\n]`/g,
      (_, varname) => varname
    )
    .replace(
      /"___CODE_IMPORT\(([a-z0-9_]+)\)___\\n"/g,
      (_, varname) => varname
    );
};
