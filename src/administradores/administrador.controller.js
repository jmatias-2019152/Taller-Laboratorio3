import Admin from "./administrador.model.js";
import { generarJWT } from "../helpers/generate-jwt.js"
import bcryptjs from "bcryptjs"
 

export const register = async (req, res) => {
    const { name, correo, password } = req.body;
    const admin = new Admin({ name, correo, password });

    
    await admin.save();

    res.status(200).json({
        admin,
    });
}

export const login = async (req, res) => {
    const { correo, password } = req.body;

  try {
    const admin = await Admin.findOne({ correo });

    if (!admin) {
      return res.status(400).json({
        msg: "Credenciales incorrectas, Correo no existe en la base de datos",
      });
    }
    if (!admin.estado) {
      return res.status(400).json({
        msg: "El usuario no existe en la base de datos",
      });
    }
    
    if (admin) {
        const token = await generarJWT(admin._id);
        global.tokenAcces = token;

        return res.status(200).json({
            msg:
                `------------------- BIENVENIDO -------------------
                 ------------------ Token Creado ------------------`,
            token
        });
    }


  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Comuniquese con el administrador",
    });
  }
}

export const adminGet = async (req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, admin] = await Promise.all([
        Admin.countDocuments(query),
        Admin.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        admin
    });
}