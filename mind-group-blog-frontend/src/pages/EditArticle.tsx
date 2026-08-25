import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Article, ArticleFormData } from '../types';
import { articleService } from '../services/article.service';
import { ArticleForm } from '../components/ArticleForm';
import { PageLoader } from '../components/Spinner';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export function EditArticle() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    articleService.getById(id).then((data) => {
      if (data.authorId !== user?.id) {
        toast.error('Você não pode editar este artigo.');
        navigate('/dashboard');
        return;
      }
      setArticle(data);
    }).catch(() => {
      toast.error('Artigo não encontrado.');
      navigate('/dashboard');
    }).finally(() => setLoading(false));
  }, [id, user, navigate]);

  const handleSubmit = async (data: ArticleFormData) => {
    if (!article) return;
    setSaving(true);
    try {
      await articleService.update(article.id, data);
      toast.success('Artigo atualizado!');
      navigate(`/articles/${article.id}`);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Erro ao atualizar.';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <PageLoader />;
  if (!article) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-fade-up">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm mb-8 group">
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Voltar
      </button>

      <div className="mb-8">
        <h1 className="section-title mb-1">Editar artigo</h1>
        <p className="text-slate-500 truncate max-w-md">{article.title}</p>
      </div>

      <div className="card p-8">
        <ArticleForm
          initial={{
            title: article.title,
            summary: article.summary,
            content: article.content,
            category: article.category,
            tags: article.tags,
            status: article.status,
          }}
          onSubmit={handleSubmit}
          loading={saving}
          submitLabel="Salvar alterações"
        />
      </div>
    </div>
  );
}
