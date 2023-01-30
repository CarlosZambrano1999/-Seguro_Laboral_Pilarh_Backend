var { poolPromise } = require('../modules/sqldb');
var sql = require('mssql');

//Funcion para obtener datos de empleados
async function obtenerEmpleados() {
    try {
        const pool = await poolPromise;
        let empleado = await pool.request().query(`SELECT u.id_usuario, u.codigo_usuario, u.nombre, u.correo, a.id_agencia, a.nombre as agencia, u.deleted_user as inactivo, u.firma FROM usuario as u INNER JOIN empleado as e ON u.id_usuario= e.fk_id_usuario
                                                    INNER JOIN agencia as a ON e.fk_id_agencia=a.id_agencia
                                                    WHERE u.deleted_at is null
                                                    ORDER BY u.codigo_usuario`);
        return empleado.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener empleados por cod de usuario
async function obtenerEmpleado(cod_usuario) {
    try {
        const pool = await poolPromise;
        let empleado = await pool.request().input('input_parameter', sql.VarChar, cod_usuario)
            .query(`SELECT u.id_usuario, u.codigo_usuario, u.nombre, u.correo, a.id_agencia, a.nombre as agencia, u.deleted_user as inactivo, u.firma 
                        FROM usuario as u INNER JOIN empleado as e ON e.fk_id_usuario=u.id_usuario
                        INNER JOIN agencia as a ON a.id_agencia=e.fk_id_agencia
                        WHERE u.codigo_usuario LIKE +'%'+@input_parameter+'%'`);
        return empleado.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener empleados por id de agencia
async function obtenerEmpleadosxAgencia(id_agencia) {
    try {
        const pool = await poolPromise;
        let empleado = await pool.request().input('input_parameter', sql.Int, id_agencia)
            .query(`SELECT u.id_usuario, u.codigo_usuario, u.nombre, u.correo, u.created_at, u.created_user, a.nombre as agencia 
            FROM usuario as u INNER JOIN empleado as e ON e.fk_id_usuario=u.id_usuario
            INNER JOIN agencia as a ON a.id_agencia=e.fk_id_agencia
            WHERE a.id_agencia = @input_parameter`);
        return empleado.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener empleados logueados
async function obtenerEmpleadosLogueados() {
    try {
        const pool = await poolPromise;
        let empleado = await pool.request().query(`SELECT u.id_usuario, u.codigo_usuario, u.nombre, u.correo, u.created_at, u.created_user, a.nombre as agencia 
        FROM usuario as u INNER JOIN empleado as e ON e.fk_id_usuario=u.id_usuario
        INNER JOIN agencia as a ON a.id_agencia=e.fk_id_agencia
        INNER JOIN sesion as s ON s.fk_id_usuario=u.id_usuario
        WHERE u.deleted_at is NULL`);
        return empleado.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para obtener empleados logueados
async function obtenerEmpleadosSinLoguear() {
    try {
        const pool = await poolPromise;
        let empleado = await pool.request().query(`SELECT u.id_usuario, u.codigo_usuario, u.nombre, u.correo, u.created_at, u.created_user, a.nombre as agencia 
        FROM usuario as u INNER JOIN empleado as e ON e.fk_id_usuario=u.id_usuario
        INNER JOIN agencia as a ON a.id_agencia=e.fk_id_agencia
        LEFT JOIN sesion as s ON s.fk_id_usuario=u.id_usuario
        WHERE u.deleted_at is NULL AND s.fk_id_usuario is NULL`);
        return empleado.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para crear empleado
async function crearEmpleado(id,empleado){
    try {
        const pool = await poolPromise;
        let insertarEmpleado = await pool.request().input('cod_usuario', sql.VarChar, empleado.cod_usuario).
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
            input('agencia', sql.Int, empleado.agencia).
            input('id_admin_upd', sql.Int, id).
            execute(`SP_EDITAR_EMPLEADO`);
        return editEmpleado.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para listar empleados inhabilitados
async function empleadosInhabilitados() {
    try {
        const pool = await poolPromise;
        let empleados = await pool.request().query(`SELECT u.id_usuario, u.codigo_usuario, u.nombre, u.correo, a.nombre as agencia FROM usuario as u INNER JOIN empleado as e ON u.id_usuario= e.fk_id_usuario
                                                        INNER JOIN agencia as a ON e.fk_id_agencia=a.id_agencia
                                                        WHERE u.deleted_at is not null
                                                        ORDER BY a.id_agencia, u.nombre`);
        return empleados.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para filtrar empleados
async function filtrarEmpleados(query) {
    try {
        let where = ``;
        let orderby =` ORDER BY u.codigo_usuario`;
        let queryPrincipal = `SELECT u.id_usuario, u.codigo_usuario, u.nombre, u.correo,a.id_agencia, a.nombre as agencia, u.deleted_at as inactivo, u.firma FROM usuario as u INNER JOIN empleado as e ON u.id_usuario = e.fk_id_usuario`
/*abc*/ if(query.logueados!='' && query.activos!='' && query.id_agencia!=''){
            if(query.logueados==1){
                queryPrincipal = queryPrincipal + ` INNER JOIN sesion AS s ON u.id_usuario = s.fk_id_usuario`;
                if(query.activos==1){
                    where = ` WHERE u.deleted_at is null AND a.id_agencia = ${query.id_agencia}`;    
                }else if(query.activos==2){
                    where = ` WHERE u.deleted_at is not null AND a.id_agencia = ${query.id_agencia}`;    
                }
            }else if(query.logueados==2){
                queryPrincipal = queryPrincipal + ` LEFT JOIN sesion AS s ON u.id_usuario=s.fk_id_usuario`;
                if(query.activos==1){
                    where = ` WHERE u.deleted_at is null AND a.id_agencia = ${query.id_agencia} AND s.fk_id_usuario IS NULL`;
                }else if(query.activos==2){
                    where = ` WHERE u.deleted_at is NOT NULL AND a.id_agencia = ${query.id_agencia} s.fk_id_usuario IS NULL`;
                }
            }
/*bc*/ }else if(query.logueados=='' && query.activos!='' && query.id_agencia!=''){
            if(query.activos==1){
                where = ` WHERE u.deleted_at is null AND a.id_agencia = ${query.id_agencia}`;    
            }else if(query.activos==2){
                where = ` WHERE u.deleted_at is not null AND a.id_agencia = ${query.id_agencia}`;    
            }
/*c*/   }else if(query.logueados=='' && query.activos=='' && query.id_agencia!=''){
            where =` WHERE a.id_agencia = ${query.id_agencia}`;
/*ab*/   }else if(query.logueados!='' && query.activos!='' && query.id_agencia==''){
            if(query.logueados==1){
                queryPrincipal = queryPrincipal + ` INNER JOIN sesion AS s ON s.fk_id_usuario = u.id_usuario`;
                if(query.activos==1){
                    where = ` WHERE u.deleted_at is null`;    
                }else if(query.activos==2){
                    where = ` WHERE u.deleted_at is not null`;    
                }
            }else if(query.logueados==2){
                queryPrincipal = queryPrincipal + ` LEFT JOIN sesion AS s ON u.id_usuario=s.fk_id_usuario`;
                if(query.activos==1){
                    where = ` WHERE u.deleted_at is null AND s.fk_id_usuario IS NULL`;
                }else if(query.activos==2){
                    where = ` WHERE u.deleted_at is NOT NULL s.fk_id_usuario IS NULL`;
                }
            }
/*a*/   }else if(query.logueados!='' && query.activos=='' && query.id_agencia==''){
            if(query.logueados==1){
                queryPrincipal = queryPrincipal + ` INNER JOIN sesion AS s ON s.fk_id_usuario = u.id_usuario`;
            }else if(query.logueados==2){
                queryPrincipal = queryPrincipal + ` LEFT JOIN sesion AS s ON u.id_usuario=s.fk_id_usuario`;
                where = ` WHERE s.fk_id_usuario IS NULL`;
            }
/*ac*/  }else if(query.logueados!='' && query.activos=='' && query.id_agencia!=''){
            if(query.logueados==1){
                queryPrincipal = queryPrincipal + ` INNER JOIN sesion AS s ON s.fk_id_usuario = u.id_usuario`;
                where = ` WHERE s.fk_id_usuario IS NULL AND a.id_agencia=${query.id_agencia}`;
            }else if(query.logueados==2){
                queryPrincipal = queryPrincipal + ` LEFT JOIN sesion AS s ON u.id_usuario=s.fk_id_usuario`;
                where = ` WHERE s.fk_id_usuario IS NULL AND a.id_agencia=${query.id_agencia}`;
            }
/*b*/   }else if(query.logueados=='' && query.activos!='' && query.id_agencia==''){
            if(query.activos==1){
                where = ` WHERE u.deleted_at is null`;    
            }else if(query.activos==2){
                where = ` WHERE u.deleted_at is not null`;    
            }
        }else{
            where = ``;
        }
        let queryTotal= queryPrincipal + where + orderby;
        const pool = await poolPromise;
        let empleados = await pool.request().query(queryTotal);
        return empleados.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Funcion para agregar firma 
async function agregarFirma(id,empleado) {
    try {
        const pool = await poolPromise;
        let addFirma = await pool.request().input('id_admin_upd', sql.Int, id).
            input('id_usuario', sql.Int, empleado.id_usuario).
            input('firma', sql.VarChar, empleado.firma).
            execute(`SP_AGREGAR_FIRMA`);
        return addFirma.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}
 
module.exports = {
    obtenerEmpleados,
    obtenerEmpleado,
    obtenerEmpleadosLogueados,
    obtenerEmpleadosSinLoguear,
    obtenerEmpleadosxAgencia,
    crearEmpleado,
    editarEmpleado,
    empleadosInhabilitados,
    filtrarEmpleados,
    agregarFirma
};
