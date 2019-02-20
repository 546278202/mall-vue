'use strict'
const path = require('path')
module.exports = {
	dev: {
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {},
		// host: '192.168.1.102', // can be overwritten by process.env.HOST
		host: 'localhost',
		port: 8081,
		autoOpenBrowser: true,
		errorOverlay: true,
		notifyOnErrors: true,
		poll: false,
		useEslint: false,
		showEslintErrorsInOverlay: false,
		devtool: 'cheap-module-eval-source-map',
		cacheBusting: true,
		cssSourceMap: true
	},

	build: {
		index: path.resolve(__dirname, '../dist/index.html'),  //模板
		assetsRoot: path.resolve(__dirname, '../dist'),  //打包后文件要存放的路径
		assetsSubDirectory: 'static',   //除了 index.html 之外的静态资源要存放的路径
		assetsPublicPath: './',  //代表打包后，index.html里面引用资源的的相对地址
		productionSourceMap: true,
		devtool: '#source-map',
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		bundleAnalyzerReport: process.env.npm_config_report
	}
}
