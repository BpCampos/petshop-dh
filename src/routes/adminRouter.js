const express = require('express');
const AdminController = require('../controllers/AdminController');

//midlewares
const upload = require('../middleware/upload')

const router = express.Router();

router.get('/admin/servicos', AdminController.showServico);
router.get('/admin/servicos/create', AdminController.showCadastro)
router.post('/admin/servicos/create', upload.single('image'), AdminController.storeServico)
router.get('/admin/servicos/:id/edit', AdminController.showEditService)
router.put('/admin/servicos/:id/edit', AdminController.updateService)
router.delete('/admin/servicos/:id/delete', AdminController.deleteService)
router.get('/admin/servicos/:id',)

module.exports = router; 