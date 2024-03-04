import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'ADMIN',
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false 
});
export default mongoose.model('Admin', AdminSchema);