const empleadoService = require ('../services/empleado.service');

//OBTENER EMPLEADOS
const obtenerEmpleados = async (req,res) => {
    try {
        var result = await empleadoService.obtenerEmpleados();
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER EMPLEADO POR COD_USUARIO
const obtenerEmpleado = async (req,res) => {
    const cod_usuario = req.params.cod_usuario;
    try {
        var result = await empleadoService.obtenerEmpleado(cod_usuario);
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER EMPLEADO POR AGENCIA
const obtenerEmpleadosxAgencia = async (req,res) => {
    const id_agencia = req.params.id_agencia;
    try {
        var empleado = await empleadoService.obtenerEmpleadosxAgencia(id_agencia);
        return res.status(200).json({
            data:empleado, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER EMPLEADOS LOGUEADOS
const obtenerEmpleadosLogueados = async (req,res) => {
    try {
        var result = await empleadoService.obtenerEmpleadosLogueados();
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER EMPLEADOS SIN LOGUEAR
const obtenerEmpleadosSinLoguear = async (req,res) => {
    try {
        var result = await empleadoService.obtenerEmpleadosSinLoguear();
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//CREAR EMPLEADOS
const crearEmpleado = async(req,res)=>{
    const empleado = {...req.body};
    const idUser = req.idUser;
    try {
        var result= await empleadoService.crearEmpleado(idUser,empleado);
        if(result[0].error){
            return res.status(200).json({
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

//EDITAR EMPLEADO
const editarEmpleado = async(req,res) =>{
    const empleado = {...req.body};
    const idUser = req.idUser;
    try {
        var result = await empleadoService.editarEmpleado(idUser,empleado);
        if(result[0].error){
            return res.status(200).json({
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

//listar Empleados inhabilitados
const empleadosInhabilitados = async (req,res) => {
    try {
        var result = await empleadoService.empleadosInhabilitados();
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//FILTRAR Empleados
const filtrarEmpleados = async (req,res) => {
    const query = {...req.body};
    try {
        var result = await empleadoService.filtrarEmpleados(query);
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};


//AGREGAR FIRMA
const agregarFirma = async(req,res) =>{
    const empleado = {...req.body};
    const idUser = req.idUser;
    try {
        var result = await empleadoService.agregarFirma(idUser,empleado);
        if(result[0].error){
            return res.status(200).json({
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


module.exports={
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