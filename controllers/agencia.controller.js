const agenciaService = require ('../services/agencia.service');

//OBTENER Agencias
const obtenerAgencias = async (req,res) => {
    try {
        var result = await agenciaService.obtenerAgencias();
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER AGENCIA POR ID_AGENCIA
const obtenerAgencia = async (req,res) => {
    const id_agencia = req.params.id_agencia;
    try {
        var agencia = await agenciaService.obtenerAgencia(id_agencia);
        return res.status(200).json({
            data:agencia[0], message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};


//CREAR AGENCIAS
const crearAgencia = async(req,res)=>{
    const agencia = {...req.body};
    const idUser = req.idUser;
    try {
        var result= await agenciaService.crearAgencia(idUser,agencia);
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

//EDITAR AGENCIA
const editarAgencia = async(req,res) =>{
    const agencia = {...req.body};
    const idUser = req.idUser;
    try {
        var result = await agenciaService.editarAgencia(idUser,agencia);
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

//INHABILITAR AGENCIA
const inhabilitarAgencia = async(req,res) =>{
    const agencia = {...req.body};
    const idUser = req.idUser;
    try {
        var result = await agenciaService.inhabilitarAgencia(idUser,agencia);
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

//HABILITAR AGENCIA
const habilitarAgencia = async(req,res) =>{
    const agencia = {...req.body};
    const idUser = req.idUser;
    try {
        var result = await agenciaService.habilitarAgencia(idUser,agencia);
        if(result[0].mensaje){
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

//listar Agencias inhabilitadas
const agenciasInhabilitadas = async (req,res) => {
    try {
        var result = await agenciaService.agenciasInhabilitadas();
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER Agencias Exceptuando la del usuario logueado
const obtenerDemasAgencias = async (req,res) => {
    const idUser= req.idUser;
    try {
        var result = await agenciaService.obtenerDemasAgencias(idUser);
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

module.exports={
    obtenerAgencias,
    obtenerAgencia,
    crearAgencia,
    editarAgencia,
    inhabilitarAgencia,
    habilitarAgencia,
    agenciasInhabilitadas,
    obtenerDemasAgencias
};