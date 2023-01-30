const usuarioService = require ('../services/usuario.service');


//Crear contraseña (usuario o administrador)
const crearPassword = async(req,res) =>{
    const sesion = {...req.body};
    try {
        var result = await usuarioService.crearPassword(sesion);
        if(!result.error){
            return res.status(200).json({
                data:result.usuario[0], message:'succesfully', rol: result.usuario[0].id_rol, token: result.token
            });
        }else{
            return res.status(200).json({
                message: result.mensaje
            });    
        }
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//cambiar contraseña (usuario o administrador)
const cambiarPassword = async(req,res) =>{
    const sesion = {...req.body};
    const idUser = req.idUser;
    try {
        var result = await usuarioService.cambiarPassword(idUser,sesion);
        if(result=='datos erroneos'){
            return res.status(200).json({
                data:result, message:'contraseña anterior incorrecta'
            });
        }else{
            return res.status(200).json({
                data:result[0], message:'succesfully'
            });
        }
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//INHABILITAR USUARIO (usuario o administrador)
const inhabilitarUsuario = async(req,res) =>{
    const admin = {...req.body};
    const idUser = req.idUser;
    try {
        var result = await usuarioService.inhabilitarUsuario(idUser,admin);
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

//HABILITAR USUARIO (usuario o administrador)
const habilitarUsuario = async(req,res) =>{
    const admin = {...req.body};
    const idUser = req.idUser;
    try {
        var result = await usuarioService.habilitarUsuario(idUser,admin);
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
const login = async (req,res) => {
    const usuario = {...req.body};
    try {
        var result = await usuarioService.login(usuario);
        if(result.error){
            return res.status(200).json({
                status:400, message:result.message
            });
        }else{
            return res.status(200).json({
                data:result.usuario[0], message:'succesfully', rol: result.usuario[0].id_rol, token: result.token
            });
        }
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//Obtener usuario por id
const obtenerUsuario = async (req,res) => {
    const idUser = req.idUser;
    try {
        var result = await usuarioService.obtenerUsuario(idUser);
        return res.status(200).json({
            data:result[0], message:'Succesfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//Solicitar reset de contraseña
const resetear = async (req,res) => {
    const usuario = req.params.usuario;
    try {
        var result = await usuarioService.resetear(usuario);
        if(result.error){
            return res.status(200).json({
                status:400, message:result.message
            });
        }else{
            return res.status(200).json({
                data:result[0], message:'succesfully'
            });
        }
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//Resetear Contraseña
const resetPassword = async(req,res) =>{
    const sesion = {...req.body};
    try {
        var result = await usuarioService.resetPassword(sesion);
        if(!result.error){
            return res.status(200).json({
                data:result.usuario[0], message:'succesfully', rol: result.usuario[0].id_rol, token: result.token
            });
        }else{
            return res.status(200).json({
                message: result.mensaje
            });    
        }
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

module.exports={
    login,
    cambiarPassword,
    crearPassword,
    inhabilitarUsuario,
    habilitarUsuario,
    obtenerUsuario,
    resetear,
    resetPassword
};