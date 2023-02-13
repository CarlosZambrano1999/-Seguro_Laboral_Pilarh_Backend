var { poolPromise } = require('../modules/sqldb');
var sql = require('mssql');


//Funcion para obtener datos de Agencias
async function obtenerAgencias() {
    try {
        const pool = await poolPromise;
        let agencia = await pool.request().query(`SELECT id_agencia, nombre, telefono, deleted_at AS inactivo FROM agencia order by nombre`);
        return agencia.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener Agencia por id
async function obtenerAgencia(id) {
    try {
        const pool = await poolPromise;
        let agencia = await pool.request().input('input_parameter', sql.Int, id)
            .query(`SELECT * FROM agencia where id_agencia = @input_parameter`);
        return agencia.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para crear Agencia
async function crearAgencia(id, agencia){
    try {
        const pool = await poolPromise;
        let insertarAgencia = await pool.request().input('nombre', sql.VarChar, agencia.nombre).
            input('telefono', sql.VarChar, agencia.telefono).
            input('usuario_creador', sql.Int, id).
            execute(`SP_CREAR_AGENCIA`);
        return insertarAgencia.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Funcion para Editar Agencia 
async function editarAgencia(id,agencia) {
    try {
        const pool = await poolPromise;
        let editAgencia = await pool.request().input('id_agencia', sql.Int, agencia.id_agencia).
            input('nombre', sql.VarChar, agencia.nombre).
            input('telefono', sql.VarChar, agencia.telefono).
            input('id_admin_upd', sql.Int, id).
            execute(`SP_EDITAR_AGENCIA`);
        return editAgencia.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Funcion para inhabilitar Agencia 
async function inhabilitarAgencia(id, agencia) {
    try {
        const pool = await poolPromise;
        let delAgencia = await pool.request().input('id_agencia', sql.Int, agencia.id_agencia).
            input('id_admin_del', sql.Int, id).
            execute(`SP_INHABILITAR_AGENCIA`);
        return delAgencia.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Funcion para habilitar Agencia 
async function habilitarAgencia(id,agencia) {
    try {
        const pool = await poolPromise;
        let habAgencia = await pool.request().input('id_agencia', sql.Int, agencia.id_agencia).
            input('id_admin_hab', sql.Int, id).
            execute(`SP_HABILITAR_AGENCIA`);
        return habAgencia.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para listar agencias inhabilitadas
async function agenciasInhabilitadas() {
    try {
        const pool = await poolPromise;
        let agencia = await pool.request().query(`SELECT id_agencia, nombre, siglas, telefono, direccion FROM agencia WHERE deleted_at is not null`);
        return agencia.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener Agencias exceptuando la agencia del empleado
async function obtenerDemasAgencias(id) {
    try {
        const pool = await poolPromise;
        let agencias = await pool.request().input('usuario', sql.Int, id)
        .query(`SELECT id_agencia, nombre FROM agencia WHERE deleted_at is null AND id_agencia!=(SELECT fk_id_agencia FROM empleado WHERE fk_id_usuario=@usuario)`);
        return agencias.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    obtenerAgencias,
    obtenerAgencia,
    crearAgencia,
    editarAgencia,
    inhabilitarAgencia,
    habilitarAgencia,
    agenciasInhabilitadas,
    obtenerDemasAgencias
};