document.getElementById("submit").onclick = function (event) {
    let newTodo = document.getElementById("todo").innerText

    let todos = localStorage.getItem("todos");
    let obj = JSON.parse(todos);

    obj["todos"].push({ "todo" : newTodo})

    const myJSON = JSON.stringify(obj);
    localStorage.setItem("todos", myJSON);

}
