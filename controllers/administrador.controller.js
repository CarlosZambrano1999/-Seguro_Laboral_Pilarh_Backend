const administradorService = require ('../services/administrador.service');

//OBTENER ADMINISTRADORES
const obtenerAdministradores = async (req,res) => {
    try {
        var result = await administradorService.obtenerAdministradores();
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER ADMINISTRADOR POR COD_USUARIO
const obtenerAdministrador = async (req,res) => {
    const cod_usuario = req.params.cod_usuario;
    try {
        var result = await administradorService.obtenerAdministrador(cod_usuario);
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};


//CREAR ADMINISTRADORES
const crearAdministrador = async(req,res)=>{
    const idUser = req.idUser;
    const administrador = {...req.body};
    try {
        var result= await administradorService.crearAdministrador(idUser, administrador);
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

//EDITAR ADMINISTRADOR
const editarAdministrador = async(req,res) =>{
    const idUser = req.idUser;
    const admin = {...req.body};
    try {
        var result = await administradorService.editarAdministrador(idUser,admin);
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

//listar Administradores si es activo o inactivo
const filtrarAdministradores = async (req,res) => {
    const estado = {...req.body};
    try {
        var result = await administradorService.filtrarAdministradores(estado);
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
    obtenerAdministradores,
    obtenerAdministrador,
    crearAdministrador,
    editarAdministrador,
    filtrarAdministradores
};