const { override, fixBabelImports, addLessLoader, addWebpackAlias, addBabelPlugins, addWebpackModuleRule, addWebpackPlugin, watchAll, overrideDevServer } = require('customize-cra');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
module.exports = { 
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }),
        addWebpackAlias({
            "@": path.resolve("src"),
            "@assets": path.resolve("src/assets"),
            "@view": path.resolve("src/view"),
            "@utils": path.resolve("src/utils"),
            "@components": path.resolve("src/components")
        }),
        addWebpackPlugin(
            new ExtractTextPlugin({
                filename: '[name].[hash].css'
            })
        ),
        addBabelPlugins(
            ['@babel/plugin-proposal-decorators', { "legacy": true }]
        ),
        addWebpackModuleRule(
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                loader: 'url-loader?limit=8192'
            }
        ),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: { 
                    // '@primary-color': 'rgb(9,2,55)', 
                    // "@time-picker-selected-bg": "rgb(1,169,247)",
                    // "@border-color-base": "rgb(0,194,255)", 
                    // "@border-color-split":"#fff", 
                    // "@text-color": "rgb(0,194,255)", 
                    // "@component-background": "rgb(29,32,89)",
                    // "@heading-color": "#fff",
                    // "@disabled-color": "rgb(90,90,99)",
                    // "@disabled-bg": "transparent"
                },
            }
        ),
    ),
    devServer: overrideDevServer(
        watchAll()
    )
}