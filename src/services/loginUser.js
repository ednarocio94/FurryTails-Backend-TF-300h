// Este archivo contiene la lógica para gestionar los inicios de sesión de los usuarios.
// Nota: Esta lógica puede variar dependiendo de los requerimientos del proyecto.

// Importar dependencias y módulos necesarios
import { userModel } from "../models/user.model.js"; // Modelo para interactuar con la base de datos.
import { generateToken } from "../lib/jwt.js"; // Función para generar tokens JWT.
import bcrypt from "bcryptjs"; // Biblioteca para comparar contraseñas encriptadas.

// Función para gestionar el inicio de sesión
const loginUser = async (request, response) => {
    try {
        // Extraer email y contraseña del cuerpo de la solicitud
        const { emailLogin, passwordLogin } = request.body;

        // Validación 1: Verificar si el correo existe en la base de datos
        const userFound = await userModel.findOne({ email: emailLogin });
        if (!userFound) {
            return response.status(404).json({ mensaje: "Usuario no encontrado, por favor registrarse" });
        }

        // Validación 2: Comparar la contraseña ingresada con la almacenada en la base de datos
        const isValidPassword = await bcrypt.compare(passwordLogin, userFound.password);
        if (!isValidPassword) {
            return response.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // Validación 3: Generar un token con la información del usuario
        const payload = {
            id: userFound._id,
            name: userFound.fullName,
        };
        const token = await generateToken(payload);

        // Respuesta exitosa con token generado (solo para pruebas, evitar en producción)
        return response.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            tokenGenerado: token, // Nota: Exponer el token puede ser inseguro en producción.
        });
    } catch (error) {
        // Manejo de errores durante el proceso de inicio de sesión
        return response.status(400).json({
            mensaje: "Hubo un error al iniciar sesión",
            error: error.message || error,
        });
    }
};

// Exportar la función
export default loginUser;
