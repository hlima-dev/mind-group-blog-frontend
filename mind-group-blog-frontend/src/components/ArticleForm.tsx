import { useState, useRef, ChangeEvent } from 'react';
import { ArticleFormData } from '../types';
import { ImagePlus, X, Plus } from 'lucide-react';

interface Props {
  initial?: Partial<ArticleFormData>;
  onSubmit: (data: ArticleFormData) => Promise<void>;
  loading: boolean;
  submitLabel: string;
}

const CATEGORIES = ['Tecnologia', 'Negócios', 'Design', 'Carreira', 'Ciência', 'Saúde', 'Educação', 'Outros'];

export function ArticleForm({ initial, onSubmit, loading, submitLabel }: Props) {
  const [form, setForm] = useState<ArticleFormData>({
    title: initial?.title || '',
    summary: initial?.summary || '',
    content: initial?.content || '',
    category: initial?.category || '',
    tags: initial?.tags || [],
    bannerImage: null,
  });
  const [tagInput, setTagInput] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof ArticleFormData, value: unknown) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    set('bannerImage', file);
    setPreview(URL.createObjectURL(file));
  };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t]);
    setTagInput('');
  };

  const removeTag = (tag: string) => set('tags', form.tags.filter((t) => t !== tag));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Banner upload */}
      <div>
        <label className="label">Imagem de Capa</label>
        <div
          onClick={() => fileRef.current?.click()}
          className="relative cursor-pointer group rounded-2xl border-2 border-dashed border-surface-400 hover:border-cyan-400/50 transition-colors overflow-hidden"
          style={{ minHeight: '180px' }}
        >
          {preview ? (
            <>
              <img src={preview} alt="preview" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-surface-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-sm text-white font-medium">Trocar imagem</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface-600 border border-surface-400 flex items-center justify-center group-hover:border-cyan-400/40 transition-colors">
                <ImagePlus size={20} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <p className="text-sm text-slate-500">Clique para enviar uma imagem</p>
              <p className="text-xs text-slate-600">JPG, PNG, WebP — máx. 5MB</p>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="label">Título *</label>
        <input
          className="input font-display text-lg"
          placeholder="Um título incrível para seu artigo..."
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          required
        />
      </div>

      {/* Summary */}
      <div>
        <label className="label">Resumo *</label>
        <textarea
          className="input resize-none"
          rows={3}
          placeholder="Uma breve descrição do que o artigo trata..."
          value={form.summary}
          onChange={(e) => set('summary', e.target.value)}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="label">Categoria *</label>
        <select
          className="input"
          value={form.category}
          onChange={(e) => set('category', e.target.value)}
          required
        >
          <option value="">Selecione uma categoria</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Tags */}
      <div>
        <label className="label">Tags</label>
        <div className="flex gap-2 mb-3 flex-wrap">
          {form.tags.map((tag) => (
            <span key={tag} className="tag flex items-center gap-1.5">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors">
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="ex: node.js"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
          />
          <button type="button" onClick={addTag} className="btn-ghost px-4 py-2.5 flex items-center gap-1.5">
            <Plus size={14} /> Adicionar
          </button>
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="label">Conteúdo *</label>
        <textarea
          className="input resize-y font-mono text-sm"
          rows={14}
          placeholder="Escreva o conteúdo completo do artigo aqui..."
          value={form.content}
          onChange={(e) => set('content', e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
        {loading ? 'Salvando...' : submitLabel}
      </button>
    </form>
  );
}
