const datosService = require ('../services/datos.service');

//OBTENER Empresa
const obtenerEmpresa = async (req,res) => {
    try {
        var result = await datosService.obtenerEmpresa();
        return res.status(200).json({
            data:result[0], message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER Aseguradora
const obtenerAseguradora = async (req,res) => {
    try {
        var result = await datosService.obtenerAseguradora();
        return res.status(200).json({
            data:result[0], message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//EDITAR EMPRESA
const editarEmpresa = async(req,res) =>{
    const idUser = req.idUser;
    const emp = {...req.body};
    try {
        var result = await datosService.editarEmpresa(idUser,emp);
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

//EDITAR Aseguradora
const editarAseguradora = async(req,res) =>{
    const idUser = req.idUser;
    const aseg = {...req.body};
    try {
        var result = await datosService.editarAseguradora(idUser,aseg);
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

//OBTENER Aseguradora
const obtenerTiposReclamos = async (req,res) => {
    try {
        var result = await datosService.obtenerTiposReclamos();
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
    editarAseguradora,
    editarEmpresa,
    obtenerAseguradora,
    obtenerEmpresa,
    obtenerTiposReclamos
}