'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  HelpCircle,
  Handshake,
  Activity,
  Target,
  BarChart3,
  Mail,
  Settings,
  LogOut,
} from 'lucide-react';

interface AdminSidebarProps {
  userName: string;
}

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Articles', href: '/admin/posts', icon: FileText },
  { label: 'Galerie', href: '/admin/gallery', icon: ImageIcon },
  { label: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { label: 'Partenaires', href: '/admin/partners', icon: Handshake },
  { label: 'Activités', href: '/admin/activities', icon: Activity },
  { label: 'Perspectives', href: '/admin/perspectives', icon: Target },
  { label: 'Statistiques', href: '/admin/stats', icon: BarChart3 },
  { label: 'Messages', href: '/admin/messages', icon: Mail },
  { label: 'Paramètres', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar({ userName }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-full bg-rn-dark text-white z-50 flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <Image
          src="/img/logo-officiel.jpg"
          alt="RN-ASLUT"
          width={40}
          height={40}
          className="rounded-full object-cover shrink-0"
        />
        <div className="min-w-0">
          <div className="font-heading text-lg font-bold tracking-tight text-white">
            RN-ASLUT
          </div>
          <div className="text-[11px] text-white/50 truncate">Administration</div>
        </div>
      </div>

      {/* User info */}
      <div className="px-5 py-3 border-b border-white/10">
        <div className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
          Connecté en tant que
        </div>
        <div className="text-sm font-medium text-white/90 truncate">{userName}</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 custom-scrollbar">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-rn-red text-white shadow-lg shadow-rn-red/30'
                      : 'text-white/60 hover:text-white hover:bg-white/8'
                  }`}
                >
                  <Icon className="size-[18px] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 pt-2 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all duration-200 w-full"
        >
          <LogOut className="size-[18px] shrink-0" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}