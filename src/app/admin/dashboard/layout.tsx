import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import AdminSidebar from '@/components/AdminSidebar';

const JWT_SECRET = process.env.JWT_SECRET || 'together-tech-groups-secret-jwt-key-2026';

export const metadata = {
  title: 'Admin Dashboard | Together Tech Groups',
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-brandPlatinum text-brandDark flex flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 lg:pl-64 min-h-screen flex flex-col">
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
