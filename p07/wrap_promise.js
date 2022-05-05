function getFalafel() {
    const falafel = "Falafel"
    console.log(falafel + " aus dem Kühlschrank geholt")
    // TODO: ...
}

function fryFalafel(falafel) {
	// TODO: return new Promise(...)
	setTimeout(function() {
		const friedFalafel = "Frittierte " + falafel
		console.log(falafel + " frittiert")
		// TODO: ...
    }, 300);
}

function getWrap(/* (nicht cuncurrent) TODO: Weiterleitung */) {
    const wrap = "Wrap"
    console.log(wrap + " aus dem Schrank geholt")
    // TODO: ...
}

function assembleFalafelWrap(wrap, friedFalafel) {
    const falafelwrap = "Falafel-Wrap"
    console.log(friedFalafel + " in " + wrap + " gewickelt")
    // TODO: ...
}

function prepareFalafelWrap() {
    // TODO: Aufrufen der Zubereitungsschritte
}

function serve(meal) {
    console.log(meal + " serviert")
}

// TODO: Zubereiten und Servieren
