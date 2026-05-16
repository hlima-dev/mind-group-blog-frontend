import { AlertTriangle, X } from 'lucide-react';

interface Props {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmModal({ title = 'Excluir artigo', description = 'Esta ação não pode ser desfeita. Deseja continuar?', onConfirm, onCancel, loading }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <div className="relative card p-6 w-full max-w-sm animate-fade-up">
        <button onClick={onCancel} className="absolute top-4 right-4 text-ink-muted hover:text-ink-primary transition-colors">
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={18} className="text-red-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-ink-primary">{title}</h3>
            <p className="text-xs text-ink-secondary mt-0.5">{description}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} className="btn-ghost flex-1 justify-center" disabled={loading}>
            Cancelar
          </button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm bg-red-500 text-white hover:bg-red-400 transition-all duration-200 disabled:opacity-50">
            {loading ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
}
