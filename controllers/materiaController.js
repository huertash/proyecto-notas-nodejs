const Materia = require("../models/materia");

exports.obtenerMaterias = async (req, res) => {
  try {
    const materias = await Materia.find();
    res.status(200).json(materias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.crearMateria = async (req, res) => {
  console.log(req.body);
  try {
    const nuevaMateria = new Materia(req.body);
    await -nuevaMateria.save();
    res.status(201).json(nuevaMateria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.ObtenerMateriaPorID = async (req, res) => {
  try {
    const idMateria = req.params.idMateria;
    const materia = await Materia.findById(idMateria);
    if (!materia) {
      res.estatus(404).json({ message: "Materia no encontrado" });
    }
    res.status(200).json(materia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.actualizarMateria = async (req, res) => {
  try {
    const IdMateria = req.params.idMateria;
    const nuevaMateria = req.body;
    const materia = await Materia.findByIdAndUpdate(IdMateria, nuevaMateria, {
      new: true,
    });
    if (!materia) {
      res.status(404).json({ message: "materia no encontrada" });
    }
    res.status(200).json(materia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.eliminarMateria = async (req, res) => {
  try {
    const idMateria = req.params.idMateria;
    const materia = await Materia.findByIdAndDelete(idMateria);
    if (!materia) {
      res.status(404).json({ message: "materia no encontrada" });
    }
    res.status(200).json({ message: `Materia con ${idMateria} eliminado` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
