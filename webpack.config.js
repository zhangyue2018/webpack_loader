const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TestPlugin = require('./plugins/test-plugin');
const BannerWebpackPlugin = require('./plugins/banner-webpack-plugin');
const CleanWebpackPlugin = require('./plugins/clean-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        // clean: true
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     loader: './loaders/test-loader.js',
            // },
            // {
            //     test: /\.js$/,
            //     use: ['./loaders/demo/test1', './loaders/demo/test2'],
            // },
            // {
            //     test: /\.js$/,
            //     use: ['./loaders/demo/test3'],
            // },
            // {
            //     test: /\.js$/,
            //     use: ['./loaders/demo/test4', './loaders/demo/test5', './loaders/demo/test6'],
            // },
            {
                test: /\.js$/,
                use: ['./loaders/clean-log-loader'],
            },
            // {
            //     test: /\.js$/,
            //     include: path.resolve(__dirname, './src'),
            //     use: [ {
            //         loader: './loaders/banner-loader',
            //         options: {
            //             author: '张三丰',
            //         }
            //     }],
            // },
            {
                test: /\.js$/,
                loader: './loaders/babel-loader',
                options: {
                    presets: ["@babel/preset-env"],
                }
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                loader: './loaders/file-loader',
                type: 'javascript/auto', // 阻止webpack默认处理图片资源，只使用file-loader处理
            },
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'],
                use: ['./loaders/style-loader', 'css-loader'],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
        // new TestPlugin(),
        new BannerWebpackPlugin({
            author: '张三丰'
        }),
        new CleanWebpackPlugin(),
    ],
    // mode: 'development',
    mode: 'production',
}