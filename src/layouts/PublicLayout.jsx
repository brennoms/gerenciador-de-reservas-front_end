import { Outlet } from 'react-router-dom';

import './PublicLayout.css';

export default function PublicLayout() {
  return (
    <div>
      <header>
        <h1>Site de Imóveis</h1>
      </header>

      <main>
        <Outlet /> {/* Aqui entram as páginas públicas */}
      </main>

      <footer>
        <p>© 2025 - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
