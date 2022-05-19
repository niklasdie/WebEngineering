const todoList = require('../modules/todo.model.js')
const express = require('express')
const {vash} = require("consolidate");
const router = express.Router()
const todos = new todoList()

var getTodos = function () {
    return todos;
}


// GET all todos
router.get('/', function (req, res) {
    res.type('application/json');
    res.send(todos.getAllTodos());
})

router.post('/', function (req, res) {
    res.type('application/json');
    let id = todos.addTodo(req.body)
    res.send(todos.getTodo(id));
})

router.get('/:id', function (req, res) {
    res.type('application/json');
    res.send(todos.getTodo(parseInt(req.params.id)));
})

router.delete('/:id', function (req, res) {
    res.type('application/json');
    res.send(todos.removeTodo(parseInt(req.params.id)));
})

// Pfad abgewandelt ...
router.delete('/done', function (req, res) {
    res.type('application/json');
    todos.clearDone();
    res.send(todos.getAllTodos());
})

router.delete('/', function (req, res) {
    res.type('application/json');
    todos.clear();
    res.send(todos.getAllTodos());
})

router.patch('/:id', function (req, res) {
    res.type('application/json');
    todos.setDone(parseInt(req.params.id), req.body[0].value);
    res.send(todos.getAllTodos());
})

module.exports = {router, getTodos};