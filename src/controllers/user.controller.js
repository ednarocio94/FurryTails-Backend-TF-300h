// Controladores para manejar las peticiones HTTP de usuarios (POST, GET, PUT, DELETE)
import { userModel } from "../models/user.model.js"; // Importación del modelo de usuario
import bcrypt from "bcryptjs"; // Dependencia para encriptación de contraseñas

// Función para crear un nuevo usuario (POST)
export const createUser = async (req, res) => {
    try {
        // Desestructuración del cuerpo de la petición para obtener los datos del usuario
        const { image, fullName, email, password, role, phone, isAdult, address, preferences } = req.body;

        // Encriptación de la contraseña antes de guardarla
        const codedPassword = await bcrypt.hash(password, 10);

        // Creación del nuevo usuario en la base de datos
        const newUser = await userModel.create({
            image,
            fullName,
            email,
            password: codedPassword,
            role,
            phone,
            isAdult,
            address,
            preferences
        });

        // Respuesta exitosa con el nuevo usuario creado
        return res.status(201).json({
            mensaje: "Usuario creado correctamente",
            datos: newUser
        });

    } catch (error) {
        // Manejo de errores en caso de fallar al crear el usuario
        return res.status(400).json({
            mensaje: "Ocurrió un error al crear un usuario",
            problema: error.message
        });
    }
};

// Función para mostrar todos los usuarios (GET)
export const showUsers = async (req, res) => {
    try {
        // Buscar todos los usuarios en la base de datos
        let users = await userModel.find();

        // Si no se encuentran usuarios, se responde con un mensaje adecuado
        if (users.length === 0) {
            return res.status(200).json({
                mensaje: "No hay usuarios almacenados"
            });
        }

        // Responder con la lista de usuarios encontrados
        return res.status(200).json({
            mensaje: "Se encontraron usuarios almacenados",
            numeroUsuarios: users.length,
            datos: users
        });

    } catch (error) {
        // Manejo de errores si algo sale mal al consultar los usuarios
        return res.status(400).json({
            mensaje: "Ocurrió un error al mostrar los usuarios",
            problema: error || error.message
        });
    }
};

// Función para actualizar un usuario por su ID (PUT)
export const putUserById = async (request, response) => {
    try {
        // Obtener el ID del usuario a actualizar desde los parámetros de la petición
        let idForPut = request.params.id;
        let dataForUpdate = request.body; // Información nueva a actualizar

        // Actualizar el usuario con el ID y la nueva información
        const userUpdated = await userModel.findByIdAndUpdate(idForPut, dataForUpdate);

        // Validar si el usuario no fue encontrado o no se pudo actualizar
        if (!userUpdated) {
            return response.status(404).json({
                mensaje: 'No se encontró usuario para actualizar'
            });
        }

        // Responder con el usuario actualizado
        return response.status(200).json({
            mensaje: 'Usuario actualizado correctamente',
            datos: userUpdated
        });

    } catch (error) {
        // Manejo de errores si algo falla al actualizar el usuario
        return response.status(400).json({
            mensaje: 'Ocurrió un error al actualizar el usuario',
            problema: error || error.message
        });
    }
};

// Función para eliminar un usuario por su ID (DELETE)
export const deleteUserById = async (request, response) => {
    try {
        // Obtener el ID del usuario a eliminar desde los parámetros de la petición
        let idForDelete = request.params.id;

        // Eliminar el usuario con el ID especificado
        await userModel.findByIdAndDelete(idForDelete);

        // Responder indicando que el usuario fue eliminado exitosamente
        return response.status(200).json({
            mensaje: 'Usuario eliminado exitosamente'
        });

    } catch (error) {
        // Manejo de errores si algo falla al eliminar el usuario
        return response.status(400).json({
            mensaje: 'Ocurrió un error al eliminar el usuario',
            problema: error.message
        });
    }
};
