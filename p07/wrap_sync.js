function getFalafel() {
    const falafel = "Falafel"
    console.log(falafel + " aus dem Kühlschrank geholt")
    return falafel
}

function fryFalafel(falafel) {
    const friedFalafel = "Frittierte " + falafel
    console.log(falafel + " frittiert")
    return friedFalafel
}

function getWrap() {
    const wrap = "Wrap"
    console.log(wrap + " aus dem Schrank geholt")
    return wrap
}

function assembleFalafelWrap(wrap, friedFalafel) {
    const falafelwrap = "Falafel-Wrap"
    console.log(friedFalafel + " in " + wrap + " gewickelt")
    return falafelwrap
}

function prepareFalafelWrap() {
    let falafel = getFalafel()
    falafel = fryFalafel(falafel)
    let wrap = getWrap()
    return assembleFalafelWrap(wrap, falafel)
}

function serve(meal) {
    console.log(meal + " serviert")
}

let meal = prepareFalafelWrap()
serve(meal)
