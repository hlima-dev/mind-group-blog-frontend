import { Link } from 'react-router-dom';
import { Article } from '../types';
import { getBannerUrl } from '../services/article.service';
import { Calendar, User, Tag, ArrowRight, Heart, Eye } from 'lucide-react';

interface Props {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: Props) {
  const banner = getBannerUrl(article.bannerImage);
  const date = new Date(article.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  if (featured) {
    return (
      <Link to={`/articles/${article.id}`} className="group block card-hover p-0 overflow-hidden">
        <div className="relative h-56 bg-surface-600 overflow-hidden">
          {banner ? (
            <img src={banner} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl opacity-10 font-display font-bold text-cyan-400">MG</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-700/90 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 tag">{article.category}</span>
          {article.status === 'draft' && (
            <span className="absolute top-4 right-4 text-[10px] font-semibold px-2 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-400">
              RASCUNHO
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mb-3">
            {article.title}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-2 mb-4">{article.summary}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><User size={11} />{article.authorName}</span>
              <span className="flex items-center gap-1"><Calendar size={11} />{date}</span>
              <span className="flex items-center gap-1"><Heart size={11} />{article.likesCount}</span>
              <span className="flex items-center gap-1"><Eye size={11} />{article.views}</span>
            </div>
            <ArrowRight size={16} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/articles/${article.id}`} className="group flex gap-4 card-hover p-4 items-start">
      <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-surface-600 overflow-hidden">
        {banner ? (
          <img src={banner} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xl opacity-20 font-display font-bold text-cyan-400">MG</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="tag text-[10px]">{article.category}</span>
        </div>
        <h3 className="font-display font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 text-sm mb-1">
          {article.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><User size={10} />{article.authorName}</span>
          <span className="flex items-center gap-1"><Calendar size={10} />{date}</span>
        </div>
      </div>
    </Link>
  );
}
