var { poolPromise } = require('../modules/sqldb');
var sql = require('mssql');

//Funcion para obtener los estados de un reclamo
async function obtenerEstados() {
    try {
        const pool = await poolPromise;
        let estado = await pool.request().query(`SELECT * FROM estado`);
        return estado.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener los tipos de reclamo (Factura o Recibo)
async function obtenerTipos() {
    try {
        const pool = await poolPromise;
        let tipo = await pool.request().query(`SELECT * FROM tipo_documento`);
        return tipo.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener las monedas
async function obtenerMonedas() {
    try {
        const pool = await poolPromise;
        let tipo = await pool.request().query(`SELECT * FROM moneda`);
        return tipo.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    obtenerEstados,
    obtenerTipos,
    obtenerMonedas
};