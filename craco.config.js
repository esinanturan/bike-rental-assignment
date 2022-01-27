const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@styled": "./src/styled",
          "@store": "./src/store",
          "@pages": "./src/pages",
          "@layout": "./src/layout",
          "@theme": "./src/theme",
          "@api": "./src/api",
          "@views": "./src/views",
          "@": "./src/helpers",
        },
        debug: false,
      },
    },
  ],
};
