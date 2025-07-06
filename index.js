
// 1️⃣ Cargamos variables de entorno desde .env antes de usarlas
require('dotenv').config();

// 2️⃣ Importamos Express para crear el servidor HTTP
const express  = require('express');
// 3️⃣ Importamos Mongoose para conectar con MongoDB
const mongoose = require('mongoose');

// 4️⃣ Creamos la instancia del servidor
const servidor = express();

// 5️⃣ Middleware: parsear cuerpos JSON en las peticiones
servidor.use(express.json());

// 6️⃣ Conexión a MongoDB Atlas usando la URI de .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✔ Conectado a MongoDB Atlas'))
  .catch(err => console.error('✖ Error al conectar:', err));

// 7️⃣ Montaremos rutas más adelante (GET/POST)
// const rutasContactos = require('./routes/contactos');
// servidor.use('/api/contactos', rutasContactos);

const rutasContactos = require('./routes/contactos');
servidor.use('/api/contactos', rutasContactos);


// 8️⃣ Arrancamos el servidor en el puerto definido en .env o 3000
const puerto = process.env.PUERTO || 3000;
servidor.listen(puerto, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${puerto}`);
});

