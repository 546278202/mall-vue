'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = {
  NODE_ENV: '"production"',
  API_HOST: '"https://zhangwoyun.feijizhe.com"'//注意点与上面类似
}
