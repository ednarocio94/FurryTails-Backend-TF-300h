import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { ModeloMascota } from "../src/models/mascotas.model.js";

describe('Pruebas de los controladores de las mascotas', () => {

    beforeEach(async () => {
        // Limpia la base de datos antes de cada prueba
        await ModeloMascota.deleteMany({});
    });

    afterAll(async () => {
        // Cierra la conexión a la base de datos después de las pruebas
        await mongoose.connection.close();
    });

    // Datos de prueba genéricos
    const testPet = {
        imagen: "http://example.com/imagen.jpg",
        nombre: "Fido",
        raza: "Labrador",
        edad: 3,
        propietario: "Juan Pérez",
        estaAdoptado: false
    };

    // Pruebas POST
    describe('Pruebas POST /mascotas', () => {
        it('Debería crear una mascota correctamente', async () => {
            const res = await supertest(app).post('/mascotas').send(testPet);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('mensaje', 'Mascota se agregó exitosamente');
            expect(res.body.mascota).toHaveProperty('nombre', testPet.nombre);
        });

        it('Debería devolver un error si falta un campo obligatorio', async () => {
            const { nombre, ...invalidPet } = testPet; // Elimina el campo nombre
            const res = await supertest(app).post('/mascotas').send(invalidPet);
            expect(res.statusCode).toBe(500);
            expect(res.body).toHaveProperty('mensaje');
        });
    });

    // Pruebas GET
    describe('Pruebas GET /mascotas', () => {
        it('Debería obtener una lista vacía si no hay mascotas almacenadas', async () => {
            const res = await supertest(app).get('/mascotas');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('mensaje', 'Mascotas obtenidas exitosamente');
            expect(res.body.mascotas).toEqual([]);
        });

        it('Debería obtener una lista de mascotas almacenadas', async () => {
            await ModeloMascota.create(testPet);
            const res = await supertest(app).get('/mascotas');
            expect(res.statusCode).toBe(200);
            expect(res.body.mascotas).toHaveLength(1);
        });
    });

    // Pruebas PUT
    describe('Pruebas PUT /mascotas/:id', () => {
        it('Debería actualizar una mascota existente correctamente', async () => {
            const createdPet = await ModeloMascota.create(testPet); // Crea una mascota
            const updatedData = { nombre: "Rex" };

            const res = await supertest(app).put(`/mascotas/${createdPet._id}`).send(updatedData);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('mensaje', 'Mascota actualizada exitosamente');
            expect(res.body.mascota).toHaveProperty('nombre', 'Rex');
        });

        it('Debería devolver un error si la mascota no existe', async () => {
            const res = await supertest(app).put('/mascotas/64b9f30b8c39b1f2faad4f0c').send({ nombre: "Nuevo Nombre" });
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('mensaje', 'Mascota no encontrada');
        });
    });

    // Pruebas DELETE
    describe('Pruebas DELETE /mascotas/:id', () => {
        it('Debería eliminar una mascota existente correctamente', async () => {
            const createdPet = await ModeloMascota.create(testPet); // Crea una mascota

            const res = await supertest(app).delete(`/mascotas/${createdPet._id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('mensaje', 'Mascota eliminada correctamente');
        });

        it('Debería devolver un error si la mascota no existe', async () => {
            const res = await supertest(app).delete('/mascotas/64b9f30b8c39b1f2faad4f0c');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('mensaje', 'Mascota no encontrada');
        });
    });
});