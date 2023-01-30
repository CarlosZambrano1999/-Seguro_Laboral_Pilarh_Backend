var { poolPromise } = require('../modules/sqldb');
var sql = require('mssql');


//Funcion para obtener datos de administradores
async function obtenerAdministradores() {
    try {
        const pool = await poolPromise;
        let administrador = await pool.request().query(`SELECT id_usuario, nombre, correo, deleted_user as inactivo FROM usuario WHERE fk_id_rol=1 AND deleted_at is null ORDER BY nombre`);
        return administrador.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener administrador por cod de usuario
async function obtenerAdministrador(cod_usuario) {
    try {
        const pool = await poolPromise;
        let administrador = await pool.request().input('input_parameter', sql.VarChar, cod_usuario)
            .query(`SELECT id_usuario, nombre, correo, deleted_user as inactivo FROM usuario WHERE codigo_usuario LIKE +'%'+@input_parameter+'%'`);
        return administrador.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para crear administrador
async function crearAdministrador(id,administrador){
    try {
        const pool = await poolPromise;
        let insertarAdmin = await pool.request().input('cod_usuario', sql.VarChar, administrador.cod_usuario).
            input('nombre', sql.VarChar, administrador.nombre).
            input('correo', sql.VarChar, administrador.correo).
            input('id_super_admin', sql.Int, id).
            execute(`SP_CREAR_ADMINISTRADOR`);
        return insertarAdmin.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Funcion para Editar Administrador 
async function editarAdministrador(id,administrador) {
    try {
        const pool = await poolPromise;
        let editAdministrador = await pool.request().input('id_usuario', sql.Int, administrador.id_usuario).
            input('nombre', sql.VarChar, administrador.nombre).
            input('correo', sql.NVarChar, administrador.correo).
            input('id_admin_upd', sql.Int, id).
            execute(`SP_EDITAR_ADMINISTRADOR`);
        return editAdministrador.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para listar administradores si es activo o inactivo
async function filtrarAdministradores(estado) {
    try {
        const pool = await poolPromise;
        let administrador = {};
        if(estado.activo==''){
            administrador = await pool.request().query(`SELECT id_usuario, codigo_usuario, nombre, correo,  deleted_user as inactivo FROM usuario WHERE fk_id_rol=2 ORDER BY nombre`);
        }else if(estado.activo==1){
            administrador = await pool.request().query(`SELECT id_usuario, codigo_usuario, nombre, correo, deleted_user as inactivo FROM usuario WHERE fk_id_rol=2 AND deleted_at is null ORDER BY nombre`);
        }else if(estado.activo==2){
            administrador = await pool.request().query(`SELECT id_usuario, codigo_usuario, nombre, correo, deleted_user as inactivo FROM usuario WHERE fk_id_rol=2 AND deleted_at is not null ORDER BY nombre`);
        }
        return administrador.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    obtenerAdministradores,
    obtenerAdministrador,
    crearAdministrador,
    editarAdministrador,
    filtrarAdministradores
};