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