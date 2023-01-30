const superService = require ('../services/super_administrador.service');

//OBTENER INSPECTORES
const obtenerSuperAdministrador = async (req,res) => {
    try {
        var result = await superService.obtenerSuperAdministrador();
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//Crear contraseña a superAdministrador
const crearPassword = async(req,res) =>{
    const sesion = {...req.body};
    try {
        var result = await superService.crearPassword(sesion);
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

//cambiar contraseña a superAdministrador
const cambiarPassword = async(req,res) =>{
    const sesion = {...req.body};
    try {
        var result = await superService.cambiarPassword(sesion);
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

//Obtener datos de usuario con las credenciales de inicio de sesion
const verificarCredenciales = async (req,res) => {
    const cod_usuario = req.params.cod_usuario;
    const password = req.params.password;
    try {
        var result = await superService.verificarCredenciales(cod_usuario,password);
        if(result=='datos erroneos'){
            return res.status(200).json({
                data:result, message:'datos erroneos'
            });
        }else{
            return res.status(200).json({
                data:result[0], message:'succesfully', rol: result[0].rol
            });
        }
        
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

module.exports={
    obtenerSuperAdministrador,
    crearPassword,
    cambiarPassword,
    verificarCredenciales
};