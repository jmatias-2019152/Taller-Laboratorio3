import mongoose from 'mongoose'

const EmpresaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    impacto: {
        type: String, 
        uppercase: true,
        enum: ['NEGATIVO', 'POSITIVO', 'CONTINUO', 'PERIODICO', 'REVERSIBLE', 'IRREVERSIBLE'],
        requerid: true
    },
    descripcion: {
        type: String,
        requerid: true
    },
    añosDT: {
        type: Number,
        requerid: true
    },
    estado:{
        type: Boolean,
        default: true
    }
},{
    versionKey: false
})

export default mongoose.model('Empresa', EmpresaSchema)