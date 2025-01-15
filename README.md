Pruebas Unitarias del Backend - Página de Adopción de Mascotas ✨

Bienvenido al sistema backend para la página de adopción de mascotas 🐶🐈. Este proyecto está diseñado para garantizar la calidad y funcionalidad del backend mediante pruebas unitarias con Jest y Babel. Con este enfoque, aseguramos que los controladores y rutas trabajen perfectamente para los usuarios, administradores y mascotas.

📊 Tecnologías Utilizadas

Node.js - Entorno de ejecución para JavaScript.

Express.js - Framework web para crear APIs.

Mongoose - ODM para gestionar MongoDB.

Jest - Framework para pruebas unitarias.

Supertest - Herramienta para probar APIs.

Babel - Transpilador para compatibilidad de código moderno.

📄 Configuración Inicial

🔧 Instalación de Dependencias

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

npm install

🔧 Configuración de Babel

Asegúrate de tener el archivo .babelrc configurado de la siguiente manera:

{
  "presets": ["@babel/preset-env"]
}

🔧 Configuración de Jest

En el archivo package.json, incluye el script de pruebas:

"scripts": {
  "test": "jest"
}

🗂 Estructura de Carpetas

El proyecto está organizado de la siguiente manera:

├── src
│   ├── controllers
│   │   ├── admin.controller.js
│   │   ├── user.controller.js
│   │   └── pet.controller.js
│   ├── models
│   │   ├── admin.model.js
│   │   ├── user.model.js
│   │   └── pet.model.js
│   └── routes
│       ├── admin.routes.js
│       ├── user.routes.js
│       └── pet.routes.js
├── __tests__
│   ├── adminController.test.js
│   ├── userController.test.js
│   └── petController.test.js
└── package.json

🔢 Descripción de las Pruebas

👤 Pruebas para Usuarios

⚙️ Rutas Probadas

POST /usuarios/crear: Crea un nuevo usuario.

GET /usuarios: Obtiene todos los usuarios registrados.

PUT /usuarios/actualizar/:id: Actualiza un usuario existente.

DELETE /usuarios/eliminar/:id: Elimina un usuario registrado.

🔖 Ejemplo de Prueba Usuarios

Archivo: __tests__/userController.test.js

import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { userModel } from "../src/models/user.model.js";

describe('Pruebas de los controladores de usuarios', () => {

    beforeEach(async () => {
        await userModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Debería crear un usuario correctamente', async () => {
        const res = await supertest(app).post('/usuarios/crear').send({
            fullName: "Usuario Test",
            email: "test@example.com",
            password: "password123",
            phone: "1234567890",
            isAdult: true,
            address: "Calle Falsa 123"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('mensaje', 'Usuario creado correctamente');
    });
});
![PRUEBA DE USUARIO](https://cdn.discordapp.com/attachments/1328487002794098889/1328885908509954100/image.png?ex=678854f2&is=67870372&hm=1a1dd06b91e77a64cce6a3e47d82d72d1c937cd1bea7bd75439394abf38aee95&)


🔒 Pruebas para Administradores

⚙️ Rutas Probadas

POST /admin/crear: Crea un nuevo administrador.

GET /admin: Obtiene todos los administradores registrados.

DELETE /admin/eliminar/:id: Elimina un administrador registrado.

🔖 Ejemplo de Prueba

Archivo: __tests__/adminController.test.js

it('Debería obtener todos los administradores almacenados', async () => {
    const res = await supertest(app).get('/admin');
    expect(res.statusCode).toBe(200);
    expect(res.body.admins).toBeInstanceOf(Array);
});

![PRUEBA DE ADMIN](https://cdn.discordapp.com/attachments/1328487002794098889/1328897025265106996/image.png?ex=67885f4c&is=67870dcc&hm=0ff20724cf050edefb5042afc93092c39ceccedcabaa15946e2825b1e410f8d3&)

🐾 Pruebas para Mascotas

⚙️ Rutas Probadas

POST /mascotas/crear: Registra una nueva mascota para adopción.

GET /mascotas: Obtiene todas las mascotas disponibles.

PUT /mascotas/actualizar/:id: Actualiza la información de una mascota.

DELETE /mascotas/eliminar/:id: Elimina una mascota registrada.

🔖 Ejemplo de Prueba

Archivo: __tests__/petController.test.js

it('Debería registrar una nueva mascota correctamente', async () => {
    const res = await supertest(app).post('/mascotas/crear').send({
        name: "Firulais",
        age: 3,
        breed: "Labrador",
        description: "Un perro muy amigable",
        adopted: false
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('mensaje', 'Mascota registrada correctamente');
});

![PRUEBA DE MASCOTAS](https://cdn.discordapp.com/attachments/1328487002794098889/1328902489503698944/image.png?ex=67886463&is=678712e3&hm=70514c4cb971261a36648287dfa838677d7eeeb32d769c38a4d80da41fdd433d&)

🔄 Ejecución de las Pruebas

Ejecuta todas las pruebas unitarias con el siguiente comando:

npm run test

🎓 Notas Adicionales

Asegúrate de que la base de datos esté conectada correctamente antes de ejecutar las pruebas.

Todas las pruebas limpian los datos existentes para garantizar un entorno controlado.

Si encuentras algún problema o tienes ideas para mejorar, no dudes en contribuir ✨.

🌟 Gracias por confiar en este proyecto! Juntos haremos del mundo un lugar mejor para las mascotas 🐶🐈.