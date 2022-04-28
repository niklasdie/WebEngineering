// p04
console.log("###########    Aufgabe p04    ###########")

const student = require("./modules/student");

let sortStudents = function (arr) {
    arr.sort(function compareFn(a, b) {
        return a.note - b.note
    })
}

let createStudentFactory = function (note) {
    return function (name) {
        let s = new student(name)
        s.note = note
        return s
    }
}

var arr = [
    new student("Frank"),
    new student("Hans"),
    new student("Hanna"),
    new student("Dennis"),
    new student("Lisa")
]

let i = 5;
for (let s in arr) {
    arr[s].note = i
    i--
}
arr[0].note = 1

console.log("---------unsorted---------")

for (let s in arr) {
    console.log(arr[s].toString()) // zum Ausgeben in der Console und nicht auf der Webseite
}

console.log("---------sorted---------")

sortStudents(arr)

for (let s in arr) {
    console.log(arr[s].toString()) // zum Ausgeben in der Console und nicht auf der Webseite
}

console.log("---------factory---------")

var arr2 = []
for (let i = 6; i > 0; i--) {
    var studentFactory = createStudentFactory(i)
    arr2.push(studentFactory("Max(" + i + ")"))
    arr2.push(studentFactory("Anna(" + i + ")"))
    arr2.push(studentFactory("Phillip(" + i + ")"))
}

for (let s in arr2) {
    console.log(arr2[s].toString()) // zum Ausgeben in der Console und nicht auf der Webseite
}

console.log("---------factory sorted---------")

sortStudents(arr2)

for (let s in arr2) {
    console.log(arr2[s].toString()) // zum Ausgeben in der Console und nicht auf der Webseite
}

// p06
console.log("###########    Aufgabe p06    ###########")

const express = require("express")
const cookieParser = require('cookie-parser')
const {check} = require('express-validator')
const Mustache = require('mustache');
let app = express()
app.use(cookieParser())
const port = 3000

// configuring port
app.listen(port, function () {
    console.log("Server listening on: http://localhost:" + port)
})

// route student
app.get("/student", function (req, res) {
    res.type("text/plain")
    let str = ""
    for (let s in arr) {
        str += arr[s].toString() + "\n"
    }
    res.send(str)
})

// route studentFactory
app.get("/studentFactory", function (req, res) {
    res.type("text/plain")
    var studentFactory = createStudentFactory(5)
    let max = studentFactory("Max")
    res.send(max.toString())
})

// enabling public folder in root url
let path = require('path')
app.use(express.static(path.join(__dirname, 'views')));

// enable express.urlencoded
app.use(express.urlencoded({extended: true}))

// route print post
app.post("/print", [
    check('name').escape().trim().isString().isLength({min: 3}),
    check('note').isInt()
], (req, res) => {
    let date = new Date(Date.now())
    let newCookie = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    res.cookie('lastVisited', newCookie)
    let oldCookie = req.cookies.lastVisited
    if (oldCookie) {
        res.send(req.body.user + " " + req.body.pw + " " + req.body.note +
            "\nLast visited: " + oldCookie)
    } else {
        res.send(req.body.user + " " + req.body.pw + " " + req.body.note)
    }
})

// route print get
app.get("/print", [
    check('name').escape().trim().isString().isLength({min: 3}),
    check('note').isInt()
], (req, res) => {
    let date = new Date(Date.now())
    let newCookie = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    res.cookie('lastVisited', newCookie)
    let oldCookie = req.cookies.lastVisited
    if (oldCookie) {
        res.send(req.query.user + " " + req.query.pw + " " + req.query.note +
            "\nLast visited: " + oldCookie)
    } else {
        res.send(req.query.user + " " + req.query.pw + " " + req.query.note)
    }
})

app.get("/", function (req, res) {
    let template = document.getElementById('cookie_data').innerHTML
    let oldCookie = req.cookies.lastVisited
    let output = Mustache.render(template, {cookie_data: oldCookie});
})


