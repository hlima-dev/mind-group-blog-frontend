import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Article } from '../types';
import { articleService, getBannerUrl } from '../services/article.service';
import { useAuth } from '../contexts/AuthContext';
import { PageLoader } from '../components/Spinner';
import { DeleteModal } from '../components/DeleteModal';
import toast from 'react-hot-toast';
import { Calendar, User, Tag, ArrowLeft, Pencil, Trash2 } from 'lucide-react';

export function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    articleService.getById(id).then(setArticle).catch(() => {
      toast.error('Artigo não encontrado.');
      navigate('/articles');
    }).finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!article) return;
    setDeleting(true);
    try {
      await articleService.delete(article.id);
      toast.success('Artigo excluído.');
      navigate('/dashboard');
    } catch {
      toast.error('Erro ao excluir artigo.');
      setDeleting(false);
    }
  };

  if (loading) return <PageLoader />;
  if (!article) return null;

  const banner = getBannerUrl(article.bannerImage);
  const isAuthor = user?.id === article.authorId;
  const date = new Date(article.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-up">
      {/* Back */}
      <Link to="/articles" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm mb-8 group">
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Voltar para artigos
      </Link>

      {/* Banner */}
      {banner && (
        <div className="rounded-2xl overflow-hidden mb-8 border border-surface-400/30">
          <img src={banner} alt={article.title} className="w-full h-72 md:h-96 object-cover" />
        </div>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="tag">{article.category}</span>
        {article.tags.map((t) => (
          <span key={t} className="flex items-center gap-1 text-xs text-slate-500">
            <Tag size={10} />{t}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-6">
        {article.title}
      </h1>

      {/* Author / date / actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-surface-400/30">
        <div className="flex items-center gap-5 text-sm text-slate-400">
          <span className="flex items-center gap-2"><User size={14} className="text-cyan-400" />{article.authorName}</span>
          <span className="flex items-center gap-2"><Calendar size={14} className="text-cyan-400" />{date}</span>
        </div>
        {isAuthor && (
          <div className="flex items-center gap-2">
            <Link to={`/articles/${article.id}/edit`} className="btn-ghost text-sm py-2 flex items-center gap-1.5">
              <Pencil size={14} /> Editar
            </Link>
            <button onClick={() => setShowDelete(true)} className="btn-danger text-sm py-2 flex items-center gap-1.5">
              <Trash2 size={14} /> Excluir
            </button>
          </div>
        )}
      </div>

      {/* Summary */}
      <p className="text-slate-300 text-xl leading-relaxed mb-8 font-light italic border-l-2 border-cyan-400/40 pl-6">
        {article.summary}
      </p>

      {/* Content */}
      <div className="prose-custom text-slate-300 leading-relaxed whitespace-pre-wrap text-base">
        {article.content}
      </div>

      {showDelete && (
        <DeleteModal
          title={article.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
          loading={deleting}
        />
      )}
    </div>
  );
}
