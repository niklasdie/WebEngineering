const express = require('express')
const path = require('path');
const {QueryTypes} = require('sequelize');
const {Sequelize} = require('sequelize');
const users = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

users.use(express.urlencoded({extended: true}))

async function connectToDatabase() {
    let sequelize = new Sequelize({
        host: 'localhost',
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

async function disconnectFromDatabase(sequelize) {
    try {
        await sequelize.close();
        console.log('Connection has been closed successfully.');
    } catch (error) {
        console.error('Unable to close connection to the database:', error);
    }
}

users.post("/check_login", async function (req, res) {
    let sequelize = await connectToDatabase()
    let userinfos = await sequelize.query(
        'SELECT password FROM users WHERE username = :username',
        {
            replacements: {username: req.body.user},
            type: QueryTypes.SELECT
        }
    )

    let userInfos = [];

    userinfos.forEach(user => {
        userInfos.push({name: req.body.user, password: user.password})
    });

    let userAndPwCorrect = false;

    for (let user of userInfos) {
        if (bcrypt.compareSync(req.body.pw, user.password)) {
            userAndPwCorrect = true;
            break;
        }
    }

    if (userAndPwCorrect) {
        res.send("Login erfolgreich!")
    } else {
        res.status(403).send("Login fehlgeschlagen!")
    }

    await disconnectFromDatabase(sequelize);
})

users.post("/register", [
        check('note').isIn(["1", "2", "3", "4", "5", "6"]),
        check('name').escape().trim()
    ],
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('register_tpl', {error_message: 'Keine Note zwischen 1 und 6 eingegeben'});
        } else {
            let name = req.body.user;
            let pw = req.body.pw;
            let note = req.body.note;

            if (name === null || pw === null || note === null) res.status(403).send("Empty field!");

            let sequelize = await connectToDatabase();

            let hashedPW = bcrypt.hashSync(pw, 8);

            await sequelize.query(
                'INSERT INTO users (username, password, grade) VALUES (:username, :password, :grade)',
                {
                    replacements: {username: name, password: hashedPW, grade: note},
                    type: QueryTypes.INSERT
                }
            )
            await disconnectFromDatabase(sequelize)

            res.render('register_tpl', {error_message: 'Successfully registered.'});
        }
    })

users.get("/register", function (req, res) {
    res.render('register_tpl')
})

module.exports = users