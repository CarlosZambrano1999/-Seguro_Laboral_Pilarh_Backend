const reclamoService = require('../services/reclamo.service');

//CREAR RECLAMOS
const crearReclamo = async(req,res)=>{
    const id_paciente = req.params.id_paciente;
    const idUser = req.idUser;
    try {
        var result= await reclamoService.crearReclamo(idUser, id_paciente);
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

module.exports = {
    crearReclamo,
    monetarios,
    referenciales
}