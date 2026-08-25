import api from './api';
import { Comment } from '../types';

export const commentService = {
  async list(articleId: string): Promise<Comment[]> {
    const { data } = await api.get<Comment[]>(`/articles/${articleId}/comments`);
    return data;
  },

  async create(articleId: string, content: string, parentId?: string): Promise<Comment> {
    const { data } = await api.post<Comment>(`/articles/${articleId}/comments`, { content, parentId });
    return data;
  },

  async delete(commentId: string): Promise<void> {
    await api.delete(`/articles/comments/${commentId}`);
  },
};
