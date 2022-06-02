const express = require("express")
let app = express()
let path = require('path')
app.set('views', path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public'), {index: 'login.html'}));
const port = 3000

app.listen(port, function () {
    console.log("Server listening on: http://localhost:" + port)
})

let users = require('./routes/users')
app.use('/users', users)