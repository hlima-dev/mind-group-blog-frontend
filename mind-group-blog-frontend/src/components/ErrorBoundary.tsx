import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Sem isso, qualquer erro de render em qualquer página derruba a SPA
// inteira pra uma tela em branco — melhor mostrar algo e deixar recarregar.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Erro não tratado na aplicação:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="card p-8 max-w-md w-full text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <h1 className="font-display font-bold text-xl text-white mb-2">Algo deu errado</h1>
            <p className="text-slate-400 text-sm mb-6">
              Ocorreu um erro inesperado ao carregar esta página.
            </p>
            <button onClick={() => window.location.reload()} className="btn-primary w-full py-2.5">
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
