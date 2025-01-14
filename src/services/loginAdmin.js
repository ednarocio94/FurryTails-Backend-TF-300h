// Lógica para gestionar el inicio de sesión de administradores.
// Esta lógica incluye validación de credenciales, generación de token y manejo de errores.

// Importar dependencias y módulos necesarios
// Modelo de administrador para acceder a los datos de la base
import { adminModel } from "../models/admin.model.js";
// Función personalizada para generar tokens de autenticación
import { generateToken } from "../lib/jwt.js";
// Dependencia para comparar contraseñas ingresadas con las almacenadas de forma segura
import bcrypt from "bcryptjs";

// Función principal para manejar el inicio de sesión
const loginAdmin = async (request, response) => {
    try {
        // Extraer correo y contraseña del cuerpo de la solicitud
        const { emailLogin, passwordLogin } = request.body;

        // Validación 1: Verificar si el correo existe en la base de datos
        const adminFound = await adminModel.findOne({ email: emailLogin });

        // Si no se encuentra el correo, devolver una respuesta con código 404
        if (!adminFound) {
            return response
                .status(404)
                .json({ mensaje: "Usuario no encontrado, por favor registrarse" });
        }

        // Validación 2: Comparar la contraseña ingresada con la almacenada
        const isValidPassword = await bcrypt.compare(
            passwordLogin,
            adminFound.password
        );

        // Si la contraseña no coincide, devolver una respuesta con código 401
        if (!isValidPassword) {
            return response.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // Validación 3: Generar un token de autenticación con la información del administrador
        const payload = {
            id: adminFound._id,
            name: adminFound.fullName,
            isAdmin: true
        };

        // Generar el token con la información del administrador
        const token = await generateToken(payload);

        // Responder con éxito si las credenciales son correctas y se generó el token
        return response.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            tokenGenerado: token, // NOTA: En producción, evita exponer el token directamente.
        });
    } catch (error) {
        // Manejo de errores en caso de fallos en el inicio de sesión
        return response.status(400).json({
            mensaje: "Hubo un error al iniciar sesión",
            error: error.message || error,
        });
    }
};

// Exportar la función para que esté disponible en otros módulos
export default loginAdmin;
