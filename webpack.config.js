'user strict';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body' 
});
const urlLoader = require("url-loader");


module.exports = {
    entry: './app/index.js',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=public/fonts/[name].[ext]'
            }
        ]
    },
    devServer: {
        contentBase: './build'
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + 'build'
    },
    plugins: [HTMLWebpackPluginConfig, new ExtractTextPlugin('style.css',{
        allowChunks: true
    }), new webpack.DefinePlugin({
        'process.env' : {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }),
    ]
}