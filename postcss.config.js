module.exports = {
  plugins: {
    [require.resolve("./lib/postcss-liqui.cjs")]: {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
