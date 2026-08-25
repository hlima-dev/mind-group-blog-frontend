import { useEffect, useState } from 'react';
import { Article, Pagination } from '../types';
import { articleService } from '../services/article.service';
import { ArticleCard } from '../components/ArticleCard';
import { PageLoader } from '../components/Spinner';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = ['Todos', 'Tecnologia', 'Negócios', 'Design', 'Carreira', 'Ciência', 'Saúde', 'Educação', 'Outros'];

export function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [page, setPage] = useState(1);

  // Debounce da busca — evita disparar uma requisição a cada tecla
  useEffect(() => {
    const timer = setTimeout(() => setPage(1), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    articleService
      .list({
        page,
        search: search || undefined,
        category: category !== 'Todos' ? category : undefined,
      })
      .then(({ data, pagination: p }) => {
        setArticles(data);
        setPagination(p);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, search]);

  const changePage = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <h1 className="section-title mb-2">Todos os artigos</h1>
        <p className="text-slate-500">
          {pagination ? `${pagination.total} publicações encontradas` : ' '}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            className="input pl-11"
            placeholder="Buscar por título ou resumo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <select
            className="input pl-10 pr-10 md:w-52"
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => { setCategory(c); setPage(1); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              category === c
                ? 'bg-cyan-400/10 border-cyan-400/40 text-cyan-400'
                : 'border-surface-400 text-slate-500 hover:border-surface-300 hover:text-slate-400'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? <PageLoader /> : (
        <>
          {articles.length === 0 ? (
            <div className="card p-16 text-center">
              <p className="text-slate-500">Nenhum artigo encontrado com esses filtros.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.map((a, i) => (
                  <div key={a.id} style={{ animation: `fadeUp 0.4s ease ${Math.min(i, 8) * 60}ms forwards`, opacity: 0 }}>
                    <ArticleCard article={a} featured />
                  </div>
                ))}
              </div>

              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-12">
                  <button
                    onClick={() => changePage(page - 1)}
                    disabled={page <= 1}
                    className="btn-ghost px-3 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm text-slate-500">
                    Página {pagination.page} de {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => changePage(page + 1)}
                    disabled={page >= pagination.totalPages}
                    className="btn-ghost px-3 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
