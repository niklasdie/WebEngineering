document.addEventListener('DOMContentLoaded', async function () {

    const listNode = document.getElementById('list') // id der unordered list im HTML

    // Einfügen eines neuen Todos (POST /todos) &
    // Hinzufügen des Todos auf der Website (Aufruf Funktion: addTodo)
    document.getElementById('newTodo').addEventListener('click', async function (event) {
        let response = await fetch("/todos",
            {
                method: "POST",
                headers: {'Content-Type': 'text/plain'},
                body: document.getElementById('todo').value
            })
        await addTodo(await response.json())
    })

    function getTODOListIndexByID(id) {
        for (let i = 0; i < document.getElementById("list").childNodes.length; i++) {
            if (parseInt(document.getElementById("list").children[i].id)
                === parseInt(id)) {
                return i;
            }
        }
    }

    function getDeleteClickHandler(itemNode) {
        return async function () {
            // Löschen eines ToDos im Backend und auf der Website
            let response = await fetch("/todos/" + itemNode.id,
                {
                    method: "DELETE",
                    headers: {'Content-Type': 'text/plain'}
                })
            let index = getTODOListIndexByID(itemNode.id);
            if (index != null) {
                listNode.children[index].remove();
            }
        }
    }

    function getDoneClickHandler(itemNode) {
        return async function () {
            fetch('/todos/' + itemNode.id, {
                method: "GET",
                headers: {'Content-Type': 'text/plain'}
            }).then(response => {
                return response.json();
            }).then(async todo => {
                let index = getTODOListIndexByID(itemNode.id);
                if (index != null) {
                    let value;
                    let title = itemNode.title
                    if (todo.done === true) {
                        value = "false";
                        listNode.children[index]
                            .children[0].innerHTML = todo.title;
                    } else {
                        value = "true";
                        listNode.children[index]
                            .children[0].innerHTML = "<del>" + title + "</del>";
                    }
                    let fetchBody = {
                        op: "replace",
                        path: "/done",
                        value: value
                    };
                    await fetch('/todos/' + itemNode.id, {
                        method: "PATCH",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(fetchBody)
                    }).then(result => {
                        result.json();
                    })
                }
            });
        }
    }

    // Fügt ein ToDo dem DOM hinzu
    // Erwartet ein Objekt, wie z.B.:
    // { title : "Einkaufen gehen", done : false, id : 10 }
    // hier muss die Template-Engine genutzt werden
    // und die Click-Handler an die Klassen aus dem Template gebunden werden
    async function addTodo(item) {
        let response = await fetch("/templates/todos_tpl.html")
        let template = await response.text();
        let rendered = Mustache.render(template, item);
        listNode.insertAdjacentHTML('beforeend', rendered);
        const listItem = document.getElementById(item.id)
        listItem.querySelector('.todo_item').addEventListener('click', getDoneClickHandler(listItem))
        listItem.querySelector('.delete_links').addEventListener('click', getDeleteClickHandler(listItem))
    }

    // Alle ToDos laden (Route /todos sollte ein Array mit JSON-Objekten zurückgeben) &
    // auf der Website anzeigen (Iteriere über alle JSON-Objekte und rufe addTodo auf)
    async function loadAll() {
        let response = await fetch('/todos',
            {
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            }
        )
        listNode.innerHTML = '';
        let todos = await response.json();
        for (let todo of todos) {
            await addTodo(todo);
        }
    }


    // Alle erledigten ToDos löschen &
    // auf der Website entfernen
    document.getElementById('deleteChecked')
        .addEventListener('click', async () => {
            let response = await fetch('/todos?done=true',
                {
                    method: "DELETE",
                    headers: {'Content-Type': 'application/json'}
                }
            )
            listNode.innerHTML = '';
            let todos = await response.json();
            for (let todo of todos) {
                await addTodo(todo);
            }
        })

    // Bei Beginn alle Einträge laden
    await loadAll();
})