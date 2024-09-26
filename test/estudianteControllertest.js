const estudiante = require("../models/estudiante");
const estudianteController = require("../controllers/estudianteController");
const estudiantes = require("../models/estudiantes");

jest.mock("../models/estudiante");

describe("obtenerEstudiantes", () => {
  it("Debería devolver una lista de estudiantes con código 200", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    estudiante.find.mockResolvedValue([
      { nombre: "Juan Perez", edad: 20, matricula: true },
    ]);

    await estudianteController.obtenerEstudiantes(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { nombre: "Juan Perez", edad: 20, matricula: true },
    ]);
  });

  it("debería devolver un error 500 si falla la búsqueda", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    estudiante.find.mockRejectedValue(new Error("error en la base de datos"));

    await estudianteController.obtenerEstudiantes(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
  });
});

describe("crearEstudiantes", () => {
  it("debería crear un estudiante y devolver el mismo estudiante con código 201", async () => {
    const req = {
      body: { nombre: "Juan Perez", edad: 20, matricula: true }
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    estudiantes.prototype.save = jest.fn().mockResolvedValue({
      nombre: "Juan Perez",
      edad: 20,
      matricula: true,
      _id: "123",
      __v: 0  
    });

    await estudianteController.crearEstudiante(req, res); 
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      nombre: "Juan Perez",
      edad: 20,
      matricula: true,
      _id: "123",
      __v: 0
    });
  });
});

describe("obtenerEstudiantePorID", () => {
  it("debería devolver un estudiante por ID con código 200", async () => {
    const req = {
      params: { idEstudiante: "123" }
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    estudiante.findById.mockResolvedValue({
      nombre: "Juan Perez",
      edad: 20,
      matricula: true,
      _id: "123",
      __v: 0
    });

    await estudianteController.obtenerEstudiantePorID(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      nombre: "Juan Perez",
      edad: 20,
      matricula: true,
      _id: "123",
      __v: 0
    });
  });

  it("debería devolver un 404 si no encuentra el ID del estudiante", async () => {
    const req = {
      params: { idEstudiante: "123" }
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    estudiante.findById.mockResolvedValue(null);
    await estudianteController.obtenerEstudiantePorID(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "estudiante no encontrado" });
  });

  it("debería devolver un 500 cuando falla al obtener el estudiante por otra razón diferente a no encontrarlo", async () => {
    const req = {
      params: { idEstudiante: "123" }
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    estudiante.findById.mockRejectedValue(new Error("error en la base de datos"));
    await estudianteController.obtenerEstudiantePorID(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
  });
});

describe("Actualizar estudiante", () => {
  it("debería actualizar un estudiante y devolverlo con código 200", async () => {
    const req = {
      params: { idEstudiante: "123" },
      body: { nombre: "Sebastian Huertas", edad: 20, matricula: true }
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    estudiante.findByIdAndUpdate = jest.fn().mockResolvedValue({
      nombre: "Sebastian Huertas",
      edad: 20,
      matricula: true,
      _id: "123",
      __v: 0
    });

    await estudianteController.actualizarEstudiante(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      nombre: "Sebastian Huertas",
      edad: 20,
      matricula: true,
      _id: "123",
      __v: 0
    });
    it("debería devolver un 404 si no encuentra el ID del estudiante para ser actualizado", async () => {
      const req = {
        params: { idEstudiante: "123" },
        body: { nombre: "Sebastian Huertas", edad: 20, matricula: true }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      estudiante.findByIdAndUpdate.mockResolvedValue(null);
      await estudianteController.actualizarEstudiante(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "estudiante no encontrado" });
    });
    it("debería devolver un 500 cuando falla al obtener el estudiante por otra razón diferente a no encontrarlo", async () => {
      const req = {
        params: { idEstudiante: "123" }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      estudiante.findByIdAndUpdate.mockRejectedValue(new Error("error en la base de datos"));
      await estudianteController.actualizarEstudiante(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });
    });
  });
  describe(!"eliminarEstudiante", () => {
    it("debería eliminar un estudiante poi ID y devolver un 200", async () => {
      const req = {
      params: { idEstudiante: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await estudiante.findByIdAndDelete.mockResolvedValue({message: `estudiante con 123 eliminado`})
    await estudianteController.eliminarEstudiante(req,res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({message:`estudiante con 123 eliminado`})

  })
  it("debería devolver un 404 si no encuentra el ID del estudiante para ser eliminado", async () => {
    const req = {
      params: { idEstudiante: "123" }
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    estudiante.findByIdAndDelete.mockResolvedValue(null);
    await estudianteController.eliminarEstudiante(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "estudiante no encontrado" });
  });
  it("debería devolver un 500 cuando falla al obtener el estudiante por otra razón diferente a no encontrarlo", async () => {
    const req = {
      params: { idEstudiante: "123" }
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    estudiante.findByIdAndDelete.mockRejectedValue(new Error("error en la base de datos"));
    await estudianteController.eliminarEstudiante(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
  });
})
