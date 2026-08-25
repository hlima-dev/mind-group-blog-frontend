import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle2, XCircle, Loader2, Mail } from 'lucide-react';

type Status = 'loading' | 'success' | 'error' | 'missing-token';

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { isAuthenticated } = useAuth();

  const [status, setStatus] = useState<Status>(token ? 'loading' : 'missing-token');
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (!token) return;

    authService
      .verifyEmail(token)
      .then(() => setStatus('success'))
      .catch((err) => {
        setStatus('error');
        setMessage(err?.response?.data?.message ?? 'Não foi possível verificar seu e-mail.');
      });
  }, [token]);

  const handleResend = async () => {
    try {
      setResending(true);
      await authService.resendVerification();
      setResent(true);
    } catch {
      setMessage('Faça login para reenviar a verificação.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md animate-fade-up">
        <div className="card p-8 text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="mx-auto animate-spin text-cyan-400 mb-4" size={40} />
              <h1 className="font-display font-bold text-2xl text-white">Verificando seu e-mail...</h1>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle2 className="mx-auto text-emerald-400 mb-4" size={40} />
              <h1 className="font-display font-bold text-2xl text-white mb-2">E-mail verificado!</h1>
              <p className="text-slate-500 mb-6">Sua conta foi confirmada com sucesso.</p>
              <Link to={isAuthenticated ? '/dashboard' : '/login'} className="btn-primary inline-block w-full py-3">
                {isAuthenticated ? 'Ir para o painel' : 'Ir para o login'}
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="mx-auto text-red-400 mb-4" size={40} />
              <h1 className="font-display font-bold text-2xl text-white mb-2">Link inválido ou expirado</h1>
              <p className="text-slate-500 mb-6">{message}</p>
              {isAuthenticated && (
                <button
                  onClick={handleResend}
                  disabled={resending || resent}
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                >
                  <Mail size={16} />
                  {resent ? 'E-mail reenviado' : resending ? 'Enviando...' : 'Reenviar verificação'}
                </button>
              )}
              <Link to="/login" className="block text-cyan-400 hover:text-cyan-300 mt-5 text-sm">
                Voltar para o login
              </Link>
            </>
          )}

          {status === 'missing-token' && (
            <>
              <Mail className="mx-auto text-cyan-400 mb-4" size={40} />
              <h1 className="font-display font-bold text-2xl text-white mb-2">Confirme seu e-mail</h1>
              <p className="text-slate-500 mb-6">
                Enviamos um link de confirmação para o seu e-mail. Clique nele para ativar sua conta.
              </p>
              {isAuthenticated && (
                <button
                  onClick={handleResend}
                  disabled={resending || resent}
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                >
                  <Mail size={16} />
                  {resent ? 'E-mail reenviado' : resending ? 'Enviando...' : 'Reenviar verificação'}
                </button>
              )}
              {message && <p className="text-red-400 text-sm mt-3">{message}</p>}
              <Link to="/login" className="block text-cyan-400 hover:text-cyan-300 mt-5 text-sm">
                Voltar para o login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
