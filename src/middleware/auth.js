// Importar la función para verificar el token JWT
import { verifyToken } from "../lib/jwt.js";

// Crear el middleware de autenticación
// Este middleware se encarga de verificar el token y validar el rol del usuario
function auth (requiredRol) { 
    return async (request, response, next) => {
        // 1. Verificar si existe un token en los encabezados de la solicitud
        let token = request.headers["authorization"];
        console.log("Token obtenido de la cabecera: " + token);
        
        // Si no existe el token, se retorna un error 401
        if (!token) {
            return response.status(401).json({
                mensaje: "No se encontró token, por favor proporcione uno."
            });
        }

        // 2. Extraer el token del formato "Bearer token"
        token = token.split(" ")[1]; // Eliminar el "Bearer" y dejar solo el token
        console.log("Token después de separarlo del Bearer: " + token);

        // 3. Verificar la validez del token
        try {
            // Decodificar el token para obtener los datos del usuario
            const decoded = await verifyToken(token);
            console.log("Token decodificado: ", decoded);

            // 4. Validar el rol del usuario
            // Si se requiere un rol "admin" y el token no pertenece a un administrador, se niega el acceso
            if (requiredRol === "admin" && !decoded.isAdmin) {
                return response.status(401).json({
                    mensaje: "Acceso no permitido. Se requiere rol de administrador."
                });
            }

            // 5. Guardar la información decodificada en la solicitud para acceder a ella en siguientes pasos
            request.user = decoded;

        } catch (error) {
            // Si la verificación del token falla, se retorna un error 400
            return response.status(400).json({
                mensaje: "Falló la autenticación del token",
                problema: error.message || error
            });
        }

        // 6. Si todo está correcto, continuar con el siguiente middleware o controlador
        next();
    }
}

// Exportar el middleware para su uso en otras partes de la aplicación
export default auth;
