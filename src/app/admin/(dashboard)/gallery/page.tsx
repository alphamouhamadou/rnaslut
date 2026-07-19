'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, ImageIcon as ImageIconLucide } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
  order: number;
  active: boolean;
  createdAt: string;
}

const emptyForm = {
  title: '',
  image: '',
  category: 'sensibilisation',
  order: 0,
  active: true,
};

const categories = ['sensibilisation', 'formation', 'partenaire'];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [form, setForm] = useState(emptyForm);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      if (!res.ok) throw new Error('Erreur serveur');
      const data = await res.json();
      setItems(data);
    } catch {
      toast.error('Impossible de charger la galerie');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filtered = filter === 'all' ? items : items.filter((i) => i.category === filter);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (item: GalleryItem) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      image: item.image,
      category: item.category,
      order: item.order,
      active: item.active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.image.trim()) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }
    setSaving(true);
    try {
      const url = editId ? `/api/admin/gallery/${editId}` : '/api/admin/gallery';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success(editId ? 'Élément mis à jour' : 'Élément ajouté');
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
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success('Élément supprimé');
      fetchItems();
    } catch {
      toast.error('Impossible de supprimer');
    }
  };

  const categoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'sensibilisation':
        return 'bg-rn-red/10 text-rn-red dark:bg-rn-red/20 dark:text-rn-red';
      case 'formation':
        return 'bg-rn-teal/10 text-rn-teal dark:bg-rn-teal/20 dark:text-rn-teal';
      case 'partenaire':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            Galerie
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gérez les images de la galerie du site
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

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'gradient-main text-white' : ''}
        >
          Tout ({items.length})
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'gradient-main text-white' : ''}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)} ({items.filter((i) => i.category === cat).length})
          </Button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <ImageIconLucide className="size-10 mx-auto mb-3 text-muted-foreground/40" />
          <p className="text-muted-foreground">Aucun élément trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-card rounded-xl border border-border shadow-sm overflow-hidden group transition-shadow hover:shadow-md ${
                !item.active ? 'opacity-60' : ''
              }`}
            >
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIconLucide className="size-10 text-muted-foreground/30" />
                  </div>
                )}
                {!item.active && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/60 text-white text-[10px]">
                      Inactif
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium text-sm text-foreground line-clamp-1">
                    {item.title}
                  </h3>
                  <Badge variant="outline" className={`text-[10px] shrink-0 ${categoryBadgeColor(item.category)}`}>
                    {item.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(item)}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id, item.title)}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editId ? 'Modifier l\'élément' : 'Nouvel élément'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Titre de l'image"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL de l&apos;image *</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/img/image1.jpeg"
              />
            </div>

            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Ordre d&apos;affichage</Label>
              <Input
                id="order"
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <Label htmlFor="active" className="cursor-pointer">Actif</Label>
              <Switch
                id="active"
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