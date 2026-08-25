import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 15000,
});

// Interceptor: injeta o token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mg_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function clearSession() {
  localStorage.removeItem('mg_token');
  localStorage.removeItem('mg_refresh_token');
  localStorage.removeItem('mg_user');
}

function redirectToLogin() {
  clearSession();
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
}

// Endpoints "pré-sessão": um 401 aqui é resultado normal (senha errada,
// token expirado), não sinal de sessão expirada — não deve tentar
// renovar nem redirecionar, só devolver o erro pro formulário mostrar.
const AUTH_ENTRY_ENDPOINTS = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email',
];

let refreshInFlight: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  const refreshToken = localStorage.getItem('mg_refresh_token');
  if (!refreshToken) return false;

  if (!refreshInFlight) {
    refreshInFlight = api
      .post('/auth/refresh', { refreshToken })
      .then((response) => {
        localStorage.setItem('mg_token', response.data.token);
        localStorage.setItem('mg_refresh_token', response.data.refreshToken);
        return true;
      })
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null;
      });
  }

  return refreshInFlight;
}

// Interceptor: tenta renovar a sessão num 401 antes de derrubar o usuário
// (o access token dura só 15min agora); se não der, manda pro login.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const isAuthEntryCall = config?.url && AUTH_ENTRY_ENDPOINTS.includes(config.url);

    if (response?.status === 401 && config && !config._retry && !isAuthEntryCall) {
      config._retry = true;
      const refreshed = await tryRefresh();
      if (refreshed) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('mg_token')}`;
        return api(config);
      }
      redirectToLogin();
      return Promise.reject(error);
    }

    if (response?.status === 401 && !isAuthEntryCall) {
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

export default api;
