class student {
    _name = "Name"
    _note = 1

    constructor(name) {
        this._name = name
    }

    get name() {
        return this._name
    }


    set name(name) {
        this._name = name;
    }

    get note() {
        return this._note
    }

    set note(note) {
        this._note = note;
    }

    static getNotenBewertung(n) {
        switch (n) {
            case 1:
                return "sehr gut"
            case 2:
                return "gut"
            case 3:
                return "befriedigend"
            case 4:
                return "ausreichend"
            case 5:
                return "mangelhaft"
            case 6:
                return "ungenügend"
            default:
                return "Keine Note von 1 bis 6"
        }
    }

    toString() {
        return this.name + " hat die Note " + student.getNotenBewertung(this.note)
    }
}

module.exports = student