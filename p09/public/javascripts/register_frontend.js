// document.addEventListener("DOMContentLoaded", function(event) {
//     alert(document.getElementById("submit").textContent)
// })

let getColorCode = function (c) {
    switch (c) {
        case 1:
        case 2:
            return "#5cb85c"
        case 3:
        case 4:
            return "#f0ad4e"
        case 5:
        case 6:
            return "#d9534f"
    }
    return "#ffffff"
}

console.log(getColorCode(1))
console.log(getColorCode(2))
console.log(getColorCode(3))
console.log(getColorCode(6))

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("inputNote").addEventListener("change", function () {
        document.getElementById("submit").style.backgroundColor = getColorCode(
            parseInt(document.getElementById("inputNote").value)
        )
    })

    document.querySelector("form").addEventListener("submit", function (evt) {
        if (document.getElementById("inputName").value.length === 0 ||
            document.getElementById("inputPasswort").value.length === 0) {
            document.getElementById("output").innerText = "Name und Text müssen ausgefüllt sein!"
            evt.preventDefault();
        }
    })

    document.getElementById("button").addEventListener("click", function () {
        const tbody = document.createElement('tbody')

        const tr1 = document.createElement('tr')
        let td11 = document.createElement('td')
        td11.append(document.createTextNode(document.getElementById("inputName").placeholder))
        let td12 = document.createElement('td')
        td12.append(document.createTextNode(document.getElementById("inputName").value))
        tr1.append(td11)
        tr1.append(td12)
        tbody.append(tr1)

        const tr2 = document.createElement('tr')
        let td21 = document.createElement('td')
        td21.append(document.createTextNode(document.getElementById("inputPasswort").placeholder))
        let td22 = document.createElement('td')
        td22.append(document.createTextNode(document.getElementById("inputPasswort").value))
        tr2.append(td21)
        tr2.append(td22)
        tbody.append(tr2)

        const tr3 = document.createElement('tr')
        let td31 = document.createElement('td')
        td31.append(document.createTextNode(document.getElementById("inputNote").placeholder))
        let td32 = document.createElement('td')
        td32.append(document.createTextNode(document.getElementById("inputNote").value))
        tr3.append(td31)
        tr3.append(td32)
        tbody.append(tr3)

        const table = document.createElement('table')
        table.append(tbody)
        table.setAttribute("border", "2")

        document.getElementById("output").append(table)
    })
})

