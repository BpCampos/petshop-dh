const db = require("../database/db.json")
const crypto = require('crypto');
const fs = require('fs')
const path = require('path')
const pathDB = path.resolve('src', 'database', 'db.json');

const Servico = {
    findAll: () => {
        const servicos = [];

        db.services.map(service => {
            servicos.push({
                id: service.id,
                nome: service.name,
                preco: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.price),
                descricao: service.description,
                imagem: service.image
            })
        })

        return servicos;
    },

    create(services) {

        const newService = {
            id: crypto.randomUUID(),
            name: services.name,
            price: parseInt(services.price),
            image: services.image,
            active: services.active,
            description: services.description
        }

        db.services.push(newService)

        const dbJson = JSON.stringify(db, null, 4);
        fs.writeFileSync(pathDB, dbJson, 'utf-8')

        return
    },

    findByPk: (id) => {
        const service = db.services.find(servico => servico.id === id);

        return service;
    },

    update: (id, obj) => {
        const index = db.services.findIndex(servico => servico.id === id);

        db.services[index] = obj;

        const dbJson = JSON.stringify(db, null, 4);
        fs.writeFileSync(pathDB, dbJson, 'utf-8')

        return;
    },

    delete: (id) => {
        const index = db.services.findIndex(servico => servico.id === id);
        db.services.splice(index, 1)

        const dbJson = JSON.stringify(db, null, 4);
        fs.writeFileSync(pathDB, dbJson, 'utf-8')
    },

    createUser: (user) => {

        const newUser = {
            id: crypto.randomUUID(),
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: false
        }

        db.users.push(newUser);
        const dbJson = JSON.stringify(db, null, 4);
        fs.writeFileSync(pathDB, dbJson, 'utf-8')
    }
}
module.exports = Servico;