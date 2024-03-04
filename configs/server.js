import express from 'express';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import administradorRoutes from '../src/administradores/administrador.routes.js';
import clienteRoutes from '../src/cliente/cliente.routes.js';
import empresaRoutes from '../src/empresa/empresa.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/gestorEmpresa/v1/admin';
        this.clientePath = '/gestorEmpresa/v1/cliente';
        this.empresaPath = '/gestorEmpresa/v1/empresa';
        this.conectarDB(); 
        this.middlewares();
        this.routes();
        global.sesion = "";
    }

    async conectarDB() {
        await dbConnection();
    }

    
    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

   
    routes() {
        this.app.use(this.adminPath, administradorRoutes);
        this.app.use(this.clientePath, clienteRoutes);
        this.app.use(this.empresaPath, empresaRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;