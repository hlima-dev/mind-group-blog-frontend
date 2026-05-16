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
  const date = new Date(article.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  return (
    /* Camada externa: limita o banner a max-w-5xl */
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 animate-fade-up">

      {/* Voltar — alinhado com a coluna de leitura */}
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm mb-10 group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Voltar para artigos
        </Link>
      </div>

      {/* Banner — respira na largura total do container externo */}
      {banner && (
        <div className="rounded-2xl overflow-hidden mb-12 border border-surface-400/20 shadow-2xl shadow-black/40">
          <img
            src={banner}
            alt={article.title}
            className="w-full object-cover"
            style={{ maxHeight: '480px' }}
          />
        </div>
      )}

      {/* Coluna de leitura: max 850px, centralizada */}
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>

        {/* Tags / categoria */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          <span className="tag">{article.category}</span>
          {article.tags.map((t) => (
            <span key={t} className="flex items-center gap-1 text-xs text-slate-500">
              <Tag size={10} />{t}
            </span>
          ))}
        </div>

        {/* Título — clamp fluido entre 1.9rem e 4rem */}
        <h1
          className="font-display font-extrabold text-white mb-6"
          style={{
            fontSize: 'clamp(1.9rem, 6vw, 4rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          {article.title}
        </h1>

        {/* Autor / data / ações */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-surface-400/30">
          <div className="flex items-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <User size={14} className="text-cyan-400" />
              {article.authorName}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-cyan-400" />
              {date}
            </span>
          </div>
          {isAuthor && (
            <div className="flex items-center gap-2">
              <Link
                to={`/articles/${article.id}/edit`}
                className="btn-ghost text-sm py-2 flex items-center gap-1.5"
              >
                <Pencil size={14} /> Editar
              </Link>
              <button
                onClick={() => setShowDelete(true)}
                className="btn-danger text-sm py-2 flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Excluir
              </button>
            </div>
          )}
        </div>

        {/* Resumo — blockquote com destaque ciano */}
        <p
          className="text-slate-300 font-light italic border-l-2 border-cyan-400/50 pl-6 mb-12"
          style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', lineHeight: 1.75 }}
        >
          {article.summary}
        </p>

        {/* Corpo do artigo */}
        <div
          className="text-slate-300 whitespace-pre-wrap"
          style={{ fontSize: 'clamp(0.95rem, 2vw, 1.0625rem)', lineHeight: 1.85 }}
        >
          {article.content}
        </div>

        {/* Rodapé da leitura */}
        <div className="mt-16 pt-8 border-t border-surface-400/20">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-sm group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Ver todos os artigos
          </Link>
        </div>

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
