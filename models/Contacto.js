const mongoose = require('mongoose');

// Definimos el esquema para un contacto
const esquemaContacto = new mongoose.Schema({
  nombre:   { type: String, required: true },  // Nombre obligatorio
  correo:   { type: String, required: true },  // Correo obligatorio
  telefono: { type: String },                  // Teléfono opcional
  empresa:  { type: String }                   // Campo extra para el mini‑reto
});

// Exportamos el modelo con nombre 'Contacto'
module.exports = mongoose.model('Contacto', esquemaContacto);

