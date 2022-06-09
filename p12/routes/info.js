const express = require('express')
const student = require("../modules/student");
const info = express.Router();

const database = require('../modules/database')

info.get("/", async function (req, res) {
    const db = await database.getInstance()
    const st = db.getStudent(req.session.loggedInUser)
    res.render('info_tpl', {user: req.session.loggedInUser, note: student.getNotenBewertung((await st).note)})
})

module.exports = info