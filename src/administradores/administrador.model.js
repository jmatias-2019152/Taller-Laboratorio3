import { Schema, model } from "mongoose";

const AdminSchema = Schema({
    name: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    rol: {
        type: String,
        default: 'ADMIN',
    }
}, {
    versionKey: false 
});
export default model('Admin', AdminSchema);