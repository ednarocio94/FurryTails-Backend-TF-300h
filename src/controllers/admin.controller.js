// Importar dependencias y módulos necesarios
import { adminModel } from "../models/admin.model.js";
import bcrypt from "bcryptjs";

// Función asíncrona para manejar la creación de un nuevo administrador (POST)
export const createAdmin = async (req, res) => {
    try {
        // Desestructuración del cuerpo de la solicitud para obtener los datos del nuevo administrador
        const { image, fullName, email, password, role } = req.body;

        // Encriptar la contraseña antes de almacenarla en la base de datos
        const codedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo administrador en la base de datos con los datos proporcionados
        const newAdmin = await adminModel.create({
            image,
            fullName,
            email,
            password: codedPassword,
            role
        });

        // Responder con éxito si el administrador se creó correctamente
        return res.status(201).json({
            mensaje: "Administrador creado correctamente",
            datos: newAdmin
        });

    } catch (error) {
        // Manejo de errores en caso de fallos en el proceso de creación
        return res.status(400).json({
            mensaje: "Ocurrió un error al crear un Administrador",
            problema: error.message
        });
    }
};

// Función asíncrona para mostrar todos los administradores (GET)
export const showAdmin = async (req, res) => {
    try {
        // Buscar todos los administradores en la base de datos
        let admins = await adminModel.find();

        // Validación para verificar si hay administradores almacenados
        if (admins.length === 0) {
            return res.status(200).json({
                mensaje: "No hay administradores almacenados"
            });
        }

        // Responder con la lista de administradores encontrados
        return res.status(200).json({
            mensaje: "Se encontraron Administradores almacenados",
            numeroAdministradores: admins.length,
            datos: admins
        });

    } catch (error) {
        // Manejo de errores si ocurre algún problema al buscar administradores
        return res.status(400).json({
            mensaje: "Ocurrió un error al mostrar los administradores",
            problema: error.message
        });
    }
};

// Función asíncrona para eliminar un administrador por ID (DELETE)
export const deleteAdminById = async (request, response) => {
    try {
        // Obtener el ID del administrador a eliminar desde los parámetros de la solicitud
        let idForDelete = request.params.id;

        // Eliminar el administrador de la base de datos utilizando su ID
        await adminModel.findByIdAndDelete(idForDelete);

        // Responder con éxito si el administrador se eliminó correctamente
        return response.status(200).json({
            mensaje: 'Administrador eliminado exitosamente'
        });

    } catch (error) {
        // Manejo de errores si ocurre un problema al eliminar el administrador
        return response.status(400).json({
            mensaje: 'Ocurrió un error al eliminar Administrador',
            problema: error.message
        });
    }
};
