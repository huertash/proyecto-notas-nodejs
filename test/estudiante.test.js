const request = require("supertest")
const app = require ("../app")
const mongoose = require("mongoose")
const Estudiante = require("../models/estudiantes")
const jwt = require ("jsonwebtoken")

const generarToken = ()=>{
    return jwt.sign({userId:"fakeUser"},"secretKey",{expiresIn:"1h"})
}

afterEach(async()=>{
    await Estudiante.deleteMany()
})
afterAll(async()=>{
    await mongoose.connection.close()
})

describe ("CRUD Estudiantes con JWT",()=>{

    it("Deberia crear un nuevo estudiante", async()=>{
        const token = generarToken()
        const res = await request(app)
        .post("/api/estudiantes")
        .set("Authorization", token)
        .send({
            nombre: "Juan Perez",
            matricula: true,
            edad: 22
        })     
    
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty("_id")
    expect(res.body.nombre).toBe("Juan Perez")
})

it("Test para obtener los estudiantes", async()=>{
    try
{
    await Estudiante.create({
        nombre: "Juan Perez",
        matricula: true,
        edad: 22
    })
} catch (error) {
    console.error("error al crear estudiante")
}
const token = generarToken()
const res = await request (app).get("/api/estudiantes").set("Authorization", token)
expect(res.statusCode).toEqual(200)
expect(res.body.length).toBe(1)
})

it("test para obtener un estudiante por Id", async()=>{
        const estudiante = await Estudiante.create({
        nombre: "Patricia Lopez",
        matricula: true,
        edad: 30

        })
    const token = generarToken()
    const res = await request(app)
    .get(`/api/estudiantes/${estudiante.id}`)
    .set("Authorization", token)
    expect(res.statusCode).toEqual(200)
    expect(res.body.nombre).toBe("Patricia Lopez")
      
})

it("test para actualizar estrudiante usando el ID", async()=>{
    const estudiante = await Estudiante.create({
        nombre: "Pedro Perez",
        matricula: true,
        edad: 15
})
const token = generarToken()
const res = await request(app)
.put(`/api/estudiantes/${estudiante._id}`)
.set("Authorization", token).send({
        nombre: "Pedro Parra",
        matricula: true,
        edad: 15
})
expect(res.statusCode).toEqual(200)
expect(res.body.nombre).toBe("Pedro Parra")
expect(res.body.matricula).toEqual(true)
expect(res.body.edad).toEqual(15)
})



it("test para eliminar estrudiante usando el ID", async()=>{
    const estudiante = await Estudiante.create({
        nombre: "Ana MArtinez",
        matricula: true,
        edad: 24
    })
    token = generarToken()
    const res = await request(app).delete(`/api/estudiantes/${estudiante.id}`).set("Authorization", token)
    .set("Authorization", token)
expect(res.statusCode).toEqual(200)
expect(res.body.message).toBe(`Estudiante con ${estudiante._id}eliminado`)
})
})
