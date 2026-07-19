'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, ExternalLink } from 'lucide-react';
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

interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
  order: number;
}

const emptyForm = {
  name: '',
  logo: '',
  url: '',
  order: 0,
};

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchPartners = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/partners');
      if (!res.ok) throw new Error('Erreur serveur');
      const data = await res.json();
      setPartners(data);
    } catch {
      toast.error('Impossible de charger les partenaires');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (partner: Partner) => {
    setEditId(partner.id);
    setForm({
      name: partner.name,
      logo: partner.logo,
      url: partner.url,
      order: partner.order,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.logo.trim()) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }
    setSaving(true);
    try {
      const url = editId ? `/api/admin/partners/${editId}` : '/api/admin/partners';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success(editId ? 'Partenaire mis à jour' : 'Partenaire ajouté');
      setDialogOpen(false);
      fetchPartners();
    } catch {
      toast.error("Une erreur s'est produite");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Supprimer le partenaire "${name}" ?`)) return;
    try {
      const res = await fetch(`/api/admin/partners/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success('Partenaire supprimé');
      fetchPartners();
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
            Partenaires
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gérez les partenaires du réseau
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : partners.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <p className="text-muted-foreground">Aucun partenaire trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-xl bg-muted overflow-hidden mb-4 flex items-center justify-center">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-2xl font-heading font-bold text-muted-foreground/30">
                      {partner.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-sm text-foreground mb-1">
                  {partner.name}
                </h3>
                {partner.url && (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-rn-red hover:underline flex items-center gap-1 mb-3"
                  >
                    Site web <ExternalLink className="size-3" />
                  </a>
                )}
                <div className="text-xs text-muted-foreground mb-3">
                  Ordre: {partner.order}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(partner)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(partner.id, partner.name)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
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
              {editId ? 'Modifier le partenaire' : 'Nouveau partenaire'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nom du partenaire"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">URL du logo *</Label>
              <Input
                id="logo"
                value={form.logo}
                onChange={(e) => setForm({ ...form, logo: e.target.value })}
                placeholder="/img/partenaire-logo.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Site web</Label>
              <Input
                id="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="partner-order">Ordre d&apos;affichage</Label>
              <Input
                id="partner-order"
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