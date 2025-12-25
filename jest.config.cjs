// jest.config.cjs
module.exports = {
  verbose: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest", // transpile ESM syntax using your .babelrc
  },
};
