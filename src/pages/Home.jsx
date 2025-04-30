import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex column-center gap-1 min-height-80vh">
      <button className="button1" onClick={() => navigate('/login')}>
        Entrar
      </button>
      <button className="button1" onClick={() => navigate('/register')}>
        Cadastrar
      </button>
    </div>
  );
}
