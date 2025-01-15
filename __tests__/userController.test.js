
import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { userModel } from "../src/models/user.model.js";

describe('Pruebas de los controladores de los usuarios', () => {

    beforeEach(async () => {
        // Limpia la base de datos antes de cada prueba
        await userModel.deleteMany({});
    });

    afterAll(async () => {
        // Cierra la conexión a la base de datos después de las pruebas
        await mongoose.connection.close();
    });

    // Datos de prueba genéricos
    const testUser = {
        fullName: "Usuario de Prueba33333",
        email: "test333user@example.com",
        password: "password123333",
        phone: "1234567890",
        isAdult: "true",
        address: "Calle Falsa 123"
    };

    // Peticion POST
    describe('Pruebas POST /crear', () => {
        it('Debería crear un usuario correctamente', async () => {
            const res = await supertest(app).post('/usuarios/crear').send(testUser);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('mensaje', 'Usuario creado correctamente');
            expect(res.body.datos).toHaveProperty('email', testUser.email);
        });

        it('Debería devolver un error si falta un campo obligatorio', async () => {
            const { fullName, ...invalidUser } = testUser; // Elimina el campo fullName
            const res = await supertest(app).post('/usuarios/crear').send(invalidUser);
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('mensaje', 'Ocurrió un error al crear un usuario');
        });
    });
    // Peticion GET
    describe('Pueba GET / User', () => {
        it('Deberia indicar que no hay usuarios almacenados', async () => {
            const res = await supertest(app).get('/usuarios/obtener');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('mensaje', 'No hay usuarios almacenados');
        });
    });    

    // Peticion PUT
    describe('Pruebas PUT /actualizar/:id', () => {
        it('Debería actualizar un usuario existente correctamente', async () => {
            const createdUser = await userModel.create(testUser); // Crea un usuario
            const updatedData = { fullName: "Usuario Actualizado" };
            //const token = await getAuthToken();  // Obtén el token

            const res = await supertest(app)
                .put(`/usuarios/actualizar/${createdUser._id}`)
                //.set('Authorization', `Bearer ${token}`)  // Agrega el token en la cabecera
                .send(updatedData);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('mensaje', 'Usuario actualizado correctamente');
        });
    });
    // Peticion DELETE
    describe('Pruebas DELETE /eliminar/:id', () => {
        it('Debería eliminar un usuario existente correctamente', async () => {
            const createdUser = await userModel.create(testUser); // Crea un usuario

            const res = await supertest(app)
                .delete(`/usuarios/eliminar/${createdUser._id}`)
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('mensaje', 'Usuario eliminado exitosamente');
        });
    });
});