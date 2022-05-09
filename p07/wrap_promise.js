function getFalafel() {
    const falafel = "Falafel"
    console.log(falafel + " aus dem Kühlschrank geholt")
    return falafel
}

function fryFalafel(falafel) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            const friedFalafel = "Frittierte " + falafel
            console.log(falafel + " frittiert")
            resolve(friedFalafel)
        }, 300)
    })
}

function getWrap() {
    const wrap = "Wrap"
    console.log(wrap + " aus dem Schrank geholt")
    return wrap
}

function assembleFalafelWrap(wrap, friedFalafel) {
    const falafelwrap = "Falafel-Wrap"
    console.log(friedFalafel + " in " + wrap + " gewickelt")
    return Promise.resolve(falafelwrap)
}

function prepareFalafelWrap() {
    const prom = Promise.all([fryFalafel(getFalafel()), getWrap()])

    return Promise.resolve(prom.then(ret => {
        return assembleFalafelWrap(ret[1], ret[0])
    }))
}

function serve(meal) {
    console.log(meal + " serviert")
}

prepareFalafelWrap().then(result => {
    serve(result)
})
