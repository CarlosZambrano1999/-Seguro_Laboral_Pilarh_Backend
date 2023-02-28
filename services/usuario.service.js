var { poolPromise } = require('../modules/sqldb');
var sql = require('mssql');
const bcrypt = require('bcrypt');
const { tokenSign } = require('../helpers/generateToken');
const emailSender = require('../modules/emailer');

// Funcion para registrarse
async function crearPassword(sesion) {
    try {
        const salt = bcrypt.genSaltSync(Math.random() * (10 - 1));
        const hash = bcrypt.hashSync(sesion.password, salt);
        const pool = await poolPromise;
        let usuario = await pool.request().input('correo', sql.VarChar, sesion.correo).
            input('salt', sql.NVarChar, salt).
            input('hash', sql.NVarChar, hash).
            execute(`SP_CREAR_PASSWORD`);
        if(usuario){
            user = usuario.recordsets[0];
            us = user[0];
            if(user[0].error){
                result = {error: 'ERROR', mensaje:user[0].mensaje};
            }else{
                const tokenSession = await tokenSign(user[0]); //si es exitoso retorna todos los datos necesarios del usuario
                result = {usuario: usuario.recordsets[0], token:tokenSession};
            }
        } 
        return result;
    } catch (error) {
        console.log(error);
    }
}

// Funcion para cambiar password 
async function cambiarPassword(id_usuario,sesion) {
    try {
        const salt = bcrypt.genSaltSync(Math.random() * (10 - 1));
        const hash = bcrypt.hashSync(sesion.password, salt);
        const pool = await poolPromise;
        const passwordAnt = await pool.request().input('id_usuario', sql.Int, id_usuario).
                            query(`SELECT hashed_password FROM sesion where fk_id_usuario=@id_usuario`);
        const hashed = passwordAnt.recordsets[0]; 
        let compared = await bcrypt.compare(sesion.password_anterior, hashed[0].hashed_password);
        if(!compared){
            result = 'datos erroneos';
        }
        if(compared){
            let cambiarPassword = await pool.request().input('id_usuario', sql.Int, id_usuario).
            input('salt', sql.NVarChar, salt).
            input('hash', sql.NVarChar, hash).
            execute(`SP_CAMBIAR_PASSWORD`);
            result = cambiarPassword.recordsets[0];
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}

//login
async function login(us){
    try {
        const pool = await poolPromise;
        let usuario = await pool.request().input('correo', sql.VarChar, us.correo)
            .execute(`SP_VER_CREDENCIALES`);
        if(usuario){
            if(usuario.recordsets[0].length>0){
                let datos = usuario.recordsets[0];// Acceder al hashed_password con los datos de usuario
                let compared = await bcrypt.compare(us.password, datos[0].hashed_password); //comparar la contrasenia ingresada con la encryptada en la base
                user = usuario.recordsets[0];
                const tokenSession = await tokenSign(user[0]);
                if (compared) {
                    result = {usuario: usuario.recordsets[0], token:tokenSession};//si es exitoso retorna todos los datos necesarios del usuario
                } else {
                    result = {error: 'error', message:'datos erroneos, por favor verifique su correo y contraseña'};
                }
            }else{
                result={error: 'error', message:'El correo de usuario no esta registrado o ha sido dado de baja, por favor registrese'};
            }
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}

// Funcion para inhabilitar Usuario 
async function inhabilitarUsuario(id,usuario) {
    try {
        const pool = await poolPromise;
        let delUsuario = await pool.request().input('id_usuario', sql.Int, usuario.id_usuario).
            input('id_admin_del', sql.Int, id).
            execute(`SP_INHABILITAR_USUARIO`);
        return delUsuario.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Funcion para habilitar Usuario 
async function habilitarUsuario(id,usuario) {
    try {
        const pool = await poolPromise;
        let habUsuario = await pool.request().input('id_usuario', sql.Int, usuario.id_usuario).
            input('id_admin_hab', sql.Int, id).
            execute(`SP_HABILITAR_USUARIO`);
        return habUsuario.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Obtener usuario por id 
async function obtenerUsuario(id) {
    try {
        const pool = await poolPromise;
        let usuario = await pool.request().input('id_usuario', sql.Int, id).
            execute(`SP_OBTENER_USUARIO`);
        return usuario.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para consultar reclamos
async function consultar(correo){
    try {
        const pool = await poolPromise;
        let usuario = await pool.request().input('correo', sql.VarChar, correo)
            .query(`SELECT id_usuario, nombre, correo FROM usuario WHERE correo=@correo AND deleted_at is null`);
        if(usuario){
            if(usuario.recordsets[0].length>0){
                user = usuario.recordsets[0];
                us = user[0];
                emailSender.mailConsultar(us);
                result = usuario.recordsets[0];
            }else{
                result={error: 'error', message:'El correo de usuario es erroneo o ha sido dado de baja'};
            }
        }else{
            result={error: 'error', message:'El correo de usuario es erroneo o ha sido dado de baja'};
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}

//Funcion para solicitar reset de contraseña
async function resetPassword(sesion) {
    try {
        const salt = bcrypt.genSaltSync(Math.random() * (10 - 1));
        const hash = bcrypt.hashSync(sesion.password, salt);
        const pool = await poolPromise;
        let usuario = await pool.request().input('correo', sql.VarChar, sesion.correo)
            .query(`SELECT id_usuario, nombre, correo, fk_id_rol as id_rol FROM usuario WHERE correo=@correo AND deleted_at is null`);
        if(usuario){
            if(usuario.recordsets[0].length>0){
                user = usuario.recordsets[0];
                us = user[0];
                let cambiarPassword = await pool.request().input('correo', sql.VarChar, us.correo).
                input('salt', sql.NVarChar, salt).
                input('hash', sql.NVarChar, hash).
                execute(`SP_CAMBIAR_PASSWORD`);
                const tokenSession = await tokenSign(user[0]); //si es exitoso retorna todos los datos necesarios del usuario
                result = {usuario: usuario.recordsets[0], token:tokenSession};
            }else{
                result={error: 'error', message:'El correo de usuario es erroneo o ha sido dado de baja'};
            }
        }else{
            result={error: 'error', message:'El correo de usuario es erroneo o ha sido dado de baja'};
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login,
    crearPassword,
    cambiarPassword,
    inhabilitarUsuario,
    habilitarUsuario,
    obtenerUsuario,
    consultar,
    resetPassword
};