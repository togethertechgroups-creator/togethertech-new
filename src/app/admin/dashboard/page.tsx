import Link from 'next/link';
import { prisma } from '@/lib/db';
import { 
  Mail, Briefcase, BookOpen, Layers, 
  ArrowRight, Clock, PlusCircle, CheckCircle
} from 'lucide-react';

export const revalidate = 0; // Dynamic server rendering

export default async function AdminDashboardPage() {
  const [
    enquiriesCount,
    portfoliosCount,
    blogsCount,
    servicesCount,
    recentEnquiries,
  ] = await Promise.all([
    prisma.enquiry.count(),
    prisma.portfolio.count(),
    prisma.blog.count(),
    prisma.service.count(),
    prisma.enquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const stats = [
    { name: 'Total Enquiries', value: enquiriesCount, icon: Mail, color: 'text-blue-600 bg-blue-100' },
    { name: 'Portfolio Projects', value: portfoliosCount, icon: Briefcase, color: 'text-amber-600 bg-amber-100' },
    { name: 'Blog Articles', value: blogsCount, icon: BookOpen, color: 'text-emerald-600 bg-emerald-100' },
    { name: 'Total Services', value: servicesCount, icon: Layers, color: 'text-indigo-600 bg-indigo-100' },
  ];

  return (
    <div className="space-y-10">
      
      {/* Header Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-brandBlue tracking-tight">Overview Dashboard</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Real-time statistics & activity logs</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/dashboard/portfolio"
            className="px-4 py-2 bg-brandBlue hover:bg-brandOrange text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Project</span>
          </Link>
          <Link
            href="/admin/dashboard/blogs"
            className="px-4 py-2 bg-brandBlue hover:bg-brandOrange text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write Blog</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className={`p-4 rounded-2xl ${stat.color} flex-shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xxs text-slate-500 font-bold uppercase tracking-wide block">{stat.name}</span>
                <span className="text-3xl font-black text-brandBlue block mt-1">{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Recent Leads & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Enquiries (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-brandBlue">Recent Enquiries</h2>
            <Link
              href="/admin/dashboard/enquiries"
              className="text-xs font-bold text-brandOrange hover:text-brandBlue transition-colors flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentEnquiries.map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-sm text-brandBlue">{lead.name}</span>
                    <span className="text-xxs text-slate-400 font-bold uppercase">• {lead.requiredService}</span>
                  </div>
                  <p className="text-xxs text-slate-500 italic">{lead.mobile} | {lead.email}</p>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xxs font-bold uppercase tracking-wider ${
                    lead.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                    lead.status === 'CONTACTED' ? 'bg-amber-100 text-amber-800' :
                    lead.status === 'IN_PROGRESS' ? 'bg-indigo-100 text-indigo-800' :
                    lead.status === 'CONVERTED' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {lead.status.replace('_', ' ')}
                  </span>
                  <span className="text-xxs text-slate-400 font-bold flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </span>
                </div>
              </div>
            ))}
            {recentEnquiries.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-6">No customer enquiries recorded yet.</p>
            )}
          </div>
        </div>

        {/* Quick Help & Status (1/3 width) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-black text-brandBlue border-b border-slate-100 pb-4">Quick Documentation</h2>
          <div className="space-y-4 text-xs font-semibold text-slate-600">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
              <span>Use the sidebar to edit services, client works, team competencies, and website metadata.</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
              <span>When a customer sends a form, they appear in "View Enquiries". You can modify progress tags as contacted/closed.</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
              <span>Database seed settings contains the global company telephone and corporate email address.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
