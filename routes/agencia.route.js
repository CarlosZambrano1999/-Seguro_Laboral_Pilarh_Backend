const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../middlewares/roleAuth');
const agenciaController = require('../controllers/agencia.controller');

router.route('/').get(agenciaController.obtenerAgencias);//http://localhost:8080/Agencia/
router.route('/obtener/:id_agencia').get(agenciaController.obtenerAgencia);//http://localhost:8080/Agencia/obtener
router.route('/crearAgencia').all(checkAuth).all(checkRoleAuth([1])).post(agenciaController.crearAgencia); //http://localhost:8080/Agencia/crearAgencia
router.route('/editarAgencia').all(checkAuth).all(checkRoleAuth([1])).post(agenciaController.editarAgencia); //http://localhost:8080/Agencia/editarAgencia
router.route('/inhabilitarAgencia').all(checkAuth).all(checkRoleAuth([1])).post(agenciaController.inhabilitarAgencia); //http://localhost:8080/Agencia/inhabilitarAgencia
router.route('/habilitarAgencia').all(checkAuth).all(checkRoleAuth([1])).post(agenciaController.habilitarAgencia); //http://localhost:8080/Agencia/habilitarAgencia
router.route('/inhabilitadas').get(agenciaController.agenciasInhabilitadas); //http://localhost:8080/Agencia/inhabilitadas
router.route('/resto').all(checkAuth).all(checkRoleAuth([3])).get(agenciaController.obtenerDemasAgencias); //http://localhost:8080/agencia/resto
module.exports=router;