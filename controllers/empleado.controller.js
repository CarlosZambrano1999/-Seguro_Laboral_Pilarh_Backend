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

//CREAR Pacientes
const crearPaciente = async(req,res)=>{
    const empleado = {...req.body};
    const idUser = req.idUser;
    const id_empleado = req.params.id_empleado;
    try {
        var result= await empleadoService.crearPaciente(idUser,id_empleado,empleado);
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

//OBTENER Pacientes
const obtenerPacientes = async (req,res) => {
    const id_empleado = req.params.id_empleado;
    try {
        var result = await empleadoService.obtenerPacientes(id_empleado);
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//EDITAR Paciente
const editarPaciente = async(req,res) =>{
    const paciente = {...req.body};
    const idUser = req.idUser;
    try {
        var result = await empleadoService.editarPaciente(idUser,paciente);
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

//INHABILITAR Paciente
const inhabilitarPaciente = async(req,res) =>{
    const paciente = {...req.body};
    const idUser = req.idUser;
    try {
        var result = await empleadoService.inhabilitarPaciente(idUser,paciente);
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

module.exports={
    obtenerEmpleados,
    crearEmpleado,
    editarEmpleado,
    filtrarEmpleados,
    crearPaciente,
    obtenerPacientes,
    editarPaciente, 
    inhabilitarPaciente,
    obtenerEmpleadosxAgencia,
};