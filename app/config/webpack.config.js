const path = require('path');
const webpack = require('webpack');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

process.env.NODE_ENV = 'development';
const isProduction = process.env.NODE_ENV === 'production';

const publicPath = '/';
const outputPath = 'build';

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        }
    ];
    if (preProcessor) {
        loaders.push(require.resolve(preProcessor));
    }
    return loaders;
};

let config = {
    mode: isProduction ? 'production' : 'development',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(outputPath),
        filename: 'bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: publicPath,
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'vendors',
        },
        runtimeChunk: true,
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.json'],
        plugins: [
            new ModuleScopePlugin('src', ['package.json']),
        ]
    },
    module: {
        strictExportPresence: true,
        rules: [
            { parser: { requireEnsure: false } },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: path.resolve('src'),
                        exclude: [/[/\\\\]node_modules[/\\\\]/],
                        use: [
                            {
                                loader: require.resolve('babel-loader'),
                                options: {
                                    // @remove-on-eject-begin
                                    babelrc: false,
                                    // @remove-on-eject-end
                                    presets: [require.resolve('babel-preset-react-app')],
                                    plugins: [
                                        [
                                            require.resolve('react-hot-loader/babel'),
                                            {
                                                loaderMap: {
                                                    svg: {
                                                        ReactComponent: 'svgr/webpack![path]',
                                                    },
                                                },
                                            },
                                        ],
                                    ],
                                    cacheDirectory: true,
                                    highlightCode: true,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.js$/,
                        use: [
                            {
                                loader: require.resolve('babel-loader'),
                                options: {
                                    babelrc: false,
                                    compact: false,
                                    presets: [ 'env', 'react' ],
                                    plugins: [
                                        "transform-imports",
                                    ],
                                    cacheDirectory: true,
                                    highlightCode: true,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.css$/,
                        exclude: /\.module\.css$/,
                        use: getStyleLoaders({ importLoaders: 1 })
                    },
                    {
                        test: /\.(scss|sass)$/,
                        exclude: /\.module\.(scss|sass)$/,
                        use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader')
                    },
                    {
                        exclude: [/\.(js|jsx|mjs|ts|tsx)$/, /\.html$/, /\.json$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    }
                ]
            }
        ]
    },
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};


let plugins = [];
if (isProduction) {
    plugins.push(new HtmlWebpackPlugin({ inject: true, template: 'src/index.html', minify: { removeComments: true, collapseWhitespace: true, removeRedundantAttributes: true, useShortDoctype: true, removeEmptyAttributes: true, removeStyleLinkTypeAttributes: true, keepClosingSlash: true, minifyJS: true, minifyCSS: true, minifyURLs: true, } }));
    plugins.push(new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: "[id].css" }));
} else {
    plugins.push(new HtmlWebpackPlugin({ inject: true, template: 'src/index.html' }));
    plugins.push(new webpack.HotModuleReplacementPlugin());
}
//plugins.push(new InterpolateHtmlPlugin({ 'PUBLIC_URL': publicPath }));
plugins.push(new MonacoWebpackPlugin());
config.plugins = plugins;

if (!isProduction) {
    config.devtool = 'cheap-module-source-map';
}

if (!isProduction) {
    config.devServer = {
        hot: true,
        publicPath: publicPath,
        contentBase: path.resolve(outputPath),
        compress: true,
        port: 9000
    };
}

module.exports = config;
