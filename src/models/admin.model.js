// 1. Importamos dependencias
import mongoose from "mongoose";

// 2. Creamos el esquema de datos para los administradores
const adminSchema = new mongoose.Schema({
    image: {type: String},
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'Admin' } // El rol siempre será Admin
}, { timestamps: true }); // Agrega createdAt y updatedAt automáticamente

// 3. Definimos el modelo
export const adminModel = mongoose.model('admin', adminSchema);