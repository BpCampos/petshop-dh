const servicoModel = require('../model/ServicoModel')
const Users = require('../model/Users')

const AdminController = {
    showServico: (req, res) => {
        const servicos = servicoModel.findAll();
        res.render('admin/servicos/index', { servicos })
    },

    showCadastro: (req, res) => {
        res.render('admin/cadastro')
    },

    storeServico: (req, res) => {
        const { name, price, active, description } = req.body

        const image = `/img/${req.file.filename}`

        const servico = { name, price, image, active, description }

        servicoModel.create(servico);

        return res.redirect('/admin/servicos')

    },

    showEditService: (req, res) => {
        const { id } = req.params;

        const servico = servicoModel.findByPk(id)

        return res.render('admin/editar', { servico })
    },

    updateService: (req, res) => {
        const { id, name, price, image, description } = req.body

        const servicoAtualizado = { id, name, price, image, description }

        console.log(servicoAtualizado)

        servicoModel.update(id, servicoAtualizado)

        return res.redirect('/admin/servicos')
    },

    deleteService: (req, res) => {
        const { id } = req.params

        servicoModel.delete(id)

        return res.redirect('/admin/servicos')
    }
}

module.exports = AdminController;