// routes/MascotaRoutes.js

import express from 'express';
import { 
    crearMascota, 
    obtenerMascotas, 
    obtenerMascotaPorId, 
    actualizarMascota, 
    eliminarMascota 
} from '../controllers/mascotas.controller.js';
import auth from '../middleware/auth.js';

const petsrouter = express.Router();

petsrouter.post('/', crearMascota);
petsrouter.get('/', obtenerMascotas);
petsrouter.get('/:id', obtenerMascotaPorId);
petsrouter.put('/:id', auth("admin"), actualizarMascota);
petsrouter.delete('/:id', auth("admin"), eliminarMascota);

export default petsrouter;
