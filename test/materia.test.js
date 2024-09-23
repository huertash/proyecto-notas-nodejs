const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const materia = require("../models/materia");
const estudiantes = require("../models/estudiantes");

const generarToken = () => {
  return jwt.sign({ userId: "fakeUser" }, "secretKey", { expiresIn: "1h" });
};

afterEach(async () => {
  await materia.deleteMany();
});
afterAll(async () => {
  await mongoose.connection.close();
});
// casos de pruebas
describe("CRUD materias con JWT", () => {
  it("Deberia crear una nueva materia", async () => {
    const token = generarToken();
    const res = await request(app)
      .post("/api/materia")
      .set("Authorization", token)
      .send({
        nombre: "BASES DE DATOS",
        estudiantes: [estudiantes._id],
        profesor: "CARLOS VALDERRAMA",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.nombre).toBe("BASES DE DATOS");
    expect(res.body.profesor).toBe("CARLOS VALDERRAMA");
  });

  it("Test para obtener las materias", async () => {
    try {
      await materia.create({
        nombre: "BASES DE DATOS",
        estudiantes: [estudiantes._id],
        profesor: "CARLOS VALDERRAMA",
      });
    } catch (error) {
      console.error("error al crear materia");
    }
    const token = generarToken();
    const res = await request(app)
      .get("/api/materia")
      .set("Authorization", token);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
  });

  it("test para obtener una materia por Id", async () => {
    const nuevaMateria = await materia.create({
      nombre: "BASES DE DATOS",
      estudiantes: [estudiantes._id],
      profesor: "CARLOS VALDERRAMA",
    });
    const token = generarToken();
    const res = await request(app)
      .get(`/api/materia/${nuevaMateria.id}`)
      .set("Authorization", token);
    expect(res.statusCode).toEqual(200);
    expect(res.body.nombre).toBe("BASES DE DATOS");
  });

  it("test para actualizar materia por ID", async () => {
    const nuevaMateria = await materia.create({
      nombre: "ARQUITECTURA",
      estudiantes: [estudiantes._id],
      profesor: "FREDY RIVERA",
    });
    const token = generarToken();
    const res = await request(app)
      .put(`/api/materia/${nuevaMateria}`)
      .set("Authorization", token)
      .send({
        nombre: "ARQUITECTURA",
        estudiantes: [],
        profesor: "FREDY RIVERA",
      });
  });
  it("test para eliminar materia usando el ID", async () => {
    const nuevaMateria = await materia.create({
      nombre: "ARQUITECTURA",
      estudiantes: [estudiantes._id],
      profesor: "FREDY RIVERA",
    });
    token = generarToken();
    const res = await request(app)
      .delete(`/api/materia/${nuevaMateria._id}`)
      .set("Authorization", token);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe(`Materia con ${nuevaMateria._id} eliminado`);
  });
});
