import { Router } from "express";
import { check } from "express-validator";
import { login, register, adminGet } from "./administrador.controller.js";
import { existeEmail } from "../helpers/db-validators.js"
import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();


router.post(
    '/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'Este correo ya existe').custom(existeEmail),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    register
);

router.get("/", adminGet);

router.get(
    '/login',
    [

    ],
    login
)

export default router;