import { useState } from "react";
import Login from "./Login";
import Menu from "./Menu";
import Productos from "./Productos";

function App() {
  const [login, setLogin] = useState(false);
  const [pagina, setPagina] = useState("");

  if (!login) {
    return <Login setLogin={setLogin} />;
  }

  if (pagina === "productos") {
    return <Productos setPagina={setPagina} />;
  }

  return <Menu setPagina={setPagina} />;
}

export default App;