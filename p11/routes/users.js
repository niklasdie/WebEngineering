const express = require('express')
let path = require('path')
const users = express.Router()

const {Sequelize, QueryTypes} = require('sequelize');
const {query} = require("express");

users.use(express.json());
users.use(express.text());

users.use(express.urlencoded({extended: true}))

async function connectToDatabase() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', 'db', 'webengDB.db')
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return sequelize;
}

users.post("/check_login", async function (req, res) {
    let sequelize = await connectToDatabase()
    let userinfos = await sequelize.query(
        'SELECT password FROM users WHERE username = ?',
        {
            replacements: [req.body.username],
            type: QueryTypes.SELECT
        }
    )
    console.log("QUERY")
    console.log(userinfos)
    if (userinfos[0]) {
        res.status(403)
    }
    if (userinfos["0"].username !== req.body.username || userinfos["0"].password !== req.body.password) {
        res.status(403)
    }
    res.send("Login erfolgreich!")
})

module.exports = users