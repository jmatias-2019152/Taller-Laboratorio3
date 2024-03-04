import { Schema, model } from "mongoose";

const clienteSchema = Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    correo: {
        type: Number,
        required: true
    }
}, {
    versionKey: false 
});
export default model('Cliente', clienteSchema);