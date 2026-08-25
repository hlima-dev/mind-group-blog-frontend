import { describe, it, expect } from 'vitest';
import { getBannerUrl } from '../article.service';

describe('getBannerUrl', () => {
  it('retorna null quando não há imagem', () => {
    expect(getBannerUrl(null)).toBeNull();
  });

  it('mantém uma URL completa como está', () => {
    expect(getBannerUrl('https://res.cloudinary.com/x/image.jpg')).toBe(
      'https://res.cloudinary.com/x/image.jpg',
    );
  });

  it('monta a URL a partir de um nome de arquivo simples', () => {
    expect(getBannerUrl('capa.jpg')).toBe('http://localhost:3000/uploads/capa.jpg');
  });

  it('remove o prefixo "uploads/" de arquivos salvos por versões antigas', () => {
    expect(getBannerUrl('uploads/capa.jpg')).toBe('http://localhost:3000/uploads/capa.jpg');
  });
});
