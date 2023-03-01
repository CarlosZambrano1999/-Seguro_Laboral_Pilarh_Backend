var { poolPromise } = require('../modules/sqldb');
var sql = require('mssql');
const emailSender = require('../modules/emailer');
const datosService = require('../services/datos.service')

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
            input('moneda', sql.Decimal,  documentos[i].moneda).
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

async function obtenerReclamos() {
    try {
        const pool = await poolPromise;
        let reclamos = await pool.request().query(`SELECT rec.id_reclamo, us.nombre, pac.paciente, mon.moneda, rec.valor_reclamo, FORMAT(rec.fecha,'dd/MM/yyyy') as fecha, es.estado, es.id_estado, rec.deleted_at as inactivo FROM reclamo as rec
        INNER JOIN paciente as pac ON pac.id_paciente= rec.fk_id_paciente
        INNER JOIN usuario as us ON us.id_usuario= pac.fk_id_usuario
        INNER JOIN estado as es ON es.id_estado = rec.fk_id_estado
        INNER JOIN moneda as mon ON mon.id_moneda= rec.fk_id_moneda 
        WHERE rec.deleted_at is null
        ORDER BY es.id_estado, rec.fecha`);
        return reclamos.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para filtrar empleados
//abc ab ac a b c bc
async function filtrarReclamos(query) {
    try {
        console.log('tipo', typeof(query.fecha_inicial));
        let where = ``;
        let orderby =` ORDER BY es.id_estado, rec.fecha `;
        let queryPrincipal = `SELECT rec.id_reclamo, us.nombre, pac.paciente, mon.moneda, rec.valor_reclamo, FORMAT(rec.fecha,'dd/MM/yyyy') as fecha, es.estado, es.id_estado, rec.deleted_at as inactivo FROM reclamo as rec
        INNER JOIN paciente as pac ON pac.id_paciente= rec.fk_id_paciente
        INNER JOIN usuario as us ON us.id_usuario= pac.fk_id_usuario
        INNER JOIN estado as es ON es.id_estado = rec.fk_id_estado
        INNER JOIN moneda as mon ON mon.id_moneda= rec.fk_id_moneda`
        if(query.nombre!='' && query.fecha_inicial!='' && query.fecha_final!=''){
            where=` WHERE rec.deleted_at is null AND us.nombre LIKE +'%'+@input_parameter+'%' AND (CAST(rec.fecha as date) >= @fecha_inicial AND CAST(rec.fecha as date)<= @fecha_final )`
        }else if(query.nombre!='' && query.fecha_inicial==='' && query.fecha_final!=''){
            where= ` WHERE rec.deleted_at is null AND us.nombre LIKE +'%'+@input_parameter+'%' AND CAST(rec.fecha as date) <= @fecha_final`
        }else if(query.nombre!='' && query.fecha_inicial!='' && query.fecha_final===''){
            where= ` WHERE rec.deleted_at is null AND us.nombre LIKE +'%'+@input_parameter+'%' AND CAST(rec.fecha as date) >= @fecha_inicial`
        }else if(query.nombre==='' && query.fecha_inicial!='' && query.fecha_final!=''){
            where= ` WHERE rec.deleted_at is null AND CAST(rec.fecha as date) >= @fecha_inicial AND CAST(rec.fecha as date)<= @fecha_final`
        }else if(query.nombre!='' && query.fecha_inicial==='' && query.fecha_final===''){
            where= ` WHERE rec.deleted_at is null AND us.nombre LIKE +'%'+@input_parameter+'%' `
        }else if(query.nombre==='' && query.fecha_inicial!='' && query.fecha_final===''){
            where= ` WHERE rec.deleted_at is null AND CAST(rec.fecha as date) >= @fecha_inicial`
        }else if(query.nombre==='' && query.fecha_inicial==='' && query.fecha_final!=''){
            where= ` WHERE rec.deleted_at is null AND CAST(rec.fecha as date) <= @fecha_final`
        }
        else{
            where = ` WHERE rec.deleted_at is null`;
        }
        let queryTotal= queryPrincipal + where + orderby;
        const pool = await poolPromise;
        let empleados = await pool.request().input('input_parameter', sql.VarChar, query.nombre).
                                            input('fecha_inicial', sql.VarChar, query.fecha_inicial).
                                            input('fecha_final', sql.VarChar, query.fecha_final).
                                            query(queryTotal);
        return empleados.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

async function obtenerReclamosXId(id_reclamo) {
    try {
        const pool = await poolPromise;
        let reclamos = await pool.request().input('input_parameter',sql.Int, id_reclamo).
        query(`SELECT us.nombre, us.correo, us.certificado, mon.moneda, rec.valor_reclamo, pac.paciente FROM reclamo as rec INNER JOIN paciente as pac
                ON pac.id_paciente= rec.fk_id_paciente
                INNER JOIN usuario as us
                ON us.id_usuario=pac.fk_id_usuario
                INNER JOIN moneda as mon ON mon.id_moneda= rec.fk_id_moneda
                WHERE rec.id_reclamo=@input_parameter`);
        return reclamos.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

async function obtenerMonetarios(id_reclamo) {
    try {
        const pool = await poolPromise;
        let reclamos = await pool.request().input('input_parameter',sql.Int, id_reclamo).
        query(`SELECT  t.tipo, dm.numero, dm.descripcion, mon.moneda, dm.valor FROM documento_monetario as dm INNER JOIN tipo_documento as t
                ON t.id_tipo= dm.fk_id_tipo
                INNER JOIN reclamo_doc_monetario as rdm
                ON rdm.fk_id_documento = dm.id_documento
                INNER JOIN reclamo as rec
                ON rec.id_reclamo = rdm.fk_id_reclamo
                INNER JOIN moneda as mon ON mon.id_moneda= dm.fk_id_moneda
                WHERE rec.id_reclamo=@input_parameter`);
        return reclamos.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

async function obtenerReferenciales(id_reclamo) {
    try {
        const pool = await poolPromise;
        let reclamos = await pool.request().input('input_parameter',sql.Int, id_reclamo).
        query(`SELECT dr.cantidad, dr.descripcion FROM documento_referencial as dr 
                INNER JOIN reclamo_doc_referencial as rdr
                ON rdr.fk_id_documento = dr.id_documento
                INNER JOIN reclamo as rec
                ON rec.id_reclamo = rdr.fk_id_reclamo
                WHERE rec.id_reclamo=@input_parameter`);
        return reclamos.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

// Funcion para inhabilitar Reclamo 
async function inhabilitarReclamo(id, id_reclamo) {
    try {
        const pool = await poolPromise;
        let delReclamo = await pool.request().input('id_reclamo', sql.Int, id_reclamo).
            input('id_admin_del', sql.Int, id).
            execute(`SP_INHABILITAR_RECLAMO`);
        return delReclamo.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//Funcion para enviar un reclamo
async function enviarReclamo(id, id_reclamo){
    try {
        const pool = await poolPromise;
        let enviar = await pool.request().input('id_admin', sql.Int, id).
            input('id_reclamo', sql.Int, id_reclamo).
            execute(`SP_ENVIAR_RECLAMO`);
        const recl = enviar.recordsets[0];
        const monetarios = await obtenerMonetarios(id_reclamo);
        const referenciales = await obtenerReferenciales(id_reclamo);
        const aseguradora = await datosService.obtenerAseguradora();
        const empresa = await datosService.obtenerEmpresa();
        emailSender.mailEnviarReclamo(recl[0], monetarios, referenciales, aseguradora[0], empresa[0]);    
        return enviar.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//funcion para subir reembolso
async function reembolsar(id_reclamo, reembolso){
    try {
        const pool = await poolPromise;
        let dozer =  await pool.request().input('id_reclamo', sql.Int, id_reclamo).
            input('total_cubierto', sql.Decimal, reembolso.total_cubierto).
            input('deducible', sql.Decimal, reembolso.deducible).
            input('coaseguro', sql.Decimal, reembolso.coaseguro).
            input('observaciones', sql.NVarChar, reembolso.observaciones).
            input('moneda', sql.Int, reembolso.moneda).
            execute(`SP_CREAR_REEMBOLSO`);
        const factura = dozer.recordsets[0];
        const reclamo = await obtenerReclamosXId(id_reclamo);
        const monetarios = await obtenerMonetarios(id_reclamo);
        const referenciales = await obtenerReferenciales(id_reclamo);
        const empresa = await datosService.obtenerEmpresa();
        emailSender.mailConfirmarReclamo(reclamo[0], monetarios, referenciales, empresa[0],factura[0]);
        return dozer.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

//obtener Reembolso
async function obtenerReembolso(id_reclamo) {
    try {
        const pool = await poolPromise;
        let reembolso = await pool.request().input('input_parameter',sql.Int, id_reclamo).
        query(`SELECT re.total_cubierto, re.deducible, re.coaseguro, re.observaciones, FORMAT(re.fecha,'dd/MM/yyyy hh:mm:ss') as fecha, mon.moneda, re.total_a_pagar FROM reembolso as re
                INNER JOIN moneda as mon ON mon.id_moneda= re.fk_id_moneda
                WHERE re.fk_id_reclamo=@input_parameter`);
        return reembolso.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

async function obtenerReclamosXUsuario(id_empleado) {
    try {
        const pool = await poolPromise;
        let reclamos = await pool.request().input('input_parameter',sql.Int, id_empleado).
        query(`SELECT rec.id_reclamo, us.nombre, pac.paciente, mon.moneda, rec.valor_reclamo, FORMAT(rec.fecha,'dd/MM/yyyy') as fecha, es.estado, es.id_estado, rec.deleted_at as inactivo FROM reclamo as rec
                INNER JOIN paciente as pac ON pac.id_paciente= rec.fk_id_paciente
                INNER JOIN usuario as us ON us.id_usuario= pac.fk_id_usuario
                INNER JOIN estado as es ON es.id_estado = rec.fk_id_estado
                INNER JOIN moneda as mon ON mon.id_moneda= rec.fk_id_moneda
                WHERE us.id_usuario=@input_parameter`);
        return reclamos.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    crearReclamo,
    monetarios,
    referenciales,
    obtenerReclamos,
    filtrarReclamos,
    obtenerReclamosXId,
    obtenerMonetarios,
    obtenerReferenciales,
    inhabilitarReclamo,
    enviarReclamo,
    reembolsar,
    obtenerReembolso,
    obtenerReclamosXUsuario
}