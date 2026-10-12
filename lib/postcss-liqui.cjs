// Liqui ships a native CSS layer named `base`. Tailwind 3 reserves that name
// for its own directives, so give the package layer its own name before Tailwind runs.
module.exports = () => ({
  postcssPlugin: "liqui-tailwind-3-compat",
  Once(root) {
    const file = root.source?.input.file?.replace(/\\/g, "/") ?? "";
    if (!file.includes("/@liqui-design/glass/")) return;

    root.walkAtRules("layer", (rule) => {
      if (rule.params === "base") rule.params = "liqui-base";
    });
  },
});

module.exports.postcss = true;
