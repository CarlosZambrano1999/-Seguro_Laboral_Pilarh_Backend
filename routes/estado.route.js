const express = require('express');
const router = express.Router();

const estadoController = require('../controllers/estado.controller');

router.route('/').get(estadoController.obtenerEstados);//http://localhost:8080/estado/
router.route('/tipo').get(estadoController.obtenerTipos);//http://localhost:8080/estado/tipo
router.route('/moneda').get(estadoController.obtenerMonedas);//http://localhost:8080/estado/moneda

module.exports=router;