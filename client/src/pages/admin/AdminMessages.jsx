import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Trash2, CheckCircle2, Loader2, Clock, Check } from 'lucide-react';
import portfolioService from '../../services/portfolioService';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await portfolioService.getMessages();
      setMessages(res.data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await portfolioService.updateMessageStatus(id, status);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status } : m))
      );
      setToast(`Message marked as ${status}`);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await portfolioService.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      setToast('Message deleted.');
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Failed to delete message.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Contact Messages Inbox</h1>
          <p className="text-xs text-text-muted mt-1 font-mono">
            Manage inquiries received from the portfolio contact form.
          </p>
        </div>
        {toast && (
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {toast}
          </span>
        )}
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
        </div>
      ) : messages.length === 0 ? (
        <div className="py-16 text-center rounded-2xl glass-panel">
          <MessageSquare className="w-10 h-10 text-text-subtle mx-auto mb-2" />
          <p className="text-sm text-text-muted">No contact messages received yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`rounded-2xl glass-panel p-6 space-y-4 transition-all ${
                msg.status === 'new' ? 'border-primary/40 bg-primary/[0.02]' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">{msg.name}</h3>
                    <span className="text-xs text-primary font-mono">&lt;{msg.email}&gt;</span>
                    {msg.status === 'new' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-primary/20 text-primary-light border border-primary/40">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-text-subtle font-mono mt-1">
                    Subject: <strong className="text-white">{msg.subject}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </a>

                  {msg.status !== 'read' && (
                    <button
                      onClick={() => handleStatusChange(msg._id, 'read')}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-text-muted hover:text-white"
                    >
                      Mark Read
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-text leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>

              <div className="text-[10px] font-mono text-text-subtle flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Received: {new Date(msg.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
