const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../middlewares/roleAuth');
const usuarioController = require('../controllers/usuario.controller');

//rutas
router.route('/login').post(usuarioController.login);//localhost:8000/usuario/login
router.route('/crearPassword').post(usuarioController.crearPassword); //http://localhost:8080/usuario/crearPassword
router.route('/cambiarPassword').all(checkAuth).all(checkRoleAuth([1])).post(usuarioController.cambiarPassword); //http://localhost:8080/usuario/cambiarPassword
router.route('/inhabilitar').all(checkAuth).all(checkRoleAuth([1])).post(usuarioController.inhabilitarUsuario); //http://localhost:8080/usuario/inhabilitar/:id
router.route('/habilitar').all(checkAuth).all(checkRoleAuth([1])).post(usuarioController.habilitarUsuario); //http://localhost:8080/usuario/habilitar/:id
router.route('/').all(checkAuth).all(checkRoleAuth([1])).get(usuarioController.obtenerUsuario); //http://localhost:8080/usuario
router.route('/reset/:usuario').post(usuarioController.resetear);//localhost:8000/usuario/reset/:usuario
router.route('/resetPassword').post(usuarioController.resetPassword);//localhost:8000/usuario/resetPassword
module.exports=router;