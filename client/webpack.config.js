var path = require("path");

module.exports = {
  include: path.appSrc,
  loader: require.resolve("babel-loader"),
  options: {
    plugins: [
     [
    "module-resolver",
    {
      root: ["./src"],
      alias: {
        "@app": "./src",
        "@redux": "./src/redux"
      },
        },
      ],
    ],
    cacheDirectory: true,
  },
};