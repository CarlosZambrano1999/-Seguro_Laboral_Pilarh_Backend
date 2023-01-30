const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../middlewares/roleAuth');
const administradorController = require('../controllers/administrador.controller');

//Rutas
router.route('/').get(administradorController.obtenerAdministradores);//http://localhost:8080/Administrador/
router.route('/obtener/:cod_usuario').get(administradorController.obtenerAdministrador);//http://localhost:8080/Administrador/obtener
router.route('/crearAdministrador').all(checkAuth).all(checkRoleAuth([1,2])).post(administradorController.crearAdministrador); //http://localhost:8080/Administrador/crearAdministrador
router.route('/editarAdministrador').all(checkAuth).all(checkRoleAuth([1,2])).post(administradorController.editarAdministrador); //http://localhost:8080/Administrador/editarAdministrador
router.route('/filtrar').post(administradorController.filtrarAdministradores); //http://localhost:8080/Administrador/inhabilitados

module.exports=router;