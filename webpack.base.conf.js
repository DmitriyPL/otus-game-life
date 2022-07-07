const path = require("path");
const fs = require("fs");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist"),
  assets: "assets/",
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith(".pug"));

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    main: PATHS.src,
  }, 
  output: {
    filename: "[name].js",
    path: PATHS.dist,
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.pug$/i,
        loader: "pug3-loader",
      },

      {
        test: /\.js$/i,
        loader: "babel-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },      

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },

      {
        test: /\.(png|jpg|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[hash].[ext]",
        },
      },

      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },

      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      "~": PATHS.src,
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
        { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts`, },
        { from: `${PATHS.src}/static`, to: "static" },
      ],
    }),

    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/index.pug`,
      filename: "./index.html",
      chunks: ['main'],
    }),   
  ],
};
