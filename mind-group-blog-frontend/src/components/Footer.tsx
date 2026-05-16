import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-surface-400/20 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
              <BookOpen size={14} className="text-cyan-400" />
            </div>
            <span className="font-display font-bold text-white">
              Mind<span className="text-cyan-400">Group</span>
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-300 transition-colors">Início</Link>
            <Link to="/articles" className="hover:text-slate-300 transition-colors">Artigos</Link>
            <Link to="/login" className="hover:text-slate-300 transition-colors">Entrar</Link>
          </nav>

          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Mind Group Blog — Case Técnico
          </p>
        </div>
      </div>
    </footer>
  );
}
