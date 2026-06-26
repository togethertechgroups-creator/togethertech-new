'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Loader2, AlertCircle } from 'lucide-react';

interface Package {
  id: string;
  packageName: string;
  price: string;
  description: string;
  features: string;
  isRecommended: boolean;
  status: string;
}

export default function PackagesAdminPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    packageName: '',
    price: '',
    description: '',
    features: '',
    isRecommended: false,
    status: 'ACTIVE',
  });

  const [saving, setSaving] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/packages');
      if (!res.ok) throw new Error('Failed to fetch packages');
      const data = await res.json();
      setPackages(data.packages || []);
    } catch (err: any) {
      setError(err.message || 'Error occurred while loading data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleEdit = (pkg: Package) => {
    setEditingId(pkg.id);
    setFormData({
      packageName: pkg.packageName,
      price: pkg.price,
      description: pkg.description,
      features: pkg.features,
      isRecommended: pkg.isRecommended,
      status: pkg.status,
    });
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      packageName: '',
      price: '',
      description: '',
      features: '',
      isRecommended: false,
      status: 'ACTIVE',
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    try {
      const res = await fetch(`/api/admin/packages?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete package');
      setPackages(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error deleting package');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch('/api/admin/packages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to save package.');

      setIsFormOpen(false);
      fetchPackages();
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
          <h1 className="text-3xl font-black text-brandBlue tracking-tight">Manage Packages</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Configure pricing plans & features</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2.5 bg-brandBlue hover:bg-brandOrange text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add New Package</span>
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
              <h2 className="text-xl font-black text-brandBlue">{editingId ? 'Edit Package' : 'Add New Package'}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Package Name</label>
                  <input
                    type="text"
                    value={formData.packageName}
                    onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                    placeholder="e.g. Basic Website"
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Price Tag</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. ₹7,000 or ₹10,000 - ₹15,000"
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-black text-brandBlue uppercase">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-black text-brandBlue uppercase">Features (Comma-separated)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Up to 5 pages, Mobile-friendly design, Contact Form"
                  rows={3}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="isRecommended"
                    checked={formData.isRecommended}
                    onChange={(e) => setFormData({ ...formData, isRecommended: e.target.checked })}
                    className="w-4 h-4 text-brandOrange border-slate-200 rounded focus:ring-brandOrange"
                  />
                  <label htmlFor="isRecommended" className="text-xs font-extrabold text-brandBlue uppercase select-none">
                    Recommend Package (Most Popular badge)
                  </label>
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Status</label>
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
                <span>Save Package Details</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* List Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-brandOrange animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brandBlue text-white text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 md:p-6">Package Name</th>
                <th className="p-4 md:p-6">Price</th>
                <th className="p-4 md:p-6">Featured</th>
                <th className="p-4 md:p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-slate-600">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 md:p-6 font-extrabold text-brandBlue">{pkg.packageName}</td>
                  <td className="p-4 md:p-6">{pkg.price}</td>
                  <td className="p-4 md:p-6">
                    {pkg.isRecommended ? (
                      <span className="px-2 py-0.5 rounded bg-brandOrange text-white font-bold text-xxs">YES</span>
                    ) : (
                      <span className="text-slate-400 font-bold text-xxs">NO</span>
                    )}
                  </td>
                  <td className="p-4 md:p-6 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="p-2 border border-slate-200 hover:border-brandBlue hover:text-brandBlue rounded-lg transition-colors bg-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="p-2 border border-slate-200 hover:border-red-500 hover:text-red-500 rounded-lg transition-colors bg-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {packages.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-400 italic">No packages registered in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
