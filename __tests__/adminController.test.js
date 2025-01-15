import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { adminModel } from "../src/models/admin.model.js";

describe('Pruebas de los controladores de Administradores', () => {
    // Limpiar la base de datos antes de cada prueba
    beforeEach(async () => {
        await adminModel.deleteMany({});
    });

    // Cierra la conexión a la base de datos después de las pruebas
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Datos de prueba genéricos
    const testAdmin = {
        image: "http://example.com/image.jpg",
        fullName: "Admin de Prueba",
        email: "testadmin@example.com",
        password: "password123",
        role: "Admin"
    };

    // Pruebas para la ruta POST /crear
    describe('Pruebas POST /crear', () => {
        it('Debería crear un administrador correctamente', async () => {
            const res = await supertest(app).post('/admin/crear').send(testAdmin);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('mensaje', 'Administrador creado correctamente');
        });

        it('Debería devolver un error si falta un campo obligatorio', async () => {
            const { email, ...invalidAdmin } = testAdmin; // Elimina el campo email
            const res = await supertest(app).post('/admin/crear').send(invalidAdmin);
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('mensaje', 'Ocurrió un error al crear un Administrador');
        });
    });

    // Pruebas para la ruta GET /
    describe('Pruebas GET / Admin', () => {
        it('Debería indicar que no hay administradores almacenados', async () => {
            const res = await supertest(app).get('/admin/');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('mensaje', 'No hay administradores almacenados');
        });

        it('Debería retornar todos los administradores almacenados', async () => {
            await adminModel.create(testAdmin); // Crea un administrador
            const res = await supertest(app).get('/admin/');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('mensaje', 'Se encontraron Administradores almacenados');
        });
    });

    // Pruebas para la ruta DELETE /eliminar/:id
    describe('Pruebas DELETE /eliminar/:id', () => {
        it('Debería eliminar un administrador existente correctamente', async () => {
            const createdAdmin = await adminModel.create(testAdmin); // Crea un administrador
            const res = await supertest(app)
                .delete(`/admin/eliminar/${createdAdmin._id}`)
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('mensaje', 'Administrador eliminado exitosamente');
        });

        it('Debería devolver un error si el administrador no existe', async () => {
            const res = await supertest(app).delete('/admin/eliminar/invalidID');
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('mensaje', 'Ocurrió un error al eliminar Administrador');
        });
    });
});