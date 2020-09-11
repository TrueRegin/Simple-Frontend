# Simple Frontend Template
A simple frontend template to use when building clients, allows direct modification of JS, integration with Typescript & SASS and no overhead.

### Install Script
Run this script to install all the dependencies you need if you are trying to insert this into an existing project/need to start working fast.
```
yarn add webpack webpack-cli webpack-dev-server html-loader html-webpack-plugin style-loader css-loader sass sass-loader mini-css-webpack-plugin typescript ts-loader file-loader -D
```

### Webpack Config
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
     devServer: {
          contentBase: '/dist',
          port: 5000,
     },
     entry: {
          main: path.resolve(__dirname, 'src', 'main.ts'),
     },
     output: {
          path: path.resolve(__dirname, 'dist'),
          publicPath: '/dist/',
          filename: '[name].bundle-[hash].js',
          chunkFilename: '[name].[hash].js',
     },
     plugins: [
          new MiniCssExtractPlugin({
               filename: 'styles/[name].css',
               chunkFilename: '[id].css',
          }),
          new HtmlWebpackPlugin({
               template: path.join(__dirname, 'src/pages/index.html'),
               filename: 'index.html',
          }),
     ],
     module: {
          rules: [
               {
                    // Remove this object if your project doesn't use html
                    test: /\.html/,
                    use: ['html-loader'],
               },
               {
                    // Remove this object if your project doesn't use typescript
                    test: /\.ts/,
                    use: ['ts-loader'],
                    exclude: /node_modules/,
               },
               {
                    // Remove this line
                    test: /\.(svg|png|jpe?g|gif)$/,
                    use: {
                         loader: 'file-loader',
                         options: {
                              name: '[name].[ext]',
                              outputPath: 'assets',
                         },
                    },
               },
          ],
     },
     resolve: {
          alias: { '@': path.resolve(__dirname, 'src') },
     },
};

const diff = {
     sass: {
          production: {
               test: /\.s(c|a)ss$/,
               loaders: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
               ],
          },
          development: {
               test: /\.s(c|a)ss$/,
               loaders: ['style-loader', 'css-loader', 'sass-loader'],
          },
     },
     css: {
          production: {
               test: /\.css$/,
               loaders: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          development: {
               test: /\.css$/,
               loaders: ['style-loader', 'css-loader'],
          },
     },
};
module.exports = function (env, argv) {
     config.module.rules.push(diff.sass[argv.mode]);
     config.module.rules.push(diff.css[argv.mode]);

    console.log("Webpack content served on http://localhost:5000/dist")

     return config;
};
```

### NPM Scripts
```json
"scripts": {
    "build": "webpack --config=webpack.config.js --mode=production",
    "dev": "webpack-dev-server --config=webpack.config.js --mode=development",
    "serve": "serve dist"
}
```