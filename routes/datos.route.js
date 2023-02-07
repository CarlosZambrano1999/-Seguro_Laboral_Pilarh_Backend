const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../middlewares/roleAuth');
const datosController = require('../controllers/datos.controller');

//Rutas
router.route('/empresa').get(datosController.obtenerEmpresa);//http://localhost:8080/Datos/empresa
router.route('/aseguradora').get(datosController.obtenerAseguradora);//http://localhost:8080/Datos/aseguradora
router.route('/editarEmpresa').all(checkAuth).all(checkRoleAuth([1])).post(datosController.editarEmpresa); //http://localhost:8080/Datos/editarEmpresa
router.route('/editarAseguradora').all(checkAuth).all(checkRoleAuth([1])).post(datosController.editarAseguradora); //http://localhost:8080/Datos/editarAseguradora


module.exports=router;