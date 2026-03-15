const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

app.post("/login", async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = $1 AND password = $2",
      [usuario, password]
    );

    if (result.rows.length > 0) {
      res.json({ login: true, usuario: result.rows[0] });
    } else {
      res.json({ login: false });
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.get("/productos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

app.post("/productos", async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    await pool.query(
      "INSERT INTO productos(nombre, precio) VALUES($1, $2)",
      [nombre, precio]
    );

    res.json({ mensaje: "Producto creado" });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear producto" });
  }
});

app.put("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    await pool.query(
      "UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3",
      [nombre, precio, id]
    );

    res.json({ mensaje: "Producto actualizado" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

app.delete("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM productos WHERE id = $1", [id]);

    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});