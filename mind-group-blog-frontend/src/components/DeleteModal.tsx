import { AlertTriangle, X } from 'lucide-react';

interface Props {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function DeleteModal({ title, onConfirm, onCancel, loading }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-surface-900/80 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative card p-8 max-w-md w-full border-red-500/20 animate-fade-up">
        <button onClick={onCancel} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors">
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertTriangle size={24} className="text-red-400" />
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-white mb-2">Excluir artigo</h3>
            <p className="text-slate-400 text-sm">
              Tem certeza que deseja excluir{' '}
              <span className="text-white font-medium">"{title}"</span>? Esta ação não pode ser desfeita.
            </p>
          </div>

          <div className="flex gap-3 w-full mt-2">
            <button onClick={onCancel} className="btn-ghost flex-1">Cancelar</button>
            <button onClick={onConfirm} disabled={loading} className="flex-1 btn-danger">
              {loading ? 'Excluindo...' : 'Excluir'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
