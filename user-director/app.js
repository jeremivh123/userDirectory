
let express = require('express')
let app = express()

app.use(express.static( __dirname + '/build'))

app.listen(3000)