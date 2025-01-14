// controllers/MascotaController.js

import { ModeloMascota } from "../models/mascotas.model.js";

// Crear una nueva mascota en la base de datos
export const crearMascota = async (req, res) => {
    try {
        const nuevaMascota = new ModeloMascota(req.body); // Crear una instancia del modelo con los datos proporcionados
        const mascotaGuardada = await nuevaMascota.save(); // Guardar la nueva mascota en la base de datos
        return res.status(201).json({ mensaje: "Mascota se agregó exitosamente", mascota: mascotaGuardada });
    } catch (error) {
        return res.status(500).json({ mensaje: error.message }); // Manejar errores durante la creación
    }
};

// Obtener todas las mascotas almacenadas en la base de datos
export const obtenerMascotas = async (req, res) => {
    try {
        const mascotas = await ModeloMascota.find(); // Obtener todas las mascotas del modelo
        return res.status(200).json({ mensaje: "Mascotas obtenidas exitosamente", mascotas });
    } catch (error) {
        return res.status(500).json({ mensaje: error.message }); // Manejar errores al obtener las mascotas
    }
};

// Obtener una mascota específica usando su ID
export const obtenerMascotaPorId = async (req, res) => {
    try {
        const mascota = await ModeloMascota.findById(req.params.id); // Buscar mascota por ID en la base de datos
        if (!mascota) return res.status(404).json({ mensaje: "Mascota no encontrada" }); // Validar si la mascota existe
        return res.status(200).json({ mensaje: "Mascota obtenida exitosamente", mascota });
    } catch (error) {
        return res.status(500).json({ mensaje: error.message }); // Manejar errores durante la búsqueda
    }
};

// Actualizar los datos de una mascota utilizando su ID
export const actualizarMascota = async (req, res) => {
    try {
        const mascotaActualizada = await ModeloMascota.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Actualizar los datos de la mascota por su ID
        if (!mascotaActualizada) return res.status(404).json({ mensaje: "Mascota no encontrada" }); // Validar si la mascota existe
        return res.status(200).json({ mensaje: "Mascota actualizada exitosamente", mascota: mascotaActualizada });
    } catch (error) {
        return res.status(500).json({ mensaje: error.message }); // Manejar errores durante la actualización
    }
};

// Eliminar una mascota de la base de datos usando su ID
export const eliminarMascota = async (req, res) => {
    try {
        const mascotaEliminada = await ModeloMascota.findByIdAndDelete(req.params.id); // Eliminar la mascota por su ID
        if (!mascotaEliminada) return res.status(404).json({ mensaje: "Mascota no encontrada" }); // Validar si la mascota existe
        return res.status(200).json({ mensaje: "Mascota eliminada correctamente" });
    } catch (error) {
        return res.status(500).json({ mensaje: error.message }); // Manejar errores durante la eliminación
    }
};
