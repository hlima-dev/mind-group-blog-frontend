export interface User {
  id: string;
  name: string;
  email: string;
}

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
  createdAt: string;
  updatedAt: string;
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
  bannerImage?: File | null;
}
