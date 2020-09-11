const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
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
          }),
          new HtmlWebpackPlugin({
               template: path.join(__dirname, "src/pages/index.html"),
               filename: "index.html",
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
     devServer: {
          contentBase: path.resolve(__dirname, 'dev-dist'),
          inline: true,
          host: 'localhost',
          port: 5000,
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

     return config;
};
