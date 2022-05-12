const express = require("express")
const cookieParser = require('cookie-parser')
const {check} = require('express-validator')
const Mustache = require('mustache');
const consolidate = require('consolidate')
let path = require('path')
let app = express()
app.use(cookieParser())
app.engine('html', consolidate.mustache)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'public'))

const port = 8080
// configuring port

app.listen(port, function () {
    console.log("Server listening on: http://localhost:" + port)
})

const {load} = require("mime");
const {response} = require("express");
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}))

app.post("/", function (req, res) {
    // let newCookie =
    // res.cookie('lastVisited', newCookie)
    // let oldCookie = req.cookies.lastVisited
    // if(!oldCookie) {
    //     oldCookie = "Erster Besuch!"
    // }
    res.render("index_tpl.html",
        {
            "todos": [
                {"todo": "TEST"},
                {"todo": "TEST2"}
            ]
        }
    )
})

app.get("/", function (req, res) {
    // let oldCookie = req.cookies.todos
    // if(!oldCookie) {
    //     oldCookie = "Erster Besuch!"
    // }
    // document.getElementById("submit").onclick = function (event) {
    //     document.getElementById("todo").innerText
    //     o
    //     res.cookie('todos', newCookie)
    // }

    res.render("index_tpl.html",
        {
            todos: [
                {todo: "TEST"},
                {todo: "TEST2"}
            ]
        }
    )
})