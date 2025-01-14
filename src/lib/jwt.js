// Importar los módulos y dependencias necesarios para trabajar con JWT y variables de entorno
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Configurar la clave secreta a partir de las variables de entorno (.env)
const key = process.env.SECRET_KEY;
console.log(key);

// Función para generar un token JWT
// El payload contiene la información del usuario que se va a incluir en el token
export function generateToken(payload) {
    // Retornar una promesa que generará el token JWT
    return new Promise((resolve, reject) => {
        // Usamos jwt.sign para crear el token, con un tiempo de expiración de 1 hora
        jwt.sign(payload, key, { expiresIn: '1h' }, (error, token) => {
            if (error) {
                // Si ocurre un error durante la generación del token, rechazamos la promesa
                reject(new Error('Error al generar JWT ' + error.message));
            } else {
                // Si el token se genera correctamente, resolvemos la promesa con el token
                resolve(token);
            }
        });
    });
}

// Función para verificar un token JWT
// Verificamos que el token sea válido y no haya sido alterado
export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        // Usamos jwt.verify para validar el token con la clave secreta
        jwt.verify(token, key, (error, decoded) => {
            if (error) {
                // Si ocurre un error al verificar el token, rechazamos la promesa
                reject(new Error('Error al verificar JWT ' + error.message));
            } else {
                // Si el token es válido, resolvemos la promesa con los datos decodificados
                resolve(decoded);
            }
        });
    });
}
