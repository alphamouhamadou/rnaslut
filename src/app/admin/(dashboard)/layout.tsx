import { redirect } from 'next/navigation';
import { getSafeSession } from '@/lib/auth-nextauth';
import AdminSidebar from './AdminSidebar';
import AdminProviders from '@/components/admin/AdminProviders';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSafeSession();
  if (!session?.user) {
    redirect('/admin/login');
  }

  const userName = session.user.name || session.user.email || 'Admin';

  return (
    <AdminProviders session={session}>
      <div className="min-h-screen bg-rn-bg-light dark:bg-rn-dark flex">
        <AdminSidebar userName={userName} />
        <div className="flex-1 ml-64 p-6 min-h-screen">
          {children}
        </div>
      </div>
    </AdminProviders>
  );
}