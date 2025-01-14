// Importación de servicio de inicio de sesión y módulo express
import loginUser from "../services/loginUser.js";
import express from "express";

// Inicialización del router de Express para las rutas de login
const loginUserRouter = express.Router();

// Definición de la ruta POST para el inicio de sesión
// Esta ruta recibirá los datos de login y procesará la autenticación
loginUserRouter.post("/", loginUser);

// Exportación del router de login para ser utilizado en otros módulos
export default loginUserRouter;
