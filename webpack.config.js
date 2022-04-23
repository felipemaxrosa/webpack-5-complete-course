const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 4 Types of Asset Modules
// - asset/resource - to large files,
// - asset/inline - to small files, increase the bundle
// - asset - combination of two above, and use
//           parser.dataUrlCondition.maxSize
// - asset/source

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname, './dist'),
		publicPath: '',
	},
	mode: 'none',
	module: {
		rules: [
			{
				test: /\.(png|jpg)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 3 * 1024, // 3 kilobytes
					},
				},
			},
			{
				test: /\.txt/,
				type: 'asset/source',
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.hbs$/,
				use: ['handlebars-loader'],
			},
		],
	},
	plugins: [
		new TerserPlugin(),
		new MiniCssExtractPlugin({
			filename: 'styles.[contenthash].css',
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				'**/*',
				path.join(process.cwd(), 'build/**/*'),
			],
		}),
		new HtmlWebpackPlugin({
			title: 'Hello world',
			template: 'src/index.hbs',
			description: 'Some description',
		}),
	],
};
