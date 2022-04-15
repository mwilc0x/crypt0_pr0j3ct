const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { StatsWriterPlugin } = require("webpack-stats-plugin");

module.exports = (env, argv) => {
    let config = {
        entry: './src/index.tsx',
        devtool: 'cheap-module-source-map',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
        },
        devServer: {
            port: 1337,
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(s[ac]ss|css)$/i,
                    use: [
                        process.env.NODE_ENV !== 'production'
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: ['./src/styles']
                                }
                            }
                        }
                    ],
                    sideEffects: true,
                },
                {
                    test: /\.m?js/,
                    resolve: {
                        fullySpecified: false
                    }
                },
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            // nodejs polyfills for webpack > 5
            fallback: {
                'assert': require.resolve('assert'),
                'stream': require.resolve('stream-browserify')
            }
        },
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new Dotenv({
                path: '../../.env'
            }),
            new HtmlWebpackPlugin({ 
                minify: true,
                template: './src/index.html'
            }),
            new webpack.SourceMapDevToolPlugin({}),
            new TerserPlugin(),
            new StatsWriterPlugin({
                filename: "stats.json" // Default
            })
        ],
    };

    return config;
};
