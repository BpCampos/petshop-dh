const db = require('../database/db.json');
const path = require('path')
const pathDB = path.resolve('src', 'database', 'db.json');

const Users = {

    findUser: (email) => {

        const user = db.users.find(user => user.email === email)

        return user;

    }

}

module.exports = Users