'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, ImageIcon as ImageIconLucide } from 'lucide-react';
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

interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  image: string;
  order: number;
  active: boolean;
  createdAt: string;
}

const emptyForm = {
  title: '',
  description: '',
  icon: 'fas fa-bullhorn',
  badge: 'Sensibilisation',
  image: '',
  order: 0,
  active: true,
};

const badgeOptions = ['Sensibilisation', 'Formation', 'Partenariat', 'Plaidoyer'];

const badgeColors: Record<string, string> = {
  Sensibilisation: 'bg-rn-red/10 text-rn-red dark:bg-rn-red/20 dark:text-rn-red',
  Formation: 'bg-rn-teal/10 text-rn-teal dark:bg-rn-teal/20 dark:text-rn-teal',
  Partenariat: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Plaidoyer: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchActivities = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/activities');
      if (!res.ok) throw new Error('Erreur serveur');
      const data = await res.json();
      setActivities(data);
    } catch {
      toast.error('Impossible de charger les activités');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (activity: Activity) => {
    setEditId(activity.id);
    setForm({
      title: activity.title,
      description: activity.description,
      icon: activity.icon,
      badge: activity.badge,
      image: activity.image,
      order: activity.order,
      active: activity.active,
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
      const url = editId ? `/api/admin/activities/${editId}` : '/api/admin/activities';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success(editId ? 'Activité mise à jour' : 'Activité ajoutée');
      setDialogOpen(false);
      fetchActivities();
    } catch {
      toast.error("Une erreur s'est produite");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Supprimer l'activité "${title}" ?`)) return;
    try {
      const res = await fetch(`/api/admin/activities/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success('Activité supprimée');
      fetchActivities();
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
            Activités
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gérez les activités du réseau
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

      {/* Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-56 w-full rounded-xl" />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <p className="text-muted-foreground">Aucune activité trouvée</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`bg-card rounded-xl border border-border shadow-sm overflow-hidden group transition-shadow hover:shadow-md ${
                !activity.active ? 'opacity-60' : ''
              }`}
            >
              {activity.image ? (
                <div className="relative aspect-[16/9] bg-muted overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] bg-muted/50 flex items-center justify-center">
                  <i className={`${activity.icon} text-3xl text-muted-foreground/30`} />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <i className={`${activity.icon} text-rn-red shrink-0`} />
                    <h3 className="font-medium text-foreground truncate">
                      {activity.title}
                    </h3>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] shrink-0 ${badgeColors[activity.badge] || ''}`}
                  >
                    {activity.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {!activity.active && (
                      <Badge variant="secondary" className="text-[10px]">Inactif</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">Ordre: {activity.order}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(activity)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(activity.id, activity.title)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editId ? 'Modifier l\'activité' : 'Nouvelle activité'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="act-title">Titre *</Label>
              <Input
                id="act-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Titre de l'activité"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="act-description">Description *</Label>
              <Textarea
                id="act-description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Description de l'activité"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="act-icon">Classe icône (FontAwesome)</Label>
                <Input
                  id="act-icon"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  placeholder="fas fa-bullhorn"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="act-badge">Badge</Label>
                <select
                  id="act-badge"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {badgeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="act-image">URL de l&apos;image</Label>
              <Input
                id="act-image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/img/image1.jpeg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="act-order">Ordre d&apos;affichage</Label>
              <Input
                id="act-order"
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <Label htmlFor="act-active" className="cursor-pointer">Actif</Label>
              <Switch
                id="act-active"
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