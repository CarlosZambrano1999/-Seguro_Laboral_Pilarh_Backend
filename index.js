var express = require('express');
var cors = require('cors'); //Para gestionar politicas de dominios cruzados
var bodyParser = require('body-parser');
const bd = require('./modules/sqldb');
var app = express();
require('dotenv').config({path:'./.env'});

//Iniciar rutas
const super_administradorRoute = require('./routes/super_administrador.route');
const administradorRoute = require('./routes/administrador.route');
const agenciaRoute = require('./routes/agencia.route');
const empleadoRoute = require('./routes/empleado.route');
const estadoRoute = require('./routes/estado.route');
const usuarioRoute = require('./routes/usuario.route');
const datosRoute = require('./routes/datos.route');
const reclamoRoute = require('./routes/reclamo.route');

// Configuraciones
app.set('port', process.env.PORT || 6000);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//rutas
app.use('/superAdministrador', super_administradorRoute);
app.use('/administrador', administradorRoute);
app.use('/agencia', agenciaRoute);
app.use('/empleado', empleadoRoute);
app.use('/estado', estadoRoute);
app.use('/usuario', usuarioRoute);
app.use('/datos', datosRoute);
app.use('/reclamo', reclamoRoute);

//Levantando servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
  });