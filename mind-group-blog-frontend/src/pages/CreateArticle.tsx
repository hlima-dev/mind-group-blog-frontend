import { useNavigate } from 'react-router-dom';
import { ArticleForm } from '../components/ArticleForm';
import { articleService } from '../services/article.service';
import { ArticleFormData } from '../types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export function CreateArticle() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: ArticleFormData) => {
    setLoading(true);
    try {
      const article = await articleService.create(data);
      toast.success('Artigo publicado com sucesso!');
      navigate(`/articles/${article.id}`);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Erro ao publicar artigo.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-fade-up">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm mb-8 group">
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Voltar
      </button>

      <div className="mb-8">
        <h1 className="section-title mb-1">Novo artigo</h1>
        <p className="text-slate-500">Compartilhe seu conhecimento com o mundo</p>
      </div>

      <div className="card p-8">
        <ArticleForm onSubmit={handleSubmit} loading={loading} submitLabel="Publicar artigo" />
      </div>
    </div>
  );
}
