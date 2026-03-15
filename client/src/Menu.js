import "./Menu.css";

function Menu({ setPagina }) {
  return (
    <div className="menu-container">
      <div className="menu-overlay">
        <div className="menu-header">
          <h1>Panel Principal</h1>
          <p>Administra tu aplicación CRUD de forma rápida y sencilla</p>
        </div>

        <div className="cards-grid">
          <div className="menu-card" onClick={() => setPagina("productos")}>
            <div className="icon">📦</div>
            <h2>Productos</h2>
            <p>Crear, listar, editar y eliminar productos del sistema.</p>
            <button>Entrar</button>
          </div>

          <div className="menu-card">
            <div className="icon">👥</div>
            <h2>Usuarios</h2>
            <p>Próximamente podrás administrar usuarios y permisos.</p>
            <button disabled>Próximamente</button>
          </div>

          <div className="menu-card">
            <div className="icon">📊</div>
            <h2>Reportes</h2>
            <p>Visualiza estadísticas importantes de tu aplicación.</p>
            <button disabled>Próximamente</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;