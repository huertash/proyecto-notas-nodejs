const express = require("express");
const router = express.Router();
const materiasController = require("../controllers/materiaController");
//el controlador materias

router.get("/", materiasController.obtenerMaterias);
router.post("/", materiasController.crearMateria);
router.get("/:idMateria", materiasController.ObtenerMateriaPorID);
router.put("/:idMateria", materiasController.actualizarMateria);
router.delete("/:idMateria", materiasController.eliminarMateria);

module.exports = router;