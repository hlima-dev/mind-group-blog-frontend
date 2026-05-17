import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './routes/PrivateRoute';
import { MainLayout } from './layouts/MainLayout';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Articles } from './pages/Articles';
import { ArticleDetail } from './pages/ArticleDetail';
import { Dashboard } from './pages/Dashboard';
import { CreateArticle } from './pages/CreateArticle';
import { EditArticle } from './pages/EditArticle';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#080C10',
          }}
        >
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#161B22',
                color: '#e2e8f0',
                border: '1px solid #30363D',
                fontFamily: 'DM Sans, sans-serif',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#00D4FF', secondary: '#080C10' } },
              error: { iconTheme: { primary: '#f87171', secondary: '#080C10' } },
            }}
          />

          <div style={{ flex: 1 }}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<ArticleDetail />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/articles/new"
                  element={
                    <PrivateRoute>
                      <CreateArticle />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/articles/:id/edit"
                  element={
                    <PrivateRoute>
                      <EditArticle />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>

          <footer
            style={{
              textAlign: 'center',
              padding: '20px',
              color: '#8b949e',
              fontSize: '14px',
              borderTop: '1px solid #21262d',
              background: '#0d1117',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Mind Group Blog © 2026 — Desenvolvido por Lucas Lima Santos
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}