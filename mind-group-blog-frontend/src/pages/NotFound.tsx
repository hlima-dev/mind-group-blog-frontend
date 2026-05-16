import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center animate-fade-up">
        <div className="font-display font-extrabold text-9xl text-surface-600 mb-4 glow-cyan" style={{ color: 'rgba(0,212,255,0.08)' }}>
          404
        </div>
        <h1 className="font-display font-bold text-3xl text-white mb-3">Página não encontrada</h1>
        <p className="text-slate-500 mb-8">A página que você procura não existe ou foi removida.</p>
        <Link to="/" className="btn-primary">Voltar para o início</Link>
      </div>
    </div>
  );
}
