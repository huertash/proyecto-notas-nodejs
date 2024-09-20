const Estudiante = require("../models/estudiantes");

exports.obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.crearEstudiante = async (req, res) => {
  console.log(req.body);
  try {
    const nuevoEstudiante = new Estudiante(req.body);
    await -nuevoEstudiante.save();
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  //     res.status(201).json({message:"test"})
};
exports.ObtenerEstudiantePorID = async (req, res) => {
  try {
    const idEstudiantes = req.params.idEstudiante;
    const estudiante = await Estudiante.findById(idEstudiantes);
    if (!estudiante) {
      res.estatus(404).json({ message: "estudiante no encontrado" });
    }
    res.status(200).json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.actualizarEstudiante = async (req, res) => {
  try {
    const idEstudiante = req.params.idEstudiante;
    const nuevosEstudiante = req.body;
    const estudiante = await Estudiante.findByIdAndUpdate(
      idEstudiante,
      nuevosEstudiante,
      { new: true }
    );
    if (!estudiante) {
      res.status(404).json({ message: "estudiante no encontrado" });
    }
    res.status(200).json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.eliminarEstudiante = async (req, res) => {
  try {
    const idEstudiante = req.params.idEstudiante;
    const estudiante = await Estudiante.findByIdAndDelete(idEstudiante);
    if (!estudiante) {
      res.status(404).json({ message: "estudiante no encontrado" });
    }
    res
      .status(200)
      .json({ message: `Estudiante con ${idEstudiante}eliminado` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
