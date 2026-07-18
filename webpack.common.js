const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        app: './js/portfolio.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: './js/portfolio.js',
    },
    plugins: [
      new CopyPlugin({
  patterns: [
    { from: "portfolio-sitemap.xml", to: "" },
  ],
}),
    ]
};
