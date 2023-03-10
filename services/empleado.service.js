var { poolPromise } = require('../modules/sqldb');
var sql = require('mssql');

//Funcion para obtener datos de empleados
async function obtenerEmpleados() {
    try {
        const pool = await poolPromise;
        let empleado = await pool.request().query(`SELECT u.id_usuario, u.certificado, u.nombre, u.correo, a.id_agencia, 
                                                    a.nombre as agencia, u.deleted_user as inactivo FROM usuario as u  
                                                    INNER JOIN agencia as a ON u.fk_id_agencia=a.id_agencia
                                                    ORDER BY a.nombre, u.nombre`);
        return empleado.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para crear empleado
async function crearEmpleado(id,empleado){
    try {
        const pool = await poolPromise;
        let insertarEmpleado = await pool.request().input('certificado', sql.VarChar, empleado.certificado).
            input('nombre', sql.VarChar, empleado.nombre).
            input('correo', sql.VarChar, empleado.correo).
            input('agencia', sql.Int, empleado.agencia).
            input('id_admin', sql.Int, id).
            execute(`SP_CREAR_EMPLEADO`);
        return insertarEmpleado.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Funcion para Editar Empleado 
async function editarEmpleado(id,empleado) {
    try {
        const pool = await poolPromise;
        let editEmpleado = await pool.request().input('id_usuario', sql.Int, empleado.id_usuario).
            input('nombre', sql.VarChar, empleado.nombre).
            input('correo', sql.NVarChar, empleado.correo).
            input('certificado', sql.NVarChar, empleado.certificado).
            input('agencia', sql.Int, empleado.agencia).
            input('id_admin_upd', sql.Int, id).
            execute(`SP_EDITAR_EMPLEADO`);
        return editEmpleado.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}


//Funcion para filtrar empleados
async function filtrarEmpleados(query) {
    try {
        let where = ``;
        let orderby =` ORDER BY a.nombre, u.nombre`;
        let queryPrincipal = `SELECT u.id_usuario, u.certificado, u.nombre, u.correo, a.id_agencia, 
        a.nombre as agencia, u.deleted_user as inactivo FROM usuario as u  
        INNER JOIN agencia as a ON u.fk_id_agencia=a.id_agencia`
        if(query.id_agencia!='' && query.nombre!=''){
            where=` WHERE a.id_agencia= ${query.id_agencia} AND u.nombre LIKE +'%'+@input_parameter+'%'`
        }else if(query.id_agencia!='' && query.nombre===''){
            where= ` WHERE a.id_agencia= ${query.id_agencia}`
        }else if(query.nombre!='' && query.id_agencia===''){
            where = ` WHERE u.nombre LIKE +'%'+@input_parameter+'%'`
        }
        else{
            where = ` `;
        }
        let queryTotal= queryPrincipal + where + orderby;
        const pool = await poolPromise;
        let empleados = await pool.request().input('input_parameter', sql.VarChar, query.nombre).query(queryTotal);
        return empleados.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//funcion para crear Pacientes
async function crearPaciente(id,id_empleado, paciente){
    try {
        const pool = await poolPromise;
        let insertarPaciente = await pool.request().input('id_usuario', sql.Int, id_empleado).
            input('nombre', sql.VarChar, paciente.nombre).
            input('parentesco', sql.Int, paciente.parentesco).
            input('id_admin_upd', sql.Int, id).
            execute(`SP_CREAR_PACIENTE`);
        return insertarPaciente.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener datos de pacientes
async function obtenerPacientes(id_empleado) {
    try {
        const pool = await poolPromise;
        let paciente = await pool.request().input('id_empleado', sql.Int, id_empleado).
        query(`SELECT p.fk_id_usuario, p.id_paciente, p.paciente, p.tipo, pa.parentesco, pa.id_parentesco  FROM paciente as p
                    INNER JOIN parentesco as pa
                    ON pa.id_parentesco= p.fk_id_parentesco
                    WHERE p.fk_id_usuario= @id_empleado AND p.activo=1`);
        return paciente.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Funcion para Editar Paciente
async function editarPaciente(id,paciente) {
    try {
        const pool = await poolPromise;
        let editPaciente = await pool.request().input('id_usuario', sql.Int, paciente.id_usuario).
            input('id_paciente', sql.Int, paciente.id_paciente).
            input('paciente', sql.VarChar, paciente.paciente).
            input('parentesco', sql.Int, paciente.parentesco).
            input('id_admin_upd', sql.Int, id).
            execute(`SP_EDITAR_PACIENTE`);
        return editPaciente.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Funcion para inhabilitar Paciente
async function inhabilitarPaciente(id,paciente) {
    try {
        const pool = await poolPromise;
        let editPaciente = await pool.request().input('id_usuario', sql.Int, paciente.id_usuario).
            input('id_paciente', sql.Int, paciente.id_paciente).
            input('id_admin_upd', sql.Int, id).
            execute(`SP_DELETE_PACIENTE`);
        return editPaciente.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener empleados por id de agencia
async function obtenerEmpleadosxAgencia(id_agencia) {
    try {
        const pool = await poolPromise;
        let empleado = await pool.request().input('input_parameter', sql.Int, id_agencia)
            .query(`SELECT u.id_usuario, u.certificado, u.nombre, u.correo, a.id_agencia, 
            a.nombre as agencia, u.deleted_user as inactivo FROM usuario as u  
            INNER JOIN agencia as a ON u.fk_id_agencia=a.id_agencia
            WHERE a.id_agencia = @input_parameter
            ORDER BY u.nombre`);
        return empleado.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener empleado x correo
async function obtenerEmpleado(correo) {
    try {
        const pool = await poolPromise;
        let usuario = await pool.request().input('correo', sql.VarChar, correo).
        query(`SELECT * FROM usuario WHERE correo=@correo`);
        return usuario.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}
 
//Funcion para obtener Parentesco
async function obtenerParentesco() {
    try {
        const pool = await poolPromise;
        let parentesco = await pool.request().query(`SELECT * FROM parentesco WHERE id_parentesco!=5`);
        return parentesco.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    obtenerEmpleados,
    crearEmpleado,
    editarEmpleado,
    filtrarEmpleados,
    crearPaciente,
    obtenerPacientes,
    editarPaciente,
    inhabilitarPaciente,
    obtenerEmpleadosxAgencia,
    obtenerEmpleado,
    obtenerParentesco
};
