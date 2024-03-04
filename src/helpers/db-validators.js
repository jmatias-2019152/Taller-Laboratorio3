import Admin from "../administradores/administrador.model.js";

export const existeEmail = async (correo = '') => {
    const existeEmail = await Admin.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}