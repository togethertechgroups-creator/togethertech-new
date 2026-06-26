'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface Enquiry {
  id: string;
  name: string;
  mobile: string;
  email: string;
  businessName: string | null;
  requiredService: string;
  budget: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function EnquiriesAdminPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statusOptions = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'];

  const fetchEnquiries = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/enquiries');
      if (!res.ok) throw new Error('Failed to retrieve enquiries');
      const data = await res.json();
      setEnquiries(data.enquiries || []);
    } catch (err: any) {
      setError(err.message || 'Error occurred while loading data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      
      // Update locally
      setEnquiries(prev =>
        prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err: any) {
      alert(err.message || 'Error updating status');
    }
  };

  const filteredEnquiries = enquiries.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.requiredService.toLowerCase().includes(search.toLowerCase()) ||
      (item.businessName && item.businessName.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-black text-brandBlue tracking-tight">Customer Enquiries</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Manage pipeline leads & status tags</p>
        </div>
        <button
          onClick={fetchEnquiries}
          className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors flex items-center space-x-1"
          title="Refresh Data"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, service..."
          className="flex-1 p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs bg-white outline-none focus:border-brandOrange focus:ring-1 focus:ring-brandOrange"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs bg-white outline-none focus:border-brandOrange"
        >
          <option value="All">All Statuses</option>
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-3 text-red-800 text-xs font-bold">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-brandOrange animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {filteredEnquiries.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:shadow-md transition-all"
            >
              {/* Left Column: Lead Info */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-xl text-brandBlue">{lead.name}</span>
                  {lead.businessName && (
                    <span className="px-2.5 py-0.5 rounded-md bg-brandPlatinum text-brandBlue text-xxs font-bold uppercase">
                      {lead.businessName}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500">
                  <a href={`tel:${lead.mobile}`} className="flex items-center space-x-1.5 hover:text-brandOrange">
                    <Phone className="w-4 h-4 text-brandOrange" />
                    <span>{lead.mobile}</span>
                  </a>
                  <a href={`mailto:${lead.email}`} className="flex items-center space-x-1.5 hover:text-brandOrange">
                    <Mail className="w-4 h-4 text-brandOrange" />
                    <span>{lead.email}</span>
                  </a>
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-brandOrange" />
                    <span>{new Date(lead.createdAt).toLocaleString()}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-xxs text-slate-500 font-bold block uppercase">Requested Service</span>
                    <span className="font-extrabold text-sm text-brandBlue">{lead.requiredService}</span>
                  </div>
                  <div>
                    <span className="text-xxs text-slate-500 font-bold block uppercase">Estimated Budget</span>
                    <span className="font-extrabold text-sm text-brandBlue">{lead.budget}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed font-semibold">
                  <span className="text-xxs text-slate-400 font-bold block uppercase mb-1">Message</span>
                  {lead.message}
                </div>
              </div>

              {/* Right Column: Status Manager */}
              <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col space-y-4">
                <span className="text-xxs text-slate-500 font-bold block uppercase">Pipeline Status</span>
                <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                  className={`w-full p-3 border rounded-xl text-xs font-extrabold outline-none bg-white ${
                    lead.status === 'NEW' ? 'border-blue-300 text-blue-800' :
                    lead.status === 'CONTACTED' ? 'border-amber-300 text-amber-800' :
                    lead.status === 'IN_PROGRESS' ? 'border-indigo-300 text-indigo-800' :
                    lead.status === 'CONVERTED' ? 'border-emerald-300 text-emerald-800' :
                    'border-slate-300 text-slate-800'
                  }`}
                >
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt}>{opt.replace('_', ' ')}</option>
                  ))}
                </select>
                <div className="text-xxs text-slate-400 font-bold leading-relaxed">
                  * Changing the status automatically updates the admin pipeline. Use CONVERTED for closed, won leads.
                </div>
              </div>
            </div>
          ))}

          {filteredEnquiries.length === 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 font-bold">
              No enquiries match the filters.
            </div>
          )}
        </div>
      )}

    </div>
  );
}
