import Empresa from './empresa.model.js'
import ExcelJS from 'exceljs';


export const empresaPost = async (req, res) => {
    const { nombre, impacto, descripcion, añosDT } = req.body;
    const empresa = new Empresa({ nombre, impacto, descripcion, añosDT });
    await empresa.save();

    res.status(200).json({
        empresa
    });
};


export const empresaGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, empresa] = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        empresa
    });
};


export const empresaPut = async (req, res) => {
    const { nombre, añosDT } = req.body;
    try {
        const empresa = await Empresa.findOne({ nombre });
        const empresaActu = await Empresa.findOneAndUpdate({ nombre, estado: true }, { añosDT }, { new: true });
        if (!empresaActu) {
            return res.status(404).json({ msg: "Empresa no encontrado o no activo" });
        }
        res.status(200).json({
            msg: "Los datos han sido actualizados",
            empresa: empresaActu
        });
    } catch (error) {
        console.error('Error al actualizar la empresa:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export const getEmpresaPorAños = async (req, res) => {
    try {
        const { añosDT } = req.body;
        const empresas = await Empresa.find({ añosDT: añosDT });
        return res.send({ message: 'Empresas encontradas:', empresas });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al obtener empresas' });
    }
};

export const getEmpresaPorCategoria = async (req, res) => {
    try {
        const { impacto } = req.body;
        const empresas = await Empresa.find({ impacto: impacto });
        return res.send({ message: 'Empresas encontradas:', empresas });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al obtener empresas' });
    }
};

export const getEmpresasAZ = async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ nombre: 1 }).exec();
        return res.send({ message: 'Empresas encontradas (A-Z):', empresas });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al obtener empresas' });
    }
};

export const getEmpresasZA = async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ nombre: -1 }).exec();
        return res.send({ message: 'Empresas encontradas (Z-A):', empresas });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al obtener empresas' });
    }
};

export const generarExcel = async (req, res) => {
    try {
        const empresas = await Empresa.find();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombre', width: 20 },
            { header: 'Impacto', key: 'impacto', width: 20 },
            { header: 'Descripción', key: 'descripcion', width: 30 },
            { header: 'Años de Trayectoria', key: 'añosDT', width: 15 },
            { header: 'Estado', key: 'estado', width: 10 },
        ];
        empresas.forEach((empresa) => {
            worksheet.addRow({
                nombre: empresa.nombre,
                impacto: empresa.impacto,
                descripcion: empresa.descripcion,
                añosDT: empresa.añosDT,
                estado: empresa.estado ? 'Activa' : 'Inactiva',
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_empresas.xlsx');

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al generar el reporte en formato Excel' });
    }
};