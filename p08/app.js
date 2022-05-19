/*
    Alle Funktionalitäten des Backend funktionieren, aber sie sind noch nicht mit dem Frontend verbunden.
    Dabei hatte ich leider Probleme...
 */


const express = require("express")
const Mustache = require('mustache');
const consolidate = require('consolidate')
let path = require('path')
let app = express()
app.engine('html', consolidate.mustache)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'public'))

const port = 8080

app.listen(port, function () {
    console.log("Server listening on: http://localhost:" + port)
})

const {load} = require("mime");
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

let router = require('./routes/todos.routes')
const {getTodos} = require("./routes/todos.routes");
app.use(express.json())
app.use(express.text())

// for testing
let todos = getTodos()
todos.addTodo('Blumen für Mama kaufen')
todos.addTodo('Nochmal Blumen für Mama kaufen')

app.get('/', function (req, res) {
    res.type('text/html');
    todos = getTodos()
    res.render("index_tpl.html", {todos: JSON.parse(JSON.stringify(todos.getAllTodos()))})
})

app.use('/todos', router.router)