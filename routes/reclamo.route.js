const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../middlewares/roleAuth');
const reclamoController = require('../controllers/reclamo.controller');

router.route('/').get(reclamoController.obtenerReclamos);//http://localhost:8080/reclamo
router.route('/crearReclamo/:id_paciente/:tipo').all(checkAuth).all(checkRoleAuth([1])).post(reclamoController.crearReclamo); //http://localhost:8080/reclamo/crearReclamo/:id_paciente
router.route('/monetarios/:id_reclamo').all(checkAuth).all(checkRoleAuth([1])).post(reclamoController.monetarios); //http://localhost:8080/reclamo/monetarios/:id_reclamo
router.route('/referenciales/:id_reclamo').all(checkAuth).all(checkRoleAuth([1])).post(reclamoController.referenciales); //http://localhost:8080/reclamo/referenciales/:id_reclamo
router.route('/filtrar').post(reclamoController.filtrarReclamos); //http://localhost:8080/reclamo/inhabilitados
router.route('/obtener/:id_reclamo').get(reclamoController.obtenerReclamosXId);//http://localhost:8080/reclamo/obtener
router.route('/obtener/monetarios/:id_reclamo').get(reclamoController.obtenerMonetarios);//http://localhost:8080/reclamo/monetarios
router.route('/obtener/referenciales/:id_reclamo').get(reclamoController.obtenerReferenciales);//http://localhost:8080/reclamo/referenciales
router.route('/inhabilitar/:id_reclamo').all(checkAuth).all(checkRoleAuth([1])).post(reclamoController.inhabilitarReclamo); //http://localhost:8080/reclamo/inhabilitar
router.route('/enviar/:id_reclamo').all(checkAuth).all(checkRoleAuth([1])).post(reclamoController.enviarReclamo); //http://localhost:8080/encomienda/validar/:id_encomienda
router.route('/reembolsar/:id_reclamo').all(checkAuth).all(checkRoleAuth([1])).post(reclamoController.reembolsar); //http://localhost:8080/reclamo/referenciales/:id_reclamo
router.route('/obtener/reembolso/:id_reclamo').get(reclamoController.obtenerReembolso);//http://localhost:8080/reclamo/reembolso
router.route('/obtenerUsuario/:id_empleado').get(reclamoController.obtenerReclamosXUsuario);//http://localhost:8080/reclamo/obtener
module.exports=router;