const express = require('express');
const router = express.Router();

const estadoController = require('../controllers/estado.controller');

router.route('/').get(estadoController.obtenerEstados);//http://localhost:8080/estado/

module.exports=router;