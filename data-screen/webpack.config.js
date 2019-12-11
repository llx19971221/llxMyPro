const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: "development",
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'), // 输出的路径
        filename: 'index.[hash].js'
    },
    publicPath: "/",
    plugins:[
          //打包前先清空
        new HtmlWebpackPlugin({
            template: __dirname + '/public/index.html',
            filename: 'index.html',
            inject: true,
            favicon: path.resolve('public/favicon.ico')
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash].css'
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            '@': path.resolve('./src'),
            "@assets": path.resolve("src/assets"),
            "@view": path.resolve("src/view"),
            "@components": path.resolve("src/components")
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname), //这里指的是服务器在哪个文件夹下起
        host: "0.0.0.0", // 服务器的IP地址，可以使用IP也可以使用localhost
        inline: true, //看下文
        compress: true, //是否起用服务端压缩
        hot: true,
        open: true,
        port: 1818, //默认为8080
        proxy: {
            "/screenApi": {
                target: "http://192.168.100.101:8076/api/DataScreen",
                changeOrigin: true,
                pathRewrite: {
                    "^/screenApi": ""
                }
            }
        }
    }
};