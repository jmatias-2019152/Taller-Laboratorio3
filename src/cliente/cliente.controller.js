import Cliente from "./cliente.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const clientePost = async (req, res) => {
    const { nombres, apellidos, correo } = req.body;
    const cliente = new Cliente({ nombres, apellidos, correo });
    await cliente.save();

    res.status(200).json({
        cliente
    });
};

export const clienteGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, cliente] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cliente
    });
};


export const clientePut = async (req, res) => {
    const { correo, nombres } = req.body;
    try {
        const cliente = await Cliente.findOne({ correo });
        if (!cliente || cliente.estado === false) {
            return res.status(404).json({ msg: "Cliente no encontrado o no activo" });
        }
        const clienteActualizado = await Cliente.findOneAndUpdate({ correo, estado: true }, { nombres }, { new: true });
        if (!clienteActualizado) {
            return res.status(404).json({ msg: "Cliente no encontrado o no activo" });
        }
        res.status(200).json({
            msg: "Los datos han sido actualizados",
            cliente: clienteActualizado
        });
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export const clienteDelete = async (req, res) => {
    const { correo } = req.body;
    
    try {
        const clienteActualizado = await Cliente.findOneAndUpdate({ correo, estado: true },{ estado: false }, { new: true }            
        );
        if (!clienteActualizado) {
            return res.status(404).json({ msg: "Cliente no encontrado o no activo" });
        }

        res.status(200).json({
            msg: "El cliente ha sido desactivado exitosamente",
            cliente: clienteActualizado
        });
    } catch (error) {
        console.error('Error al desactivar el cliente:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};
