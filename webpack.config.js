const path = require('path');
module.exports = {
  entry: path.join(__dirname, "src", "main.js"),
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, "src"),
        loader: 'babel-loader',
        query: {
          cacheDirectory: 'babel-cache',
          presets: ['es2015','react']
        }
      }
    ]
  }
};
