const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../middlewares/roleAuth');
const reclamoController = require('../controllers/reclamo.controller');

router.route('/crearReclamo/:id_paciente').all(checkAuth).all(checkRoleAuth([1])).post(reclamoController.crearReclamo); //http://localhost:8080/Agencia/crearReclamo/:id_paciente
router.route('/monetarios/:id_reclamo').post(reclamoController.monetarios); //http://localhost:8080/Agencia/monetarios/:id_reclamo
router.route('/referenciales/:id_reclamo').post(reclamoController.referenciales); //http://localhost:8080/Agencia/referenciales/:id_reclamo

module.exports=router;