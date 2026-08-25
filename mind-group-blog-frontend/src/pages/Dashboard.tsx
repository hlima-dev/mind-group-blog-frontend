import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { articleService, getBannerUrl } from '../services/article.service';
import { useAuth } from '../contexts/AuthContext';
import { PageLoader } from '../components/Spinner';
import { DeleteModal } from '../components/DeleteModal';
import toast from 'react-hot-toast';
import { PenSquare, Trash2, Pencil, BookOpen, Tag, BarChart2, Calendar } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    articleService.listMine({ page: 1, limit: 50 }).then(({ data }) =>
      setArticles(data)
    ).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await articleService.delete(deleteTarget.id);
      toast.success('Artigo excluído.');
      setDeleteTarget(null);
      setArticles((p) => p.filter((a) => a.id !== deleteTarget.id));
    } catch {
      toast.error('Erro ao excluir.');
    } finally {
      setDeleting(false);
    }
  };

  const published = articles.filter((a) => a.status === 'published').length;
  const drafts = articles.filter((a) => a.status === 'draft').length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 animate-fade-up">
        <div>
          <h1 className="section-title mb-1">
            Olá, <span className="text-cyan-400">{user?.name?.split(' ')[0]}</span> 👋
          </h1>
          <p className="text-slate-500">Gerencie seus artigos publicados</p>
        </div>
        <Link to="/articles/new" className="btn-primary flex items-center gap-2 self-start">
          <PenSquare size={16} /> Novo artigo
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Artigos publicados', value: published, icon: BookOpen, color: 'text-cyan-400' },
          { label: 'Rascunhos', value: drafts, icon: Tag, color: 'text-amber-400' },
          { label: 'Visualizações totais', value: totalViews, icon: BarChart2, color: 'text-violet-400' },
          { label: 'Último artigo', value: articles.length > 0 ? new Date(articles[0].createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : '—', icon: Calendar, color: 'text-emerald-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card p-5">
            <Icon size={18} className={`${color} mb-3`} />
            <div className={`font-display font-bold text-2xl text-white mb-0.5`}>{value}</div>
            <div className="text-xs text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Articles table */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-surface-400/30">
          <h2 className="font-display font-semibold text-lg text-white">Meus artigos</h2>
        </div>

        {loading ? <PageLoader /> : articles.length === 0 ? (
          <div className="p-16 text-center">
            <BookOpen size={32} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">Você ainda não publicou nenhum artigo.</p>
            <Link to="/articles/new" className="btn-primary">Publicar meu primeiro artigo</Link>
          </div>
        ) : (
          <div className="divide-y divide-surface-400/20">
            {articles.map((article) => {
              const banner = getBannerUrl(article.bannerImage);
              return (
                <div key={article.id} className="flex items-center gap-4 p-4 hover:bg-surface-600/30 transition-colors group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-surface-600 overflow-hidden">
                    {banner ? (
                      <img src={banner} alt={article.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 font-display font-bold text-xs">MG</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate group-hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">
                      {article.title}
                      {article.status === 'draft' && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-400 flex-shrink-0">
                          RASCUNHO
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-500">{article.category}</span>
                      <span className="text-xs text-slate-600">•</span>
                      <span className="text-xs text-slate-500">
                        {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                      {article.tags.length > 0 && (
                        <>
                          <span className="text-xs text-slate-600">•</span>
                          <div className="flex gap-1 flex-wrap">
                            {article.tags.slice(0, 2).map((t) => (
                              <span key={t} className="tag text-[10px]">{t}</span>
                            ))}
                            {article.tags.length > 2 && <span className="text-xs text-slate-600">+{article.tags.length - 2}</span>}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/articles/${article.id}/edit`} className="w-8 h-8 rounded-lg bg-surface-500 border border-surface-400 flex items-center justify-center hover:border-cyan-400/50 hover:text-cyan-400 transition-all text-slate-400">
                      <Pencil size={13} />
                    </Link>
                    <button onClick={() => setDeleteTarget(article)} className="w-8 h-8 rounded-lg bg-surface-500 border border-surface-400 flex items-center justify-center hover:border-red-400/50 hover:text-red-400 transition-all text-slate-400">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </div>
  );
}
