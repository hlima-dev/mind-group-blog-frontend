import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Article } from '../types';
import { articleService } from '../services/article.service';
import { ArticleCard } from '../components/ArticleCard';
import { PageLoader } from '../components/Spinner';
import { User, Mail, LogOut, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    articleService.list().then((all) =>
      setArticles(all.filter((a) => a.authorId === user?.id))
    ).finally(() => setLoading(false));
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success('Sessão encerrada.');
    navigate('/');
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

          <button onClick={handleLogout} className="btn-danger flex items-center gap-2 text-sm">
            <LogOut size={15} /> Sair
          </button>
        </div>
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
