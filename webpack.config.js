const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: [
        './src/index.ts',
        './src/source.css'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        compress: true,
        port: 9000
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            'handlebars': 'handlebars/dist/handlebars.min.js'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './static/index.html')
                }, {
                    from: path.resolve(__dirname, './static/images/favicons'),
                    to: path.resolve(__dirname, './dist/images/favicons'),
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        }
                    }
                ],
                exclude: /(node_modules)/
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                path: path.resolve(__dirname, './postcss.config.js')
                            }
                        }
                    }
                ]
            }, {
                test: /\.(png|jpe?g|gif|svg|ico)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                }
            }
        ]
    }
};
