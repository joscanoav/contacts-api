const express   = require('express');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const Usuario   = require('../models/User');
const router    = express.Router();

// POST /auth/register → Registrar nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // 1️⃣ Generar salt y hash de la contraseña
    const salt     = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    // 2️⃣ Crear el usuario con password protegida
    const nuevo    = await Usuario.create({ email, password: hashPass, role });
    // 3️⃣ Devolver solo datos públicos (sin password)
    res.status(201).json({ id: nuevo._id, email: nuevo.email, role: nuevo.role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// **Pausa Postman #1**: Después de implementar register,
// probar POST /auth/register y verificar Status 201 y respuesta JSON.

// POST /auth/login → Iniciar sesión y emitir JWT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1️⃣ Buscar usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });
    // 2️⃣ Comparar password plano vs. hash almacenado
    const ok = await bcrypt.compare(password, usuario.password);
    if (!ok)   return res.status(401).json({ error: 'Credenciales inválidas' });
    // 3️⃣ Firmar token con payload: user ID y rol
    const payload = { sub: usuario._id, role: usuario.role };
    const token   = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
    // 4️⃣ Devolver el token al cliente
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// **Pausa Postman #2**: Después de implementar login,
// probar POST /auth/login y verificar Status 200 y que devuelve { token }.

module.exports = router;