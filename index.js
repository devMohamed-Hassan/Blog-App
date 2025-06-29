const express = require('express')
const {bootstrap} = require('./app/bootstrap')

const app = express()
bootstrap(app, express)




