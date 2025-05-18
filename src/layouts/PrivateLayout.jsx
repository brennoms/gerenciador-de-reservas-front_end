import { useState, useEffect, createContext, useContext } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';

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

  useEffect(() => {
    setIsOpen(false);
  }, [options]);

  return (
    <div>
      <div>
        <div className="flex bg-gray-800">
          <button className="p-2 text-white" type="button" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
        <div
          className={`${isOpen ? 'min-w-[11rem] p-4' : 'w-0'} absolute z-10 h-fit mt-1 ml-1 bg-gray-800 rounded text-white transition-[width] duration-100 ease-in-out overflow-hidden`}
        >
          <div className={`${isOpen ? 'flex flex-col h-full' : 'hidden'}`}>
            <div className="flex flex-col items-center">
              {options.map(option => (
                <Link
                  className="text-base font-bold mb-2 mt-2 whitespace-nowrap"
                  to={option.path}
                  key={option.name}
                >
                  {option.name}
                </Link>
              ))}
              <button className="default-button self-start w-fit mt-2" type="button" onClick={exit}>
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full w-full overflow-x-hidden">
        <main className="h-full w-full p-2">
          <SideBarContext.Provider value={{ options, setOptions }}>
            <Outlet />
          </SideBarContext.Provider>
        </main>
      </div>
    </div>
  );
}
