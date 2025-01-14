// importar dependencias y módulos 
import loginAdmin from "../services/loginAdmin.js";
import express from "express";

// 2. configurar nuestro router de express
const loginAdminRouter = express.Router();

// 3. creamos la ruta -> crear un inicio de sesión 
// GET -> mostar, leer. obtener
// POST -> Crear
// PUT -> actualizar 
// DELETE -> Eliminar 

loginAdminRouter.post("/", loginAdmin);

export default loginAdminRouter;
// Le indico las rutas que se deben utilizar 

