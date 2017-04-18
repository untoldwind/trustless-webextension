const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: ['./src/app.scss'],
        background: ['./src/background.ts'],
        popup: ['./src/popup.tsx'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['ts-loader'],
            }, {
                test: /\.scss$/,
                loaders: [
                    "file-loader?name=[name].css",
                    "extract-loader",
                    "css-loader",
                    "resolve-url-loader",
                    "sass-loader?sourceMap",
                ],
            }, {
                test: /\.css$/,
                loaders: [
                    "file-loader?name=[name].css",
                    "extract-loader",
                    "css-loader",
                    "resolve-url-loader",
                ],
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({chunks: ['popup'], title: 'Trustless', filename: 'popup.html',}),
        new HtmlWebpackIncludeAssetsPlugin({assets: ['app.css'], append: true})
    ],
};
