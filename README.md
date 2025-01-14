

                             🐾 Proyecto de Adopción de Mascotas
Un sistema web diseñado para conectar a personas interesadas en adoptar mascotas. Este proyecto simplifica y optimiza el proceso de adopción al gestionar perfiles de mascotas, solicitudes de adopción y usuarios, asegurando una experiencia amigable y eficiente.

📄 Estructura del Proyecto
El repositorio está organizado de la siguiente manera:


/backend  
│  
├── src  
│   ├── controllers       # Controladores para la lógica de negocio.  
│   ├── lib               # Librerías personalizadas.  
│   ├── middleware        # Middleware para autenticación y validación.  
│   ├── models            # Modelos de datos (Mongoose).  
│   ├── routes            # Definición de rutas de la API REST.  
│   ├── services          # Servicios auxiliares.  
│  
├── .env                  # Configuración de variables de entorno.  
├── .gitignore            # Archivos y carpetas ignoradas por Git.  
├── app.js                # Configuración principal del servidor.  
├── package.json          # Dependencias y configuración del proyecto.  
├── package-lock.json     # Detalles de versiones bloqueadas.  
└── README.md             # Documentación del proyecto.  

🚀 Tecnologías Utilizadas
Node.js: Entorno para ejecutar el backend.
Express.js: Framework para la construcción de aplicaciones web.
Mongoose: ODM para interactuar con MongoDB.
JWT (JSON Web Tokens): Gestión segura de autenticación y autorización.

🌐 Rutas Principales de la API
Método	Ruta	Descripción	Autenticación Requerida
GET	/api/mascotas	Lista todas las mascotas disponibles.	No
POST	/api/mascotas	Agrega una nueva mascota.	Sí
GET	/api/adopciones	Lista solicitudes de adopción.	Sí
POST	/api/adopciones	Envía una solicitud de adopción.	Sí
⚙️ Configuración Inicial
Clonar el repositorio:
 
Configurar las variables de entorno:
Renombra el archivo .env.example a .env y completa los valores necesarios.
 
Instalar dependencias

Iniciar el servidor

🗂️ Modelos de Datos
Modelo de Mascotas

🔒 Autenticación
El sistema utiliza JWT (JSON Web Tokens) para garantizar la seguridad de los datos:

Los usuarios deben iniciar sesión para recibir un token de acceso.
Rutas protegidas como /api/mascotas requieren un token válido incluido en el encabezado Authorization.

📜 Autores del Proyecto

Nombre	Rol
Jonathan	Desarrollador Full Stack
Edna	Desarrolladora Full Stack
Matías	Desarrollador Full Stack

¡Gracias por contribuir a hacer del mundo un lugar mejor para nuestras mascotas! 🐶🐱





