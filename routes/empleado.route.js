const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../middlewares/roleAuth');
const empleadoController = require('../controllers/empleado.controller');

router.route('/').get(empleadoController.obtenerEmpleados);//http://localhost:8080/empleado/
router.route('/crearEmpleado').all(checkAuth).all(checkRoleAuth([1])).post(empleadoController.crearEmpleado); //http://localhost:8080/empleado/crearEmpleado
router.route('/editarempleado').all(checkAuth).all(checkRoleAuth([1])).post(empleadoController.editarEmpleado); //http://localhost:8080/empleado/editarEmpleado
router.route('/filtrar').post(empleadoController.filtrarEmpleados); //http://localhost:8080/empleado/inhabilitados
router.route('/crearPaciente/:id_empleado').all(checkAuth).all(checkRoleAuth([1])).post(empleadoController.crearPaciente); //http://localhost:8080/empleado/crearPaciente/:id_empleado
router.route('/pacientes/:id_empleado').get(empleadoController.obtenerPacientes);//http://localhost:8080/empleado/pacientes/:id_empleado
module.exports=router;