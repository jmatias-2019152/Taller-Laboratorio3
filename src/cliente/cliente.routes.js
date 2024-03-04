import { Router } from "express";
import { check } from "express-validator";
import { existeEmail } from "../helpers/db-validators.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { clienteDelete, clienteGet, clientePost, clientePut } from './cliente.controller.js'
import { validarJWT } from '../middlewares/validar-jwt.js';
import Cliente from './cliente.model.js' 

const router = Router();

router.get("/get",
    validarJWT,
    clienteGet
);

router.post(
    '/post',
    [
        validarJWT,
        check('nombres', 'Los nombres son obligatorio').not().isEmpty(),
        check('apellidos', 'Los apellidos son abligatorios').not().isEmpty(),
        check('correo', 'El correo es obligatorio').custom((value) => existeEmail(value, Cliente)),
        validarCampos,
    ],

    clientePost
);

router.put(
    '/put',
    [
        validarJWT,
        check('correo', 'Necesitamos su correo para poder editar').not().isEmpty(),
        check('nombres', 'Los nuevos nombres son abligatorios').not().isEmpty(),
        validarCampos,
    ],
    clientePut
);

router.delete(
    '/delete',
    [
        validarJWT,
        check('correo', 'Necesitamos el correo para poder eliminar el usuaario').not().isEmpty(),
        validarCampos,
    ],
    clienteDelete
)

export default router;