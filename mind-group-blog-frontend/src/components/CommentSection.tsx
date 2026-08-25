import { useEffect, useState } from 'react';
import { Comment } from '../types';
import { commentService } from '../services/comment.service';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { MessageCircle, Trash2, CornerDownRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  articleId: string;
}

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'agora mesmo';
  if (minutes < 60) return `${minutes}min atrás`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h atrás`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d atrás`;
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

function CommentItem({
  comment,
  onReply,
  onDelete,
  depth = 0,
}: {
  comment: Comment;
  onReply: (parentId: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  depth?: number;
}) {
  const { user, isAuthenticated } = useAuth();
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSending(true);
    try {
      await onReply(comment.id, replyText.trim());
      setReplyText('');
      setReplying(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={depth > 0 ? 'ml-8 mt-4 pl-4 border-l border-surface-400/30' : 'mt-5'}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-white">{comment.authorName}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-500 text-xs">{timeAgo(comment.createdAt)}</span>
          </div>
          <p className="text-slate-300 text-sm mt-1 whitespace-pre-wrap">{comment.content}</p>
          <div className="flex items-center gap-4 mt-2">
            {isAuthenticated && (
              <button
                onClick={() => setReplying((v) => !v)}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
              >
                <CornerDownRight size={12} /> Responder
              </button>
            )}
            {user?.id === comment.userId && (
              <button
                onClick={() => onDelete(comment.id)}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={12} /> Excluir
              </button>
            )}
          </div>
        </div>
      </div>

      {replying && (
        <form onSubmit={handleReply} className="mt-3 flex gap-2">
          <input
            className="input py-2 text-sm flex-1"
            placeholder={`Respondendo a ${comment.authorName}...`}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={sending} className="btn-primary px-4 py-2 text-sm">
            Enviar
          </button>
        </form>
      )}

      {comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} onReply={onReply} onDelete={onDelete} depth={depth + 1} />
      ))}
    </div>
  );
}

export function CommentSection({ articleId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const { isAuthenticated } = useAuth();

  const load = () => {
    commentService.list(articleId).then(setComments).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [articleId]);

  const countAll = (list: Comment[]): number =>
    list.reduce((sum, c) => sum + 1 + countAll(c.replies), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSending(true);
    try {
      await commentService.create(articleId, content.trim());
      setContent('');
      load();
    } catch {
      toast.error('Erro ao publicar comentário.');
    } finally {
      setSending(false);
    }
  };

  const handleReply = async (parentId: string, text: string) => {
    try {
      await commentService.create(articleId, text, parentId);
      load();
    } catch {
      toast.error('Erro ao responder comentário.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await commentService.delete(id);
      load();
      toast.success('Comentário excluído.');
    } catch {
      toast.error('Erro ao excluir comentário.');
    }
  };

  return (
    <div className="mt-16 pt-10 border-t border-surface-400/20">
      <h2 className="font-display font-bold text-xl text-white flex items-center gap-2 mb-6">
        <MessageCircle size={18} className="text-cyan-400" />
        Comentários {!loading && `(${countAll(comments)})`}
      </h2>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
          <input
            className="input flex-1"
            placeholder="Deixe seu comentário..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" disabled={sending} className="btn-primary px-5">
            {sending ? 'Enviando...' : 'Comentar'}
          </button>
        </form>
      ) : (
        <p className="text-slate-500 text-sm mb-8">
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300">Faça login</Link> para comentar.
        </p>
      )}

      {loading ? (
        <p className="text-slate-600 text-sm">Carregando comentários...</p>
      ) : comments.length === 0 ? (
        <p className="text-slate-600 text-sm">Nenhum comentário ainda. Seja o primeiro!</p>
      ) : (
        comments.map((c) => (
          <CommentItem key={c.id} comment={c} onReply={handleReply} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}
