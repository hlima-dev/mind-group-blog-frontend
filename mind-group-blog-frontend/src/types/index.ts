export interface User {
  id: string;
  name: string;
  email: string;
}

export type ArticleStatus = 'draft' | 'published';

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  bannerImage: string | null;
  authorId: string;
  authorName: string;
  status: ArticleStatus;
  views: number;
  likesCount: number;
  likedByMe?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedArticles {
  data: Article[];
  pagination: Pagination;
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  parentId: string | null;
  content: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  replies: Comment[];
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface ArticleFormData {
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  status: ArticleStatus;
  bannerImage?: File | null;
}

export interface ArticleListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
}
