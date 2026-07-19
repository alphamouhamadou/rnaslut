'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
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

interface Perspective {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  active: boolean;
  createdAt: string;
}

const emptyForm = {
  title: '',
  description: '',
  icon: 'fas fa-star',
  order: 0,
  active: true,
};

export default function PerspectivesPage() {
  const [items, setItems] = useState<Perspective[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/perspectives');
      if (!res.ok) throw new Error('Erreur serveur');
      const data = await res.json();
      setItems(data);
    } catch {
      toast.error('Impossible de charger les perspectives');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (item: Perspective) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      icon: item.icon,
      order: item.order,
      active: item.active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }
    setSaving(true);
    try {
      const url = editId ? `/api/admin/perspectives/${editId}` : '/api/admin/perspectives';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success(editId ? 'Perspective mise à jour' : 'Perspective ajoutée');
      setDialogOpen(false);
      fetchItems();
    } catch {
      toast.error("Une erreur s'est produite");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Supprimer "${title}" ?`)) return;
    try {
      const res = await fetch(`/api/admin/perspectives/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success('Perspective supprimée');
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
            Perspectives
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gérez les perspectives et objectifs futurs
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

      {/* Timeline */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <p className="text-muted-foreground">Aucune perspective trouvée</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rn-red via-rn-orange to-rn-yellow" />

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`relative ml-14 bg-card rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow ${
                  !item.active ? 'opacity-60' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[2.55rem] top-6 w-5 h-5 rounded-full bg-gradient-to-br from-rn-red to-rn-orange border-4 border-background shadow-sm" />

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <i className={`${item.icon} text-rn-red text-lg shrink-0`} />
                      <h3 className="font-heading font-bold text-foreground">
                        {item.title}
                      </h3>
                      {!item.active && (
                        <Badge variant="secondary" className="text-[10px] shrink-0">
                          Inactif
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {item.description}
                    </p>
                    <span className="text-xs text-muted-foreground/60 mt-2 inline-block">
                      Ordre: {item.order}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(item)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id, item.title)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editId ? 'Modifier la perspective' : 'Nouvelle perspective'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="persp-title">Titre *</Label>
              <Input
                id="persp-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Titre de la perspective"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="persp-description">Description *</Label>
              <Textarea
                id="persp-description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Description détaillée"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="persp-icon">Classe icône (FontAwesome)</Label>
              <Input
                id="persp-icon"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="fas fa-star"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="persp-order">Ordre d&apos;affichage</Label>
              <Input
                id="persp-order"
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <Label htmlFor="persp-active" className="cursor-pointer">Actif</Label>
              <Switch
                id="persp-active"
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