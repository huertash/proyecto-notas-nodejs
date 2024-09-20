const mongoose = require('mongoose');
const express = require('express');
const authRoutes = require(`./routes/aut`)
require ("dotenv").config()

const estudiantesRoutes = require("./routes/estudiantes")
const materiasRoutes = require ("./routes/materia")

const app = express ()


//middleware

app.use(express.json())
//conexion bd

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("base de datos conectada"))
    .catch(err => console.error (`no se pudo conectar a  mongoDB`, err))

//rutas
app.use ("/api/estudiantes",estudiantesRoutes)
app.use ("/api/materia",materiasRoutes)
app.use("/api",authRoutes)



const PORT = process.env.PORT || 3000
module.exports = app

// app.listen(PORT,()=> console.log(`servidor escuchando el puerto ${PORT}`))

