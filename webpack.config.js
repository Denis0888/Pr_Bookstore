var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
   entry: path.resolve(__dirname, "index.js"),
   output: {
      path: path.resolve(__dirname, "bundle"),
      filename: "main.js"
   },
   mode: "production", //development
   plugins: [new MiniCssExtractPlugin()],
   module: {
      rules: [
         {
            test: /\.scss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
         },
      ],
   },
   devServer: {
      static: {
        directory: path.join(__dirname, 'bundle'), 
      },
    },
   optimization: {
      minimizer: ["...", new CssMinimizerPlugin()],
   },
}