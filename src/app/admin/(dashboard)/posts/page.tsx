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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Événement',
  image: '',
  readTime: '3 min',
  published: true,
};

const categories = ['Événement', 'Formation', 'Partenariat', 'Sensibilisation'];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9àâäéèêëïîôùûüÿç\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function PostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/posts');
      if (!res.ok) throw new Error('Erreur serveur');
      const data = await res.json();
      setPosts(data);
    } catch {
      toast.error('Impossible de charger les articles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image,
      readTime: post.readTime,
      published: post.published,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }

    setSaving(true);
    try {
      const url = editId ? `/api/admin/posts/${editId}` : '/api/admin/posts';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success(editId ? 'Article mis à jour' : 'Article créé');
      setDialogOpen(false);
      fetchPosts();
    } catch {
      toast.error("Une erreur s'est produite");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Supprimer l'article "${title}" ?`)) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success('Article supprimé');
      fetchPosts();
    } catch {
      toast.error("Impossible de supprimer l'article");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            Articles
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gérez les articles de blog du site
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="gradient-main text-white hover:opacity-90 transition"
        >
          <Plus className="size-4 mr-2" />
          Ajouter un article
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <p className="text-muted-foreground">Aucun article trouvé</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                    Titre
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden md:table-cell">
                    Catégorie
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground">
                    Statut
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-right px-6 py-3 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground truncate max-w-xs">
                        {post.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-xs">
                        /{post.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <Badge variant="outline" className="font-normal">
                        {post.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={post.published ? 'default' : 'secondary'}
                        className={
                          post.published
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : ''
                        }
                      >
                        {post.published ? 'Publié' : 'Brouillon'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell whitespace-nowrap">
                      {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(post)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post.id, post.title)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editId ? 'Modifier l\'article' : 'Nouvel article'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => {
                  setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) });
                }}
                placeholder="Titre de l'article"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="url-de-l-article"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Extrait *</Label>
              <Textarea
                id="excerpt"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Résumé bref de l'article"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenu *</Label>
              <Textarea
                id="content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Contenu complet de l'article"
                rows={8}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Temps de lecture</Label>
                <Input
                  id="readTime"
                  value={form.readTime}
                  onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                  placeholder="3 min"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL de l&apos;image</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/img/image1.jpeg"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <div>
                <Label htmlFor="published" className="cursor-pointer">Publié</Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  L&apos;article sera visible sur le site
                </p>
              </div>
              <Switch
                id="published"
                checked={form.published}
                onCheckedChange={(checked) => setForm({ ...form, published: checked })}
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