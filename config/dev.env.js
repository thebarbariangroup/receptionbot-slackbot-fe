'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  API_URI: '"http://127.0.0.1:3000"',
  NODE_ENV: '"development"'
})
