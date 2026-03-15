import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ setLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const API = process.env.REACT_APP_API_URL;
  console.log("API URL:", API);

  const entrar = async () => {
    if (usuario.trim() === "" || password.trim() === "") {
      setMensaje("Completa usuario y contraseña");
      return;
    }

    try {
      const res = await axios.post(`${API}/login`, {
        usuario,
        password,
      });

      if (res.data.login) {
        setLogin(true);
        setMensaje("");
      } else {
        setMensaje("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
      console.log("Error completo:", error);
      console.log("Respuesta del servidor:", error.response);
      console.log("Mensaje:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">🚀</div>
        <h1>Bienvenido</h1>
        <p className="login-subtitle">Ingresa a tu sistema CRUD</p>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={entrar}>Entrar</button>

        {mensaje && <p className="login-error">{mensaje}</p>}
      </div>
    </div>
  );
}

export default Login;