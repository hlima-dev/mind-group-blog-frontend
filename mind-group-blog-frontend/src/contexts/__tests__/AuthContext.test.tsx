import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

function Probe() {
  const { isAuthenticated, user } = useAuth();
  return <span>{isAuthenticated ? `logado:${user?.name}` : 'deslogado'}</span>;
}

beforeEach(() => {
  localStorage.clear();
});

describe('AuthProvider — sessão pré-refresh-token', () => {
  it('encerra silenciosamente uma sessão salva antes do refresh token existir', async () => {
    // Simula o localStorage de alguém que logou antes do refresh token
    // ser introduzido: só tinha mg_token, sem mg_refresh_token.
    localStorage.setItem('mg_token', 'token-antigo');
    localStorage.setItem('mg_user', JSON.stringify({ id: '1', name: 'Ana', email: 'ana@example.com' }));

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );

    await waitFor(() => expect(screen.getByText('deslogado')).toBeInTheDocument());
    expect(localStorage.getItem('mg_token')).toBeNull();
    expect(localStorage.getItem('mg_user')).toBeNull();
  });

  it('mantém a sessão quando o refresh token também está salvo', async () => {
    localStorage.setItem('mg_token', 'token-valido');
    localStorage.setItem('mg_refresh_token', 'refresh-valido');
    localStorage.setItem('mg_user', JSON.stringify({ id: '1', name: 'Ana', email: 'ana@example.com' }));

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );

    await waitFor(() => expect(screen.getByText('logado:Ana')).toBeInTheDocument());
  });

  it('limpa a sessão se o usuário salvo estiver corrompido', async () => {
    localStorage.setItem('mg_token', 'token-valido');
    localStorage.setItem('mg_refresh_token', 'refresh-valido');
    localStorage.setItem('mg_user', '{json-invalido');

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );

    await waitFor(() => expect(screen.getByText('deslogado')).toBeInTheDocument());
    expect(localStorage.getItem('mg_token')).toBeNull();
  });
});
