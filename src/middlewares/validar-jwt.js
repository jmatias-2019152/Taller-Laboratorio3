
import jwt from 'jsonwebtoken';

import Admin from '../administradores/administrador.model.js';


export const validarJWT = async (req, res, next) => {
    const token = global.tokenAcces;
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const admin = await Admin.findById(uid);
        if (!admin) {
            return res.status(401).json({
                msg: 'Usuario no existe en la base de datos'
            });
        }
        if (!admin.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado:false'
            });
        }
        req.admin = admin;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
}