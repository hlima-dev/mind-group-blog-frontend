import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Article } from '../types';
import { articleService } from '../services/article.service';
import { authService } from '../services/auth.service';
import { ArticleCard } from '../components/ArticleCard';
import { PageLoader } from '../components/Spinner';
import { User, Mail, LogOut, BookOpen, KeyRound, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    articleService.list().then((all) =>
      setArticles(all.filter((a) => a.authorId === user?.id))
    ).finally(() => setLoading(false));
  }, [user]);

  const handleLogout = async () => {
    await logout();
    toast.success('Sessão encerrada.');
    navigate('/');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      toast.error('A nova senha deve ter ao menos 8 caracteres, uma letra maiúscula e um número.');
      return;
    }

    setChangingPassword(true);
    try {
      await authService.changePassword(currentPassword, newPassword);
      toast.success('Senha alterada com sucesso.');
      setCurrentPassword('');
      setNewPassword('');
      setShowPasswordForm(false);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Erro ao alterar senha.';
      toast.error(msg);
    } finally {
      setChangingPassword(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Profile card */}
      <div className="card p-8 mb-10 animate-fade-up">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
            <User size={32} className="text-cyan-400" />
          </div>

          <div className="flex-1">
            <h1 className="font-display font-bold text-3xl text-white mb-1">{user.name}</h1>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Mail size={14} className="text-cyan-400" />
              {user.email}
            </div>
            <div className="flex items-center gap-2 mt-3 text-slate-500 text-sm">
              <BookOpen size={13} />
              {articles.length} artigo{articles.length !== 1 ? 's' : ''} publicado{articles.length !== 1 ? 's' : ''}
            </div>
          </div>

          <button
            onClick={() => setShowPasswordForm((v) => !v)}
            className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl border border-surface-400 text-slate-300 hover:border-cyan-400/40 transition-colors"
          >
            <KeyRound size={15} /> Alterar senha
          </button>

          <button onClick={handleLogout} className="btn-danger flex items-center gap-2 text-sm">
            <LogOut size={15} /> Sair
          </button>
        </div>

        {showPasswordForm && (
          <form onSubmit={handleChangePassword} className="mt-8 pt-8 border-t border-surface-400/40 space-y-5 max-w-sm">
            <div>
              <label className="label">Senha atual</label>
              <input
                type={showPass ? 'text' : 'password'}
                className="input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Nova senha</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="input pr-12"
                  placeholder="Mínimo 8 caracteres, 1 maiúscula e 1 número"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={changingPassword} className="btn-primary py-2.5">
              {changingPassword ? 'Salvando...' : 'Salvar nova senha'}
            </button>
          </form>
        )}
      </div>

      {/* Articles */}
      <div>
        <h2 className="section-title mb-6">Minhas publicações</h2>

        {loading ? <PageLoader /> : articles.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-slate-500">Você ainda não publicou artigos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {articles.map((a, i) => (
              <div key={a.id} style={{ animation: `fadeUp 0.4s ease ${i * 80}ms forwards`, opacity: 0 }}>
                <ArticleCard article={a} featured />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
