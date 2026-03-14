const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM usuarios WHERE usuario=$1 AND password=$2",
    [usuario, password]
  );

  if (result.rows.length > 0) {
    res.json({ login: true });
  } else {
    res.json({ login: false });
  }
});

app.get("/productos", async (req, res) => {
  const result = await pool.query("SELECT * FROM productos");
  res.json(result.rows);
});

app.post("/productos", async (req, res) => {
  const { nombre, precio } = req.body;

  await pool.query(
    "INSERT INTO productos(nombre,precio) VALUES($1,$2)",
    [nombre, precio]
  );

  res.json("Producto creado");
});

app.put("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;

  await pool.query(
    "UPDATE productos SET nombre=$1,precio=$2 WHERE id=$3",
    [nombre, precio, id]
  );

  res.json("Producto actualizado");
});

app.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM productos WHERE id=$1", [id]);

  res.json("Producto eliminado");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});