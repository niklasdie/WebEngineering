const express = require('express')
const path = require('path');
const {QueryTypes} = require('sequelize');
const {Sequelize} = require('sequelize');
const users = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const database = require('../modules/database')
const student = require('../modules/student')

users.use(express.urlencoded({extended: true}))

users.post("/check_login", async function (req, res) {
    const db = await database.getInstance()
    if (await db.validateUser(req.body.user, req.body.pw)) {
        req.session.loggedInUser = req.body.user
        res.redirect("/info")
    } else {
        res.status(403).send("Login failed!")
    }
})

users.post("/register", [
        check('note').isIn(["1", "2", "3", "4", "5", "6"]),
        check('name').escape().trim()
    ],
    async function (req, res) {
        const db = await database.getInstance()
        if(await db.registerUser(req.body.user, req.body.pw, req.body.note)) {
            res.render('register_tpl', {error_message: 'Successfully registered.'});
        } else {
            res.status(403).send("Registration failed!")
        }
    })

users.get("/login", function (req, res) {
    res.render('login_tpl')
})

users.get("/register", function (req, res) {
    res.render('register_tpl')
})

module.exports = users