const { verifyToken } = require('../helpers/generateToken');
var { poolPromise } = require('../modules/sqldb');
var sql = require('mssql');

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop(); //TODO: 231231321
        const tokenData = await verifyToken(token);
        const pool = await poolPromise;
        const userData = await pool.request().input('id_user', sql.Int, tokenData.id).
                                            query(`SELECT id_usuario, fk_id_rol  as role FROM usuario WHERE id_usuario = @id_user`); //TODO: 696966
        //TODO ['user'].includes('user')
        if ([].concat(roles).includes(userData.recordset[0].role)) { //TODO:
            next();
        } else {
            res.status(409);
            res.send({ error: 'No tienes permisos' });
        }

    } catch (e) {
        console.log(e);
        res.status(409);
        res.send({ error: 'Tu por aqui no pasas!' });
    }
};

module.exports = checkRoleAuth;