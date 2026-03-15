import { useEffect, useState } from "react";
import axios from "axios";
import "./Productos.css";

function Productos({ setPagina }) {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const API = process.env.REACT_APP_API_URL;

  const cargar = async () => {
    try {
      const res = await axios.get(`${API}/productos`);
      setProductos(res.data);
    } catch (error) {
      console.log("Error al cargar productos", error);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const limpiar = () => {
    setNombre("");
    setPrecio("");
    setEditando(false);
    setIdEditar(null);
  };

  const crear = async () => {
    if (nombre.trim() === "" || precio.trim() === "") {
      alert("Completa todos los campos");
      return;
    }

    try {
      await axios.post(`${API}/productos`, {
        nombre,
        precio,
      });

      limpiar();
      cargar();
    } catch (error) {
      console.log("Error al crear producto", error);
    }
  };

  const eliminar = async (id) => {
    try {
      await axios.delete(`${API}/productos/${id}`);
      cargar();
    } catch (error) {
      console.log("Error al eliminar producto", error);
    }
  };

  const seleccionarEditar = (producto) => {
    setNombre(producto.nombre);
    setPrecio(producto.precio.toString());
    setIdEditar(producto.id);
    setEditando(true);
  };

  const actualizar = async () => {
    if (nombre.trim() === "" || precio.trim() === "") {
      alert("Completa todos los campos");
      return;
    }

    try {
      await axios.put(`${API}/productos/${idEditar}`, {
        nombre,
        precio,
      });

      limpiar();
      cargar();
    } catch (error) {
      console.log("Error al actualizar producto", error);
    }
  };

  return (
    <div className="productos-container">
      <div className="productos-card">
        <div className="productos-top">
          <h2>Gestión de Productos</h2>
          <button className="btn-volver" onClick={() => setPagina("")}>
            Volver al menú
          </button>
        </div>

        <div className="formulario">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />

          {editando ? (
            <div className="botones-form">
              <button className="btn-actualizar" onClick={actualizar}>
                Actualizar
              </button>
              <button className="btn-cancelar" onClick={limpiar}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn-crear" onClick={crear}>
              Crear
            </button>
          )}
        </div>

        <div className="tabla-productos">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.precio}</td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => seleccionarEditar(p)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminar(p.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Productos;