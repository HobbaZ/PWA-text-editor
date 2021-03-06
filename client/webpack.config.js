const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //Add webpacks here to plugins array
      new HtmlWebpackPlugin({
        template: './index.html',
        title: ''
      }),

      new InjectManifest({
        //link to service worker file
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      //Create manifest file here
      new WebpackPwaManifest({
        filename: "manifest.json",
        fingerprints: false,
        inject: true,
        name:'PWA Text Editor',
        ScreenOrientation: "portrait",
        description:'A text editor with PWA functionality',
        short_name:'Text Editor',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            //path to logo.png
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            //loader, options here
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },

      ],
    },
  };
};
