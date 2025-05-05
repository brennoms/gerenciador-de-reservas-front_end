import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';

import './PrivateLayout.css';

export default function PrivateLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  function exit() {
    navigate('/');
    setTimeout(() => logout(), 500);
  }

  return (
    <div className="flex">
      <div className="div-sidebar">
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
          <button type="button" onClick={() => setIsOpen(!isOpen)} className="toggle-btn">
            {isOpen ? <X /> : <Menu />}
          </button>
          <div className={`div-links ${isOpen ? 'show' : 'hide'}`}>
            <div className="links">
              <li>🏠 exemplo1</li>
              <li>📅 exemplo2</li>
              <li>👤 exemplo3</li>
            </div>
            <button className="button1" type="button" onClick={exit}>
              Sair
            </button>
          </div>
        </div>
      </div>

      <div>
        <main>
          <Outlet /> {/* Aqui entram as páginas privadas */}
        </main>
      </div>
    </div>
  );
}
