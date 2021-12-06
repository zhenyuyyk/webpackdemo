const {merge} = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');
const env = require("../config/dev.env");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        port: 3000,
        // 根据需要是否开启以下配置
        // hot: true, //热更新
        // open: true, //编译完自动打开浏览器
        // compress: true,//开启gzip压缩
        // static: { //托管静态资源文件
        //     directory: path.join(__dirname, "../public"),
        // },
        // client: { //在浏览器端打印编译进度
        //     progress: true,
        // },
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": env,
        }),
    ],
});
