const { body } = require('express-validator')

const validacoes = [
    body('name').notEmpty().withMessage("Você deve preencher o nome"),
    body('email').notEmpty().withMessage('Você deve preencher o email').isEmail(),
    body('password').notEmpty().withMessage('Você deve preencher a senha')

]

module.exports = validacoes