const express = require("express")
let app = express()
let path = require('path')
app.set('views', path.join(__dirname, 'public'))

const port = 8080

app.listen(port, function () {
    console.log("Server listening on: http://localhost:" + port)
})

let router = require('./routes/todos.routes')

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/scripts/mustache', express.static(path.join(__dirname, 'node_modules/mustache')))
app.use('/todos', router.router)

// const {getTodos} = require("./routes/todos.routes");
// // for testing
// let todos = getTodos()
// todos.addTodo('Blumen für Mama kaufen')
//
// todos.addTodo('Nochmal Blumen für Mama kaufen')
//
// app.get('/', function (req, res) {
//     res.type('text/html');
//     todos = getTodos()
//     console.log({todos: JSON.parse(JSON.stringify(todos.getAllTodos()))})
//     res.render("index.html", {todos: JSON.parse(JSON.stringify(todos.getAllTodos()))})
// })
