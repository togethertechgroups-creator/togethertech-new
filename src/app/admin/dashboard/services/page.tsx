'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Loader2, AlertCircle } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  features: string;
  status: string;
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    image: '/images/services/custom.jpg',
    features: '',
    status: 'ACTIVE',
  });

  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/services');
      if (!res.ok) throw new Error('Failed to fetch services');
      const data = await res.json();
      setServices(data.services || []);
    } catch (err: any) {
      setError(err.message || 'Error occurred while loading data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (svc: Service) => {
    setEditingId(svc.id);
    setFormData({
      title: svc.title,
      slug: svc.slug,
      shortDescription: svc.shortDescription,
      fullDescription: svc.fullDescription,
      image: svc.image,
      features: svc.features,
      status: svc.status,
    });
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      image: '/images/services/custom.jpg',
      features: '',
      status: 'ACTIVE',
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service? This action is permanent.')) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete service');
      setServices(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error deleting service');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch('/api/admin/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to save service. Check slug duplicates.');
      
      setIsFormOpen(false);
      fetchServices();
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving data.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-black text-brandBlue tracking-tight">Manage Services</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Configure company IT and solutions</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2.5 bg-brandBlue hover:bg-brandOrange text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add New Service</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-3 text-red-800 text-xs font-bold">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Editor Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full border border-slate-200 shadow-xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-xl font-black text-brandBlue">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Service Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Unique Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. billing-software"
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-black text-brandBlue uppercase">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-black text-brandBlue uppercase">Full Description</label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  rows={4}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-black text-brandBlue uppercase">Features (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Image Asset Path</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Service Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3.5 bg-brandOrange hover:bg-brandBlue text-white font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors text-xs uppercase tracking-wider"
              >
                {saving ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Save className="w-4.5 h-4.5" />}
                <span>Save Service Details</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Services List Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-brandOrange animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brandBlue text-white text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 md:p-6">Service Title</th>
                <th className="p-4 md:p-6">Slug</th>
                <th className="p-4 md:p-6">Status</th>
                <th className="p-4 md:p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-slate-600">
              {services.map((svc) => (
                <tr key={svc.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 md:p-6 font-extrabold text-brandBlue">{svc.title}</td>
                  <td className="p-4 md:p-6">{svc.slug}</td>
                  <td className="p-4 md:p-6">
                    <span className={`px-2.5 py-0.5 rounded-full text-xxs font-bold ${
                      svc.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {svc.status}
                    </span>
                  </td>
                  <td className="p-4 md:p-6 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(svc)}
                      className="p-2 border border-slate-200 hover:border-brandBlue hover:text-brandBlue rounded-lg transition-colors bg-white"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(svc.id)}
                      className="p-2 border border-slate-200 hover:border-red-500 hover:text-red-500 rounded-lg transition-colors bg-white"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-400 italic">No services registered in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
