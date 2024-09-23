const moongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");

const Schema = moongoose.Schema;

const usuarioSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {}
});

usuarioSchema.methods.comparePasword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;