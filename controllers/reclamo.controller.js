const reclamoService = require('../services/reclamo.service');

//CREAR RECLAMOS
const crearReclamo = async(req,res)=>{
    const id_paciente = req.params.id_paciente;
    const tipo = req.params.tipo;
    const idUser = req.idUser;
    try {
        var result= await reclamoService.crearReclamo(idUser, id_paciente, tipo);
        if(result[0].error){
            return res.status(400).json({
                message: result[0].mensaje
            });
        }else{
            return res.status(200).json({
                data: result[0], message: 'Successfully'
            });
        }    
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//CREAR DOCUMENTOS MONETARIOS
const monetarios = async(req,res)=>{
    const id_reclamo = req.params.id_reclamo;
    const documentos = [...req.body];
    try {
        var result= await reclamoService.monetarios(id_reclamo, documentos);
        if(result[0].error){
            return res.status(400).json({
                message: result[0].mensaje
            });
        }else{
            return res.status(200).json({
                data: result, message: 'Successfully'
            });
        }    
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//CREAR DOCUMENTOS REFERENCIALES
const referenciales = async(req,res)=>{
    const id_reclamo = req.params.id_reclamo;
    const documentos = [...req.body];
    try {
        var result= await reclamoService.referenciales(id_reclamo, documentos);
        if(result[0].error){
            return res.status(400).json({
                message: result[0].mensaje
            });
        }else{
            return res.status(200).json({
                data: result, message: 'Successfully'
            });
        }    
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER RECLAMOS
const obtenerReclamos = async (req,res) => {
    try {
        var result = await reclamoService.obtenerReclamos();
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//FILTRAR RECLAMOS
const filtrarReclamos = async (req,res) => {
    const query = {...req.body};
    try {
        var result = await reclamoService.filtrarReclamos(query);
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER Reclamos x Id
const obtenerReclamosXId = async (req,res) => {
    const id_reclamo = req.params.id_reclamo;
    try {
        var result = await reclamoService.obtenerReclamosXId(id_reclamo);
        return res.status(200).json({
            data:result[0], message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER Documentos monetarios
const obtenerMonetarios = async (req,res) => {
    const id_reclamo = req.params.id_reclamo;
    try {
        var result = await reclamoService.obtenerMonetarios(id_reclamo);
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER Documentos referenciales
const obtenerReferenciales = async (req,res) => {
    const id_reclamo = req.params.id_reclamo;
    try {
        var result = await reclamoService.obtenerReferenciales(id_reclamo);
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//INHABILITAR Reclamo
const inhabilitarReclamo = async(req,res) =>{
    const id_reclamo = req.params.id_reclamo;
    const idUser = req.idUser;
    try {
        var result = await reclamoService.inhabilitarReclamo(idUser,id_reclamo);
        if(result[0].error){
            return res.status(400).json({
                message: result[0].mensaje
            });
        }else{
            return res.status(200).json({
                data: result, message: 'Successfully'
            });
        }
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//Enviar Reclamo
const enviarReclamo = async (req,res) => {
    const idUser = req.idUser;
    const id_reclamo = req.params.id_reclamo;
    try {
        var result = await reclamoService.enviarReclamo(idUser, id_reclamo);
        if(result[0].error){
            return res.status(200).json({
             message: result[0].mensaje
            });
        }else{
            return res.status(200).json({
                data:result[0], message:'Successfully'
            });
        }
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//CREAR DOCUMENTO DE reembolso
const reembolsar = async(req,res)=>{
    const id_reclamo = req.params.id_reclamo;
    const reembolso = {...req.body};
    try {
        var result= await reclamoService.reembolsar(id_reclamo, reembolso);
        if(result[0].error){
            return res.status(400).json({
                message: result[0].mensaje
            });
        }else{
            return res.status(200).json({
                data: result, message: 'Successfully'
            });
        }    
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER Documentos reembolso
const obtenerReembolso = async (req,res) => {
    const id_reclamo = req.params.id_reclamo;
    try {
        var result = await reclamoService.obtenerReembolso(id_reclamo);
        return res.status(200).json({
            data:result[0], message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER Reclamos x Usuario
const obtenerReclamosXUsuario = async (req,res) => {
    const id_empleado = req.params.id_empleado;
    try {
        var result = await reclamoService.obtenerReclamosXUsuario(id_empleado);
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

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