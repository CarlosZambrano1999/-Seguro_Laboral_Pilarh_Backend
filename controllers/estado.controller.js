const estadoService = require('../services/estado.service');

//OBTENER ESTADOS DE LAS RECLAMOS
const obtenerEstados = async (req,res) => {
    try {
        var result = await estadoService.obtenerEstados();
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER TIPOS DE DOCUMENTOS
const obtenerTipos = async (req,res) => {
    try {
        var result = await estadoService.obtenerTipos();
        return res.status(200).json({
            data:result, message:'Successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status:400, message:error.message
        });
    }
};

//OBTENER Monedas
const obtenerMonedas = async (req,res) => {
    try {
        var result = await estadoService.obtenerMonedas();
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
    obtenerEstados,
    obtenerTipos,
    obtenerMonedas
};