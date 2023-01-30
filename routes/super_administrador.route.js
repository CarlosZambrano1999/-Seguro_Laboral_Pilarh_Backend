const express = require('express');
const router = express.Router();
const superController = require('../controllers/super_administrador.controller');

//Rutas 
router.route('/').get(superController.obtenerSuperAdministrador);//localhost:8000/superAdministrador/
router.route('/crearPassword').post(superController.crearPassword); //localhost:8000/superAdministrador/crearPassword
router.route('/cambiarPassword').post(superController.cambiarPassword); //localhost:8000/superAdministrador/cambiarPassword
module.exports=router;