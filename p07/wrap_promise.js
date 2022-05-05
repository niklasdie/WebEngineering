function getFalafel() {
    const falafel = "Falafel"
    console.log(falafel + " aus dem Kühlschrank geholt")
    return falafel
}

function fryFalafel(falafel) {
	// TODO: return new Promise(...)
	setTimeout(function() {
		const friedFalafel = "Frittierte " + falafel
		console.log(falafel + " frittiert")
		return friedFalafel
    }, 300);
}

function getWrap(friedFalafel) {
    const wrap = "Wrap"
    console.log(wrap + " aus dem Schrank geholt")
    return wrap, friedFalafel
}

function assembleFalafelWrap(wrap, friedFalafel) {
    const falafelwrap = "Falafel-Wrap"
    console.log(friedFalafel + " in " + wrap + " gewickelt")
    return falafelwrap
}

function prepareFalafelWrap() {
    return getFalafel().then(result => {
        return fryFalafel(result)
    }).then(result => {
        return getWrap(result)
    }).then(result => {
        return assembleFalafelWrap(result[0], result[1])
    })
}

function serve(meal) {
    console.log(meal + " serviert")
}

let meal = prepareFalafelWrap()
serve(meal)
