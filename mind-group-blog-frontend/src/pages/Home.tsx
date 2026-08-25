import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { articleService } from '../services/article.service';
import { ArticleCard } from '../components/ArticleCard';
import { PageLoader } from '../components/Spinner';
import { ArrowRight, Zap, Users, BookOpen } from 'lucide-react';

export function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    articleService.list({ limit: 9 }).then(({ data }) => setArticles(data)).finally(() => setLoading(false));
  }, []);

  const featured = articles.slice(0, 3);
  const rest = articles.slice(3, 9);

  return (
    <div>
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-sm font-medium mb-8">
            <Zap size={13} />
            Blog da Mind Group — Case Técnico
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-tight mb-6 glow-cyan">
            Ideias que<br />
            <span className="text-cyan-400">movem</span> o mundo
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Artigos sobre tecnologia, design e inovação. Escrito por pessoas apaixonadas pelo que fazem.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/articles" className="btn-primary text-base px-8 py-3 flex items-center gap-2">
              Explorar artigos <ArrowRight size={16} />
            </Link>
            <Link to="/register" className="btn-ghost text-base px-8 py-3">Começar a publicar</Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { icon: BookOpen, label: 'Artigos', value: articles.length },
            { icon: Users, label: 'Autores', value: [...new Set(articles.map(a => a.authorId))].length },
            { icon: Zap, label: 'Categorias', value: [...new Set(articles.map(a => a.category))].length },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="card p-4 text-center">
              <Icon size={16} className="text-cyan-400 mx-auto mb-1.5" />
              <div className="font-display font-bold text-2xl text-white">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured articles */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Artigos em destaque</h2>
          <Link to="/articles" className="flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? <PageLoader /> : (
          <>
            {articles.length === 0 ? (
              <div className="card p-16 text-center">
                <p className="text-slate-500 mb-4">Nenhum artigo publicado ainda.</p>
                <Link to="/register" className="btn-primary">Seja o primeiro a publicar</Link>
              </div>
            ) : (
              <>
                {/* Featured grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                  {featured.map((a, i) => (
                    <div key={a.id} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms`, opacity: 0, animation: `fadeUp 0.5s ease ${i * 100}ms forwards` }}>
                      <ArticleCard article={a} featured />
                    </div>
                  ))}
                </div>

                {/* List */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rest.map((a) => (
                      <ArticleCard key={a.id} article={a} />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}
