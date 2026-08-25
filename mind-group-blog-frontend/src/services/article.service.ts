import api from './api';
import { Article, ArticleFormData, ArticleListParams, PaginatedArticles } from '../types';

// Deriva a base de uploads da mesma variável usada pelo Axios,
// garantindo que imagens apontem para o servidor correto em qualquer ambiente.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const UPLOADS_BASE = `${API_URL}/uploads`;

export function getBannerUrl(filename: string | null): string | null {
  if (!filename) return null;
  // Compatibilidade: se já vier uma URL completa, usa direto
  if (filename.startsWith('http')) return filename;
  // Remove eventual prefixo "uploads/" gravado por versões antigas
  const clean = filename.replace(/^uploads\//, '');
  return `${UPLOADS_BASE}/${clean}`;
}

function buildFormData(formData: Partial<ArticleFormData>): FormData {
  const body = new FormData();
  if (formData.title !== undefined)    body.append('title', formData.title);
  if (formData.summary !== undefined)  body.append('summary', formData.summary);
  if (formData.content !== undefined)  body.append('content', formData.content);
  if (formData.category !== undefined) body.append('category', formData.category);
  if (formData.status !== undefined)   body.append('status', formData.status);
  if (formData.tags !== undefined)     body.append('tags', JSON.stringify(formData.tags));
  if (formData.bannerImage)            body.append('bannerImage', formData.bannerImage);
  return body;
}

export const articleService = {
  async list(params: ArticleListParams = {}): Promise<PaginatedArticles> {
    const { data } = await api.get<PaginatedArticles>('/articles', { params });
    return data;
  },

  async listMine(params: ArticleListParams = {}): Promise<PaginatedArticles> {
    const { data } = await api.get<PaginatedArticles>('/articles/mine', { params });
    return data;
  },

  async getById(id: string): Promise<Article> {
    const { data } = await api.get<Article>(`/articles/${id}`);
    return data;
  },

  async create(formData: ArticleFormData): Promise<Article> {
    const { data } = await api.post<Article>('/articles', buildFormData(formData));
    return data;
  },

  async update(id: string, formData: Partial<ArticleFormData>): Promise<Article> {
    const { data } = await api.put<Article>(`/articles/${id}`, buildFormData(formData));
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/articles/${id}`);
  },

  async toggleLike(id: string): Promise<{ liked: boolean; likesCount: number }> {
    const { data } = await api.post(`/articles/${id}/like`);
    return data;
  },
};
