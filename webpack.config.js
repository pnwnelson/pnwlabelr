var config = require('hjs-webpack')


module.exports = config({
	in: 'src/app.js',
	out: 'public',
	isDev: process.env.NODE_ENV !== 'production',
	html: true,
	module: {
      loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel", query: {presets:['react','es2015']}}
      ]
  }
})