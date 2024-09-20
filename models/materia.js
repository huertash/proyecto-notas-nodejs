const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const materaSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  estudiantes: [
    {
      type: Array,
      // red: "estudiante"
    },
  ],
  profesor: {
    type: String,
    require: true,
  },
});

const Materia = moongoose.model("Materia", materaSchema);

module.exports = Materia;
