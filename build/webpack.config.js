const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'), // 入口文件
    output: {
        filename: '[name].[hash:8].js', // [name] 指entry属性名字, 默认为main
        path: path.resolve(__dirname, '../dist'), // 打包后的目录
        clean: true, // 打包前清空输出目录，相当于clean-webpack-plugin插件的作用,webpack5新增。
    },
    plugins: [
        new vueLoaderPlugin(),
        new HtmlWebpackPlugin({
            // 选取一个html作为模版，在dist目录下会生成一个相同的html，之后将打包好的js注入到该html文件
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:8].css",
            chunkFilename: "[id].css",
        })
    ],
    module: {
        rules: [
            // 这一个loader必须放在最前面,解析vue文件
            {
                test:/\.vue$/,
                use:['vue-loader']
            },
            {
                // 用正则去匹配要用该 loader 转换的 CSS 文件
                test: /\.css$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // 切记从右向左解析原则
            },
            {
                test: /.less$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test:/\.svg$/,
                type:'asset',
                generator:{
                    filename:"icons/[name]--[hash:8].[ext]"
                }
            },
            {
                test:/\.(png|jpe?g|gif)(\?.*)?$/,
                type:'asset',
                generator: {
                    filename: 'imgs/[name]--[hash:8].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'media/[name]--[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'fonts/[name]--[hash:8].[ext]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // 缓存，加快babel-loader编译速度
                        cacheDirectory: true,
                        // 一系列插件的集合，包括处理箭头函数等，配置后是否需要配置plugins? 后面再看
                        // 2021/5/12 结论：不需要配置其他plugins
                        // useBuiltIns corejs 解决es6新增api无法编译问题（只能编译语法，例如箭头函数）
                        presets: [
                            // ['@babel/preset-env', { targets: 'defaults' }]
                            ['@babel/preset-env', {useBuiltIns: 'usage', corejs: 3, targets: 'defaults'}]
                        ],
                        plugins: [
                            // 编译箭头函数
                            '@babel/plugin-transform-arrow-functions',
                            // 编译装饰器
                            ['@babel/plugin-proposal-decorators', {legacy: true}],
                            // 编译类，loose true时是赋值法定义属性，false时是使用Object.defineProperty定义属性，后者是默认
                            ['@babel/plugin-proposal-class-properties', {loose: false}]
                        ]
                    }
                }
            }
        ]
    },
    resolve:{
        // 设置路径别名
        alias:{
            '@':path.resolve(__dirname,'../src')
        },
        // 尝试按顺序解析这些后缀名。
        // 如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
        extensions:['*','.js','.json','.vue']
    },
    externals: {
        jquery: 'jQuery',
    },
};
