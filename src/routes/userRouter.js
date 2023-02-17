const express = require('express')
const UserController = require('../controllers/UserController')
const validacoes = require('../middleware/expressValidator')
const isLogged = require('../middleware/isLogged')
const notLogged = require('../middleware/notLogged')

const router = express.Router();

router.get('/admin/userCadastro', isLogged, UserController.showUserCadastro)
router.post('/admin/userCadastro', validacoes, UserController.create)
router.get('/admin/servicos/profile', notLogged, UserController.showProfile)
router.post('/admin/login', UserController.login)
router.get('/logout', UserController.logout)

module.exports = router