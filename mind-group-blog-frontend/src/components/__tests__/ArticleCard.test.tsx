import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ArticleCard } from '../ArticleCard';
import { Article } from '../../types';

const baseArticle: Article = {
  id: 'a1',
  title: 'Meu artigo de teste',
  summary: 'Um resumo qualquer',
  content: 'Conteúdo',
  category: 'Tecnologia',
  tags: ['react'],
  bannerImage: null,
  authorId: 'u1',
  authorName: 'Ana',
  status: 'published',
  views: 10,
  likesCount: 4,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

function renderCard(article: Article, featured = false) {
  return render(
    <MemoryRouter>
      <ArticleCard article={article} featured={featured} />
    </MemoryRouter>,
  );
}

describe('ArticleCard', () => {
  it('mostra título, autor e link para o artigo', () => {
    renderCard(baseArticle, true);

    expect(screen.getByText('Meu artigo de teste')).toBeInTheDocument();
    expect(screen.getByText('Ana')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/articles/a1');
  });

  it('sinaliza rascunho com um selo visível', () => {
    renderCard({ ...baseArticle, status: 'draft' }, true);
    expect(screen.getByText('RASCUNHO')).toBeInTheDocument();
  });

  it('não mostra o selo de rascunho para artigos publicados', () => {
    renderCard(baseArticle, true);
    expect(screen.queryByText('RASCUNHO')).not.toBeInTheDocument();
  });
});
