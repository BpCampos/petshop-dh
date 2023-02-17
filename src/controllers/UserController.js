const servicoModel = require('../model/ServicoModel')
const Users = require('../model/Users')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')


const UserController = {

    showUserCadastro: (req, res) => {
        res.render('admin/userCadastro')
    },

    create: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.mapped())
            return res.render('admin/userCadastro', { errors: errors.mapped() })
        }

        const { name, email } = req.body

        const password = bcrypt.hashSync(req.body.password, 10)

        const user = { name, email, password }

        servicoModel.createUser(user)

        res.redirect('/login')
    },

    login: (req, res) => {

        const { email, password } = req.body

        const userFound = Users.findUser(email)

        if (!userFound) {
            return res.render('login')
        }

        const validPassword = bcrypt.compareSync(password, userFound.password)

        if (!validPassword) {
            return res.render('login')
        }

        delete userFound.password

        req.session.userLogged = userFound

        if (req.body.remember) {
            res.cookie('userEmail', req.body.email, { age: (1000 * 60) * 30 })
        }

        res.redirect('/admin/servicos/profile')

    },

    showProfile: (req, res) => {
        console.log(req.cookies.userEmail)

        return res.render('admin/servicos/profile', { userLogged: req.session.userLogged })
    },

    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy()

        return res.redirect('/')
    }
}

module.exports = UserController