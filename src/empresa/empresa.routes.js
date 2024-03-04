import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { empresaPost, empresaGet, empresaPut, getEmpresaPorAños, getEmpresaPorCategoria, getEmpresasZA, getEmpresasAZ, generarExcel } from './empresa.controller.js'
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get("/get",
    validarJWT,

    empresaGet
);

router.get("/trayectoria",
    validarJWT,
    [
        check('añosDT', 'Los aÑos de trayectoria son obligarotios').not().isEmpty()
    ],
    
    getEmpresaPorAños
);
 
router.get("/categoria",
    validarJWT,
    [
        check('impacto', 'El impacto es abligatorio').not().isEmpty(),
    ],
    getEmpresaPorCategoria
);

router.get("/az",
    validarJWT,
    getEmpresasAZ
);

router.get("/za",
    validarJWT,
    getEmpresasZA
);

router.get("/excel",
    validarJWT,
    generarExcel
);

router.post(
    '/post',
    [
        validarJWT,
        check('nombre', 'Los nombres son obligatorio').not().isEmpty(),
        check('impacto', 'El impacto es abligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('añosDT', 'Los aÑos de trayectoria son obligarotios').not().isEmpty(),
        validarCampos,
    ],

    empresaPost
);

router.put(
    '/put',
    [
        validarJWT,
        check('nombre', 'Necesitamos el nombre de la empresa para poder editar').not().isEmpty(),
        check('añosDT', 'Los nuevos años son abligatorios').not().isEmpty(),
        validarCampos,
    ],
    empresaPut
);


export default router;