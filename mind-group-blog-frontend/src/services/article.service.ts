import api from './api';
import { Article, ArticleFormData } from '../types';

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

export const articleService = {
  async list(category?: string): Promise<Article[]> {
    const params = category ? { category } : {};
    const { data } = await api.get<Article[]>('/articles', { params });
    return data;
  },

  async getById(id: string): Promise<Article> {
    const { data } = await api.get<Article>(`/articles/${id}`);
    return data;
  },

  async create(formData: ArticleFormData): Promise<Article> {
    const body = new FormData();
    body.append('title', formData.title);
    body.append('summary', formData.summary);
    body.append('content', formData.content);
    body.append('category', formData.category);
    body.append('tags', JSON.stringify(formData.tags));
    if (formData.bannerImage) body.append('bannerImage', formData.bannerImage);
    const { data } = await api.post<Article>('/articles', body);
    return data;
  },

  async update(id: string, formData: Partial<ArticleFormData>): Promise<Article> {
    const body = new FormData();
    if (formData.title)       body.append('title', formData.title);
    if (formData.summary)     body.append('summary', formData.summary);
    if (formData.content)     body.append('content', formData.content);
    if (formData.category)    body.append('category', formData.category);
    if (formData.tags)        body.append('tags', JSON.stringify(formData.tags));
    if (formData.bannerImage) body.append('bannerImage', formData.bannerImage);
    const { data } = await api.put<Article>(`/articles/${id}`, body);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/articles/${id}`);
  },
};
