var { poolPromise } = require('../modules/sqldb');
var sql = require('mssql');

//Funcion para crear reclamo
async function crearReclamo(id,id_paciente){
    try {
        const pool = await poolPromise;
        let reclamo = await pool.request().input('id_paciente', sql.Int, id_paciente).
            input('id_admin', sql.Int, id).
            execute(`SP_CREAR_RECLAMO`);
        return reclamo.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//funcion para subir documentos monetarios
async function monetarios(id_reclamo, documentos){
    try {
        const pool = await poolPromise;
        let dozer = [];
        for (i = 0; i < documentos.length; i++) {
            dozer = await pool.request().input('id_reclamo', sql.Int, id_reclamo).
            input('tipo', sql.Int, documentos[i].tipo).
            input('numero', sql.VarChar,  documentos[i].numero).
            input('descripcion', sql.VarChar,  documentos[i].descripcion).
            input('valor', sql.Decimal,  documentos[i].valor).
            execute(`SP_DOCUMENTO_MONETARIO`); 
        } 
        return dozer.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//funcion para subir documentos referenciales
async function referenciales(id_reclamo, documentos){
    try {
        const pool = await poolPromise;
        let dozer = [];
        for (i = 0; i < documentos.length; i++) {
            dozer = await pool.request().input('id_reclamo', sql.Int, id_reclamo).
            input('cantidad', sql.Int, documentos[i].cantidad).
            input('descripcion', sql.VarChar, documentos[i].descripcion).
            execute(`SP_DOCUMENTO_REFERENCIAL`); 
        }
        return dozer.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    crearReclamo,
    monetarios,
    referenciales
}