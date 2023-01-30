const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth');
const checkRoleAuth = require('../middlewares/roleAuth');
const empleadoController = require('../controllers/empleado.controller');

router.route('/').get(empleadoController.obtenerEmpleados);//http://localhost:8080/empleado/
router.route('/obtener/:cod_usuario').get(empleadoController.obtenerEmpleado);//http://localhost:8080/empleado/obtener
router.route('/agencia/:id_agencia').get(empleadoController.obtenerEmpleadosxAgencia);//http://localhost:8080/empleado/agencia/:
router.route('/logueados').get(empleadoController.obtenerEmpleadosLogueados);//http://localhost:8080/empleado/logueados
router.route('/sinLoguear').get(empleadoController.obtenerEmpleadosSinLoguear);//http://localhost:8080/empleado/
router.route('/crearEmpleado').all(checkAuth).all(checkRoleAuth([1,2])).post(empleadoController.crearEmpleado); //http://localhost:8080/empleado/crearEmpleado
router.route('/editarempleado').all(checkAuth).all(checkRoleAuth([1,2])).post(empleadoController.editarEmpleado); //http://localhost:8080/empleado/editarEmpleado
router.route('/inhabilitados').get(empleadoController.empleadosInhabilitados); //http://localhost:8080/empleado/inhabilitados
router.route('/filtrar').post(empleadoController.filtrarEmpleados); //http://localhost:8080/empleado/inhabilitados
router.route('/agregarFirma').all(checkAuth).all(checkRoleAuth([1,2])).post(empleadoController.agregarFirma);//http://localhost:8080/empleado/agregarFirma
module.exports=router;