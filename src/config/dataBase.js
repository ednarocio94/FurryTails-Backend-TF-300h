// Importar la librería mongoose para conectar con la base de datos MongoDB
import mongoose from 'mongoose';

// Función asincrónica para conectar a la base de datos MongoDB
export async function connectionMongo(){
    // Intentar establecer la conexión con la base de datos
    try{
        // Conectar a MongoDB usando la URL almacenada en las variables de entorno
        await mongoose.connect(process.env.DB_URL, {});
        // Si la conexión es exitosa, mostrar mensaje de éxito
        console.log('Conexión exitosa con la base de datos');
    }catch(error){
        // Si ocurre un error durante la conexión, capturarlo y mostrar un mensaje de error
        console.error('Error de conexión: ' + error);
    }
} 
