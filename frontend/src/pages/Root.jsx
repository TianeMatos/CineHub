import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";

export function Root() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f0f0f] dark:text-neutral-100">
      <Navbar />
      <Outlet />
      <footer className="bg-black/50 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Explorar</h3>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Filmes</a></li>
                <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Séries</a></li>
                <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Documentários</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Categorias</h3>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Ação</a></li>
                <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Drama</a></li>
                <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Comédia</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Sobre</h3>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-[#fbbf24] transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            © 2024 CineDB. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
