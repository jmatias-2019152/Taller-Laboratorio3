import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false 
});
export default mongoose.model('Cliente', ClienteSchema);