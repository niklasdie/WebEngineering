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

// p05
console.log("###########    Aufgabe p05    ###########")

const express = require("express")
let app = express()
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
app.use(express.static(path.join(__dirname, 'public')));

// enable express.urlencoded
app.use(express.urlencoded({extended: true}))

// route print post
app.post("/print", function (req, res) {
    res.type("text/plain")
    res.send(req.body.user +" "+ req.body.pw + " " + req.body.note)
})

// route print get
app.get("/print", function (req, res) {
    res.type("text/plain")
    res.send(req.query.user +" "+ req.query.pw + " " + req.query.note)
})


