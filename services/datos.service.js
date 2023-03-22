var { poolPromise } = require('../modules/sqldb');
var sql = require('mssql');


//Funcion para obtener datos de la Aseguradora
async function obtenerAseguradora() {
    try {
        const pool = await poolPromise;
        let aseguradora = await pool.request().query(`SELECT * FROM aseguradora`);
        return aseguradora.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//funcion para editar Aseguradora
async function editarAseguradora(id,aseguradora) {
    try {
        const pool = await poolPromise;
        let editAseguradora = await pool.request().input('id_aseguradora', sql.Int, aseguradora.id_aseguradora).
            input('aseguradora', sql.VarChar, aseguradora.aseguradora).
            input('lugar', sql.NVarChar, aseguradora.lugar).
            input('empleado', sql.NVarChar, aseguradora.empleado).
            input('titulo', sql.NVarChar, aseguradora.titulo).
            input('cargo', sql.NVarChar, aseguradora.cargo).
            input('id_admin_upd', sql.Int, id).
            execute(`SP_EDITAR_ASEGURADORA`);
        return editAseguradora.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener datos de la Empresa
async function obtenerEmpresa() {
    try {
        const pool = await poolPromise;
        let empresa = await pool.request().query(`SELECT * FROM empresa`);
        return empresa.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//funcion para editar empresa
async function editarEmpresa(id,empresa) {
    try {
        const pool = await poolPromise;
        let editEmpresa = await pool.request().input('id_empresa', sql.Int, empresa.id_empresa).
            input('empresa', sql.VarChar, empresa.empresa).
            input('lugar', sql.NVarChar, empresa.lugar).
            input('empleado', sql.NVarChar, empresa.empleado).
            input('titulo', sql.NVarChar, empresa.titulo).
            input('cargo', sql.NVarChar, empresa.cargo).
            input('poliza', sql.Int, empresa.poliza).
            input('id_admin_upd', sql.Int, id).
            execute(`SP_EDITAR_EMPRESA`);
        return editEmpresa.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener tipos de reclamo
async function obtenerTiposReclamos() {
    try {
        const pool = await poolPromise;
        let tipo = await pool.request().query(`SELECT * FROM tipo_reclamo`);
        return tipo.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    obtenerAseguradora,
    obtenerEmpresa,
    editarAseguradora,
    editarEmpresa,
    obtenerTiposReclamos
}