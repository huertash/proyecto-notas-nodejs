const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");

exports.registraUsuario = async (req, res) => {
  const { username, password } = req.body;
  try {
    const usuarioExiste = await Usuario.findOne({ username });
    console.log(usuarioExiste);
    if (usuarioExiste) {
      return res.status(400).json({ message: "el usuario ya existe" });
    }
    const nuevoUsuario = new Usuario({ username, password });
    await nuevoUsuario.save();
    const token = jwt.sign({ id: nuevoUsuario._id }, "secretkey", {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.loginUsuario = async (req, res) => {
  const { username, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res
        .status(400)
        .json({ message: "usuario o contraseña incorrecto" });
    }

    const isMatch = await usuario.comparePasword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "contraseña o usuarioincorrecto" });
    }

    const token = jwt.sign({ id: usuario._id }, "secretkey", {
      expiresIn: "3h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
