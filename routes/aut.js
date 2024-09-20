const express = require ("express")
const router = express.Router()
const authController = require("../controllers/authControllers")

router.post("/register", authController.registraUsuario)
router.post("/login", authController.loginUsuario)

module.exports = router
