'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
  createdAt: string;
}

const emptyForm = {
  question: '',
  answer: '',
  order: 0,
  active: true,
};

export default function FaqPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [form, setForm] = useState(emptyForm);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/faq');
      if (!res.ok) throw new Error('Erreur serveur');
      const data = await res.json();
      setItems(data);
    } catch {
      toast.error('Impossible de charger la FAQ');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (item: FaqItem) => {
    setEditId(item.id);
    setForm({
      question: item.question,
      answer: item.answer,
      order: item.order,
      active: item.active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    setSaving(true);
    try {
      const url = editId ? `/api/admin/faq/${editId}` : '/api/admin/faq';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success(editId ? 'FAQ mise à jour' : 'FAQ ajoutée');
      setDialogOpen(false);
      fetchItems();
    } catch {
      toast.error("Une erreur s'est produite");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer cette question ?')) return;
    try {
      const res = await fetch(`/api/admin/faq/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success('FAQ supprimée');
      fetchItems();
    } catch {
      toast.error('Impossible de supprimer');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            FAQ
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gérez les questions fréquentes
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="gradient-main text-white hover:opacity-90 transition"
        >
          <Plus className="size-4 mr-2" />
          Ajouter
        </Button>
      </div>

      {/* Accordion list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <p className="text-muted-foreground">Aucune question trouvée</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const isOpen = expanded.has(item.id);
            return (
              <div
                key={item.id}
                className={`bg-card rounded-xl border border-border shadow-sm overflow-hidden transition-shadow hover:shadow-md ${
                  !item.active ? 'opacity-60' : ''
                }`}
              >
                <div
                  className="flex items-center gap-3 px-5 py-4 cursor-pointer"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground truncate">
                        {item.question}
                      </span>
                      {!item.active && (
                        <Badge variant="secondary" className="text-[10px] shrink-0">
                          Inactif
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">Ordre: {item.order}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(item);
                      }}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                    {isOpen ? (
                      <ChevronUp className="size-4 text-muted-foreground ml-1" />
                    ) : (
                      <ChevronDown className="size-4 text-muted-foreground ml-1" />
                    )}
                  </div>
                </div>
                {isOpen && (
                  <div className="px-5 pb-4 pt-0 border-t border-border">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap mt-3">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editId ? 'Modifier la question' : 'Nouvelle question'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="question">Question *</Label>
              <Input
                id="question"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                placeholder="La question fréquente"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">Réponse *</Label>
              <Textarea
                id="answer"
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                placeholder="La réponse détaillée"
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faq-order">Ordre d&apos;affichage</Label>
              <Input
                id="faq-order"
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <Label htmlFor="faq-active" className="cursor-pointer">Actif</Label>
              <Switch
                id="faq-active"
                checked={form.active}
                onCheckedChange={(checked) => setForm({ ...form, active: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="gradient-main text-white hover:opacity-90"
            >
              {saving && <Loader2 className="size-4 mr-2 animate-spin" />}
              {editId ? 'Mettre à jour' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}