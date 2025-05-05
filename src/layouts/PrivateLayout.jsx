import { useState, createContext, useContext } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import './PrivateLayout.css';

const SideBarContext = createContext();

export function useSideBarContext() {
  return useContext(SideBarContext);
}

export default function PrivateLayout() {
  const [options, setOptions] = useState([]);
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
              {options.map(option => (
                <Link to={option.path} key={option.name}>
                  {option.name}
                </Link>
              ))}
            </div>
            <button className="button1" type="button" onClick={exit}>
              Sair
            </button>
          </div>
        </div>
      </div>

      <div>
        <main>
          <SideBarContext.Provider value={{ options, setOptions }}>
            <Outlet />
          </SideBarContext.Provider>
        </main>
      </div>
    </div>
  );
}
