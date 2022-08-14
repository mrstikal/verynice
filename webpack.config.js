const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "build/")
        // publicPath: '/modelace-nove/static/'
    },
    module: {
        rules: [

            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ],
                    },
                },
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            // {
            //     test: /\.(ts|tsx)$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "ts-loader",
            //     },
            // },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.css$/i,
                use: [
                     'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                // write image files under 10k to inline or copy image files over 10k
                test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            fallback: 'file-loader',
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
            {
                // write files under 10k to inline or copy files over 10k
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            fallback: 'file-loader',
                            name: 'fonts/[name].[ext]',
                        },
                    },
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
    ]
}