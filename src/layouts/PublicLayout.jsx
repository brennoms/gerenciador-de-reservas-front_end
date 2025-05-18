import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="overflow-hidden">
      <header className="flex items-center justify-center h-[10vh] w-full bg-blue-500 text-white text-2xl font-bold">
        <h1>Site de Imóveis</h1>
      </header>

      <main className="h-[80vh]">
        <Outlet /> {/* Aqui entram as páginas públicas */}
      </main>

      <footer className="flex items-center justify-center h-[10vh] w-full bg-gray-300 text-lg font-bold">
        <p>© 2025 - Brenno Marques | Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
