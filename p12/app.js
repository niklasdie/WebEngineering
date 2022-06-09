const express = require('express');
const app = express();
const path = require('path')
const port = 3000;
const session = require('express-session')
const consolidate = require("consolidate")

const users = require('./routes/users')
const info = require('./routes/info')


app.listen(port, function () {
    console.log("Server listening on: http://localhost:" + port)
});

app.use('/scripts/mustache', express.static(path.join(__dirname, 'node_modules/mustache')))

app.use('/users', users);
app.use('/info', info);

app.get("/", function (req, res) {
    res.redirect("/users/login")
})

app.engine('html', consolidate.mustache)
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'))