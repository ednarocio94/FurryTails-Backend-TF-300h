// modelo/Mascota.js

import mongoose from 'mongoose';

const esquemaMascota = new mongoose.Schema({
    imagen: { type: String, required: true }, 
    nombre: { type: String, required: true },
    raza: { type: String, required: true },
    edad: { type: Number, required: true },
    propietario: { type: String, required: true },
    estaAdoptado: { type: Boolean, default: false },
});

export const ModeloMascota = mongoose.model('Mascota', esquemaMascota);
