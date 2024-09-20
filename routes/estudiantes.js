const express = require ("express")
const router = express.Router()
const estudiantesController = require("../controllers/estudianteController")
//el controlador estudiantes

router.get("/",estudiantesController.obtenerEstudiantes)
router.post("/", estudiantesController.crearEstudiante)
router.get("/:idEstudiante",estudiantesController.ObtenerEstudiantePorID)
router.put("/:idEstudiante",estudiantesController.actualizarEstudiante)
router.delete("/:idEstudiante",estudiantesController.eliminarEstudiante)

module.exports = router