const mongoose = require('mongoose');

// Esquema de usuario: email único, password hasheada y rol (user/admin)
const esquemaUsuario = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user','admin'], default: 'user' }
});

module.exports = mongoose.model('User', esquemaUsuario);