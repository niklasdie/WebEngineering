const todoList = require('../modules/todo.model.js')
const express = require('express')
const {vash} = require("consolidate");
const router = express.Router()
const todos = new todoList()

var getTodos = function () {
    return todos;
}

router.use(express.json());
router.use(express.text());

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

router.delete('/', function (req, res) {
    if (req.query.done !== 'true') {
        todos.clear();
        res.send();
    } else {
        todos.clearDone();
        res.type('application/json');
        res.send(todos.getAllTodos());
    }
});

router.patch('/:id', function (req, res) {
    res.type('application/json');
    if (req.body.op === 'replace') {
        if (req.body.path === '/done') {
            if (req.body.value === 'true') {
                todos.setDone(parseInt(req.params.id), true);
                res.send(todos.getTodo(parseInt(req.params.id)));
            } else {
                todos.setDone(parseInt(req.params.id), false);
                res.send(todos.getTodo(parseInt(req.params.id)));
            }
        }
    }
})

module.exports = {router, getTodos};