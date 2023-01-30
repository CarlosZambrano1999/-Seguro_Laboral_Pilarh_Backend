var { poolPromise } = require('../modules/sqldb');
var sql = require('mssql');

//Funcion para obtener los estados de una encomienda
async function obtenerEstados() {
    try {
        const pool = await poolPromise;
        let estado = await pool.request().query(`SELECT * FROM estado`);
        return estado.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    obtenerEstados
};