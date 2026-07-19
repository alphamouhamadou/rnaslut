'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Trash2, Mail, MailOpen, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/messages');
      if (!res.ok) throw new Error('Erreur serveur');
      const data = await res.json();
      setMessages(data);
    } catch {
      toast.error('Impossible de charger les messages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleRead = async (msg: ContactMessage) => {
    try {
      const res = await fetch(`/api/admin/messages/${msg.id}`, { method: 'PUT' });
      if (!res.ok) throw new Error('Erreur serveur');
      const updated = await res.json();
      setMessages((prev) =>
        prev.map((m) => (m.id === updated.id ? { ...m, read: updated.read } : m)),
      );
      toast.success(updated.read ? 'Marqué comme lu' : 'Marqué comme non lu');
    } catch {
      toast.error("Impossible de changer le statut");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer ce message ?')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success('Message supprimé');
      fetchMessages();
    } catch {
      toast.error('Impossible de supprimer');
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            Messages
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {unreadCount > 0
              ? `${unreadCount} message${unreadCount > 1 ? 's' : ''} non lu${unreadCount > 1 ? 's' : ''}`
              : 'Tous les messages ont été lus'}
          </p>
        </div>
      </div>

      {/* Messages list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Mail className="size-10 mx-auto mb-3 text-muted-foreground/40" />
          <p className="text-muted-foreground">Aucun message reçu</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
          {messages.map((msg) => {
            const isOpen = expanded.has(msg.id);
            return (
              <div
                key={msg.id}
                className={`bg-card rounded-xl border border-border shadow-sm overflow-hidden transition-all hover:shadow-md ${
                  !msg.read ? 'border-l-4 border-l-rn-red' : ''
                }`}
              >
                <div className="px-5 py-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        msg.read
                          ? 'bg-muted text-muted-foreground'
                          : 'gradient-main text-white'
                      }`}
                    >
                      {msg.read ? (
                        <MailOpen className="size-4" />
                      ) : (
                        <Mail className="size-4" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`text-sm truncate ${msg.read ? 'text-muted-foreground' : 'font-semibold text-foreground'}`}>
                            {msg.name}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            &lt;{msg.email}&gt;
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRead(msg)}
                            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                            title={msg.read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                          >
                            {msg.read ? <Mail className="size-3.5 mr-1" /> : <MailOpen className="size-3.5 mr-1" />}
                            {msg.read ? 'Non lu' : 'Lu'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(msg.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpand(msg.id)}
                            className="h-8 w-8 p-0 text-muted-foreground"
                          >
                            {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                          </Button>
                        </div>
                      </div>

                      {msg.subject && (
                        <div className="text-sm font-medium text-foreground mb-1 truncate">
                          {msg.subject}
                        </div>
                      )}

                      {!isOpen && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {msg.message}
                        </p>
                      )}

                      <div className="text-xs text-muted-foreground/60 mt-1.5">
                        {new Date(msg.createdAt).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Expanded message */}
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-border pl-14">
                      <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}