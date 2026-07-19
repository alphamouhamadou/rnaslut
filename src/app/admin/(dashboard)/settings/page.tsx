'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, Save, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

interface SettingEntry {
  key: string;
  value: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (!res.ok) throw new Error('Erreur serveur');
      const data: Record<string, string> = await res.json();
      const entries = Object.entries(data).map(([key, value]) => ({ key, value }));
      setSettings(entries);
    } catch {
      toast.error('Impossible de charger les paramètres');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      toast.success('Paramètres enregistrés');
    } catch {
      toast.error("Une erreur s'est produite");
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    if (!newKey.trim()) {
      toast.error('La clé est requise');
      return;
    }
    if (settings.some((s) => s.key === newKey.trim())) {
      toast.error('Cette clé existe déjà');
      return;
    }
    setSettings([...settings, { key: newKey.trim(), value: newValue.trim() }]);
    setNewKey('');
    setNewValue('');
    toast.success('Paramètre ajouté (non encore enregistré)');
  };

  const handleDelete = (key: string) => {
    if (!window.confirm(`Supprimer le paramètre "${key}" ?`)) return;
    setSettings(settings.filter((s) => s.key !== key));
    toast.info('Paramètre retiré (non encore enregistré)');
  };

  const updateValue = (key: string, value: string) => {
    setSettings(settings.map((s) => (s.key === key ? { ...s, value } : s)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            Paramètres
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Configuration générale du site
          </p>
        </div>
        <Button
          onClick={handleSaveAll}
          disabled={saving}
          className="gradient-main text-white hover:opacity-90 transition"
        >
          {saving ? (
            <Loader2 className="size-4 mr-2 animate-spin" />
          ) : (
            <Save className="size-4 mr-2" />
          )}
          Enregistrer tout
        </Button>
      </div>

      {/* Add new setting */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground mb-3">Ajouter un paramètre</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Label htmlFor="new-key" className="text-xs text-muted-foreground mb-1">
              Clé
            </Label>
            <Input
              id="new-key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="nom_du_parametre"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="new-value" className="text-xs text-muted-foreground mb-1">
              Valeur
            </Label>
            <Input
              id="new-value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Valeur du paramètre"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleAdd}
              variant="outline"
              className="whitespace-nowrap"
            >
              <Plus className="size-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </div>
      </div>

      {/* Settings list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : settings.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <KeyRound className="size-10 mx-auto mb-3 text-muted-foreground/40" />
          <p className="text-muted-foreground">Aucun paramètre configuré</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="divide-y divide-border">
            {settings.map((setting) => (
              <div
                key={setting.key}
                className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2 sm:w-1/3 shrink-0">
                  <code className="text-xs font-mono bg-muted px-2 py-1 rounded text-foreground">
                    {setting.key}
                  </code>
                </div>
                <div className="flex-1 min-w-0">
                  <Input
                    value={setting.value}
                    onChange={(e) => updateValue(setting.key, e.target.value)}
                    className="text-sm"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(setting.key)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive shrink-0"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}