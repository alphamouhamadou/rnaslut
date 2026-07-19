import { db } from '@/lib/db';
import {
  FileText,
  ImageIcon,
  HelpCircle,
  Handshake,
  Mail,
  MailOpen,
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const [postsCount, galleryCount, faqCount, partnersCount, unreadMessages, recentMessages] =
    await Promise.all([
      db.blogPost.count(),
      db.galleryItem.count(),
      db.faqItem.count(),
      db.partner.count(),
      db.contactMessage.count({ where: { read: false } }),
      db.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

  const overviewCards = [
    {
      label: 'Articles',
      value: postsCount,
      icon: FileText,
      href: '/admin/posts',
      color: 'from-rn-red to-rn-orange',
    },
    {
      label: 'Galerie',
      value: galleryCount,
      icon: ImageIcon,
      href: '/admin/gallery',
      color: 'from-rn-orange to-rn-yellow',
    },
    {
      label: 'FAQ',
      value: faqCount,
      icon: HelpCircle,
      href: '/admin/faq',
      color: 'from-rn-teal to-emerald-400',
    },
    {
      label: 'Partenaires',
      value: partnersCount,
      icon: Handshake,
      href: '/admin/partners',
      color: 'from-amber-500 to-orange-400',
    },
    {
      label: 'Messages non lus',
      value: unreadMessages,
      icon: Mail,
      href: '/admin/messages',
      color: 'from-rn-red to-rose-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Tableau de bord
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Vue d&apos;ensemble du contenu et des activités du site
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center shadow-sm`}
                >
                  <Icon className="size-5 text-white" />
                </div>
              </div>
              <div className="text-2xl font-heading font-bold text-foreground">
                {card.value}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">{card.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Recent Messages */}
      <div className="bg-card rounded-xl border border-border shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-lg font-heading font-bold text-foreground">
              Messages récents
            </h2>
            <p className="text-sm text-muted-foreground">
              Les 5 derniers messages reçus
            </p>
          </div>
          <Link
            href="/admin/messages"
            className="text-sm text-rn-red hover:text-rn-red-dark font-medium transition-colors"
          >
            Voir tout →
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted-foreground">
            <MailOpen className="size-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">Aucun message pour le moment</p>
          </div>
        ) : (
          <div className="divide-y divide-border max-h-96 overflow-y-auto">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="px-6 py-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-foreground truncate">
                        {msg.name}
                      </span>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-rn-red shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{msg.email}</p>
                    {msg.subject && (
                      <p className="text-sm font-medium text-foreground mt-1 truncate">
                        {msg.subject}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {msg.message}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}