var { poolPromise } = require('../modules/sqldb');
var sql = require('mssql');
const bcrypt = require('bcrypt');

//Funcion para obtener datos de superadministrador
async function obtenerSuperAdministrador() {
    try {
        const pool = await poolPromise;
        let sAdministador = await pool.request().query(`SELECT id_usuario, codigo_usuario FROM usuario WHERE fk_id_rol=1`);
        return sAdministador.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Funcion para crear password a super Administrador
async function crearPassword(sesion) {
    try {
        const salt = bcrypt.genSaltSync(Math.random() * (10 - 1));
        const hash = bcrypt.hashSync(sesion.hashed_password, salt);
        const pool = await poolPromise;
        let insertarPassword = await pool.request().input('id', sql.Int, sesion.fk_id_usuario).
            input('salt', sql.NVarChar, salt).
            input('hash', sql.NVarChar, hash).
            execute(`SP_CREAR_SUPER_PASSWORD`);
        return insertarPassword.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Funcion para cambiar password a super Administrador
async function cambiarPassword(sesion) {
    try {
        const salt = bcrypt.genSaltSync(Math.random() * (10 - 1));
        const hash = bcrypt.hashSync(sesion.hashed_password, salt);
        const pool = await poolPromise;
        let cambiarPassword = await pool.request().input('id', sql.Int, sesion.fk_id_usuario).
            input('salt', sql.NVarChar, salt).
            input('hash', sql.NVarChar, hash).
            execute(`SP_CAMBIAR_SUPER_PASSWORD`);
        return cambiarPassword.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    obtenerSuperAdministrador,
    crearPassword,
    cambiarPassword
};