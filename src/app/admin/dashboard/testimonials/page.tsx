'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Loader2, AlertCircle } from 'lucide-react';

interface Testimonial {
  id: string;
  clientName: string;
  businessName: string;
  review: string;
  rating: number;
  photo: string | null;
  status: string;
}

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    clientName: '',
    businessName: '',
    review: '',
    rating: 5,
    photo: '',
    status: 'ACTIVE',
  });

  const [saving, setSaving] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/testimonials');
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (err: any) {
      setError(err.message || 'Error occurred while loading data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleEdit = (test: Testimonial) => {
    setEditingId(test.id);
    setFormData({
      clientName: test.clientName,
      businessName: test.businessName,
      review: test.review,
      rating: test.rating,
      photo: test.photo || '',
      status: test.status,
    });
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      clientName: '',
      businessName: '',
      review: '',
      rating: 5,
      photo: '',
      status: 'ACTIVE',
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete testimonial');
      setTestimonials(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error deleting testimonial');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch('/api/admin/testimonials', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to save testimonial.');

      setIsFormOpen(false);
      fetchTestimonials();
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
          <h1 className="text-3xl font-black text-brandBlue tracking-tight">Manage Testimonials</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Configure customer reviews & ratings</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2.5 bg-brandBlue hover:bg-brandOrange text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add New Review</span>
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
              <h2 className="text-xl font-black text-brandBlue">{editingId ? 'Edit Review' : 'Add New Review'}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-semibold text-slate-600 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Client Name</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Business / Shop Name</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Vikas Retailers"
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-black text-brandBlue uppercase">Client Review Content</label>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  rows={4}
                  className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Review Rating (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Client Avatar (Optional)</label>
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    placeholder="/images/testimonials/avatar.jpg"
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
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
                <span>Save Review Details</span>
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
                <th className="p-4 md:p-6">Client Name</th>
                <th className="p-4 md:p-6">Business</th>
                <th className="p-4 md:p-6 text-center">Rating</th>
                <th className="p-4 md:p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-slate-600">
              {testimonials.map((test) => (
                <tr key={test.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 md:p-6 font-extrabold text-brandBlue">{test.clientName}</td>
                  <td className="p-4 md:p-6">{test.businessName}</td>
                  <td className="p-4 md:p-6 text-center">{test.rating} Stars</td>
                  <td className="p-4 md:p-6 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(test)}
                      className="p-2 border border-slate-200 hover:border-brandBlue hover:text-brandBlue rounded-lg transition-colors bg-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(test.id)}
                      className="p-2 border border-slate-200 hover:border-red-500 hover:text-red-500 rounded-lg transition-colors bg-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-400 italic">No reviews registered in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
