import { useEffect, useState } from 'react';
import { Article } from '../types';
import { articleService } from '../services/article.service';
import { ArticleCard } from '../components/ArticleCard';
import { PageLoader } from '../components/Spinner';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = ['Todos', 'Tecnologia', 'Negócios', 'Design', 'Carreira', 'Ciência', 'Saúde', 'Educação', 'Outros'];

export function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filtered, setFiltered] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');

  useEffect(() => {
    articleService.list().then((data) => {
      setArticles(data);
      setFiltered(data);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = articles;
    if (category !== 'Todos') result = result.filter((a) => a.category === category);
    if (search) result = result.filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );
    setFiltered(result);
  }, [search, category, articles]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <h1 className="section-title mb-2">Todos os artigos</h1>
        <p className="text-slate-500">{articles.length} publicações encontradas</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            className="input pl-11"
            placeholder="Buscar por título, resumo ou tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <select className="input pl-10 pr-10 md:w-52" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
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
          {filtered.length === 0 ? (
            <div className="card p-16 text-center">
              <p className="text-slate-500">Nenhum artigo encontrado com esses filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((a, i) => (
                <div key={a.id} style={{ animation: `fadeUp 0.4s ease ${Math.min(i, 8) * 60}ms forwards`, opacity: 0 }}>
                  <ArticleCard article={a} featured />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
