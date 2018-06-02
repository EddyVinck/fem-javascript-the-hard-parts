const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env, argv) => {
  return {
    entry: { main: './src/index.js' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['env'],
              "plugins": ["syntax-dynamic-import"]
            }
          }
        },
        {
					test: /\.(scss|css)$/,
					use: [
						{ 
							loader: 'style-loader'
						},
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader'
						}
					]
				}
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',				
				template: 'src/index.html',
				hash: true,
				inject: false
      })
    ],
    devServer: {
			contentBase: "./dist",
			compress: true,
			port: "9000",
    },
    watchOptions: {
			aggregateTimeout: 300,
			poll: 1000,
			ignored: /node_modules/
		},
    devtool: 'source-map' 
  }
};