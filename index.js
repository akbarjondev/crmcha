const express = require('express')
const server = require('./src/server.js')

const app = express()
server.run(app, express)
