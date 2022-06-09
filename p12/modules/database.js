// USED IN PART 2
const {Sequelize} = require('sequelize');
const {QueryTypes} = require('sequelize');
const path = require('path');
const bcrypt = require('bcryptjs');

const student = require('../modules/student')

class Database {

    constructor(database) {
        if (typeof database === 'undefined') {
            throw new Error('Cannot be called directly');
        }
        this._database = database;
    }

    static async _init() {
        const database = new Sequelize({
            host: 'localhost',
            dialect: 'sqlite',
            storage: path.join(__dirname, '..', 'db', 'webengDB.db')
        });

        try {
            await database.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        return new Database(database)
    }

    static async getInstance() {
        // check if Database instance already exists
        if (!Database.instance) {
            Database.instance = await Database._init()
        }
        return Database.instance
    }

    async validateUser(user, passwd) {
        let userinfos = await this._database.query(
            'SELECT password FROM users WHERE username = :username',
            {
                replacements: {username: user},
                type: QueryTypes.SELECT
            }
        )

        let userInfos = [];

        userinfos.forEach(user => {
            userInfos.push({name: user, password: user.password})
        });

        let userAndPwCorrect = false;

        for (let user of userInfos) {
            if (bcrypt.compareSync(passwd, user.password)) {
                userAndPwCorrect = true;
                break;
            }
        }

        return userAndPwCorrect
    }

    async userExists(user) {
        let userinfos = await this._database.query(
            'SELECT username FROM users WHERE username = :username',
            {
                replacements: {username: user},
                type: QueryTypes.SELECT
            }
        )
        return !!userinfos;
    }

    async registerUser(user, passwd, note) {
        if (user !== null || passwd !== null || note !== null) {

            let hashedPW = bcrypt.hashSync(passwd, 8);

            await this._database.query(
                'INSERT INTO users (username, password, grade) VALUES (:username, :password, :grade)',
                {
                    replacements: {username: user, password: hashedPW, grade: note},
                    type: QueryTypes.INSERT
                }
            )
            return true
        }
        return false
    }

    async getStudent(user) {
        let userinfos = await this._database.query(
            'SELECT grade FROM users WHERE username = :username',
            {
                replacements: {username: user},
                type: QueryTypes.SELECT
            }
        )
        let st = new student(user)
        userinfos.forEach(user => {
            st.note = user.grade
        })
        return st
    }
}

module.exports = Database
