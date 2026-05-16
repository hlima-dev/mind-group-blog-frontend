import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, LayoutDashboard, LogOut, PenSquare, User } from 'lucide-react';
import toast from 'react-hot-toast';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Até logo!');
    navigate('/');
  };

  const isActive = (path: string) =>
    location.pathname === path ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200';

  return (
    <header className="sticky top-0 z-50 border-b border-surface-400/30 backdrop-blur-xl bg-surface-900/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
            <BookOpen size={16} className="text-cyan-400" />
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight">
            Mind<span className="text-cyan-400">Group</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/')}`}>Início</Link>
          <Link to="/articles" className={`text-sm font-medium transition-colors ${isActive('/articles')}`}>Artigos</Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className={`text-sm font-medium transition-colors ${isActive('/dashboard')}`}>Dashboard</Link>
              <Link to="/articles/new" className={`text-sm font-medium transition-colors ${isActive('/articles/new')}`}>Publicar</Link>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/profile" title="Perfil" className="w-8 h-8 rounded-full bg-surface-600 border border-surface-400 flex items-center justify-center hover:border-cyan-400/50 transition-colors">
                <User size={15} className="text-slate-300" />
              </Link>
              <Link to="/dashboard" className="hidden md:flex items-center gap-1.5 btn-ghost text-sm py-2">
                <LayoutDashboard size={14} />
                <span className="hidden lg:inline">{user?.name?.split(' ')[0]}</span>
              </Link>
              <Link to="/articles/new" className="btn-primary text-sm py-2 flex items-center gap-1.5">
                <PenSquare size={14} />
                <span className="hidden sm:inline">Publicar</span>
              </Link>
              <button onClick={handleLogout} title="Sair" className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-sm py-2">Entrar</Link>
              <Link to="/register" className="btn-primary text-sm py-2">Cadastrar</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
