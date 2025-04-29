import { Outlet } from 'react-router-dom';

import './PrivateLayout.css';

export default function PrivateLayout() {
  return (
    <div className="back">
      <aside>
        <nav></nav>
      </aside>

      <div>
        <main>
          <Outlet /> {/* Aqui entram as páginas privadas */}
        </main>
      </div>
    </div>
  );
}
