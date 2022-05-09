function getFalafel() {
    const falafel = "Falafel"
    console.log(falafel + " aus dem Kühlschrank geholt")
    return Promise.resolve(falafel)
}

function fryFalafel(falafel) {
	return new Promise(resolve => {
	setTimeout(function() {
		const friedFalafel = "Frittierte " + falafel
		console.log(falafel + " frittiert")
		resolve(friedFalafel)
    }, 300);
    })
}


function getWrap() {
    const wrap = "Wrap"
    console.log(wrap + " aus dem Schrank geholt")
    return Promise.resolve(wrap)
}

function assembleFalafelWrap(wrap, friedFalafel) {
    const falafelwrap = "Falafel-Wrap"
    console.log(friedFalafel + " in " + wrap + " gewickelt")
    return Promise.resolve(falafelwrap)
}

async function prepareFalafelWrap() {
    const prom = Promise.all([fryFalafel(await getFalafel()), getWrap()])

    return Promise.resolve(prom.then(ret => {
        return assembleFalafelWrap(ret[1], ret[0])
    }))
}

async function serve() {
    const meal = await prepareFalafelWrap()
    console.log(meal + " serviert")
}

serve()