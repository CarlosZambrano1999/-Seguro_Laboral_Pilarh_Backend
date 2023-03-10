const jwt = require('jsonwebtoken'); //Libreria para generar token

const tokenSign = async (user) => { //TODO: Genera Token
    return jwt.sign(
        {
            id: user.id_usuario, //TODO: <---
            role: user.fk_id_rol
        }, //Payload ! Carga útil
        process.env.JWT_SECRET, // ENV 
        {
            expiresIn: "24h", //tiempo de vida
        }
    );
};

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
};

const decodeSign = (token) => { //TODO: Verificar que el token sea valido y correcto
    return jwt.decode(token, null);
};


module.exports = { tokenSign, decodeSign, verifyToken };