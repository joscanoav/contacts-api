
const express  = require('express');
const Contacto = require('../models/Contacto');
const enrutador = express.Router();

/**
 * GET /api/contactos
 * Devuelve todos los contactos.
 */
enrutador.get('/', async (req, res) => {
  try {
    const listaContactos = await Contacto.find();
    res.json(listaContactos);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * GET /api/contactos/:id
 * Devuelve un contacto por ID.
 */
enrutador.get('/:id', async (req, res) => {
  try {
    const contacto = await Contacto.findById(req.params.id);
    if (!contacto) return res.status(404).json({ error: 'Contacto no encontrado' });
    res.json(contacto);
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' });
  }
});

/**
 * POST /api/contactos
 * Crea un nuevo contacto con los datos del body.
 */
enrutador.post('/', async (req, res) => {
  try {
    const nuevoContacto = await Contacto.create(req.body);
    res.status(201).json(nuevoContacto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * PUT /api/contactos/:id
 * Actualiza uno o varios campos de un contacto existente.
 */
enrutador.put('/:id', async (req, res) => {
  try {
    const contactoActualizado = await Contacto.findByIdAndUpdate(
      req.params.id,        // ID de la URL
      req.body,             // nuevos datos
      {
        new: true,          // devolver el documento modificado
        runValidators: true // aplicar validaciones del esquema
      }
    );
    if (!contactoActualizado) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }
    res.json(contactoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /api/contactos/:id
 * Elimina un contacto por su ID.
 */
enrutador.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Contacto.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }
    res.json({ mensaje: 'Contacto eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' });
  }
});

module.exports = enrutador;

