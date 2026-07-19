'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface SiteStat {
  id: string;
  label: string;
  value: string;
  suffix: string;
  order: number;
}

const emptyForm = {
  label: '',
  value: '',
  suffix: '',
  order: 0,
};

export default function StatsPage() {
  const [stats, setStats] = useState<SiteStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (!res.ok) throw new Error('Erreur serveur');
      const data = await res.json();
      setStats(data);
    } catch {
      toast.error('Impossible de charger les statistiques');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (stat: SiteStat) => {
    setEditId(stat.id);
    setForm({
      label: stat.label,
      value: stat.value,
      suffix: stat.suffix,
      order: stat.order,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.label.trim() || !form.value.trim()) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }
    setSaving(true);
    try {
      const url = editId ? `/api/admin/stats/${editId}` : '/api/admin/stats';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success(editId ? 'Statistique mise à jour' : 'Statistique ajoutée');
      setDialogOpen(false);
      fetchStats();
    } catch {
      toast.error("Une erreur s'est produite");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, label: string) => {
    if (!window.confirm(`Supprimer "${label}" ?`)) return;
    try {
      const res = await fetch(`/api/admin/stats/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success('Statistique supprimée');
      fetchStats();
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
            Statistiques
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gérez les chiffres clés affichés sur le site
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

      {/* Stats cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      ) : stats.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Hash className="size-10 mx-auto mb-3 text-muted-foreground/40" />
          <p className="text-muted-foreground">Aucune statistique trouvée</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow relative group"
            >
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 gradient-main rounded-t-xl" />

              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-muted-foreground">Ordre: {stat.order}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(stat)}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(stat.id, stat.label)}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>

              <div className="text-3xl font-heading font-bold text-foreground mb-1">
                {stat.value}
                {stat.suffix && (
                  <span className="text-lg font-normal text-muted-foreground ml-1">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editId ? 'Modifier la statistique' : 'Nouvelle statistique'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="stat-label">Libellé *</Label>
              <Input
                id="stat-label"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="Ex: Personnes sensibilisées"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stat-value">Valeur *</Label>
                <Input
                  id="stat-value"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  placeholder="15000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stat-suffix">Suffixe</Label>
                <Input
                  id="stat-suffix"
                  value={form.suffix}
                  onChange={(e) => setForm({ ...form, suffix: e.target.value })}
                  placeholder="+"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stat-order">Ordre d&apos;affichage</Label>
              <Input
                id="stat-order"
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
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