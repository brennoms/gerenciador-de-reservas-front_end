import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center gap-1 justify-center">
      <button className="default-button" onClick={() => navigate('/login')}>
        Entrar
      </button>
      <button className="default-button" onClick={() => navigate('/register')}>
        Cadastrar
      </button>
    </div>
  );
}
