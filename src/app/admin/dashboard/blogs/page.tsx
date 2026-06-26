'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Loader2, AlertCircle } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  image: string;
  content: string;
  category: string;
  seoTitle: string | null;
  seoDescription: string | null;
  status: string;
}

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    image: '/images/blogs/custom.jpg',
    content: '',
    category: 'Software Development',
    seoTitle: '',
    seoDescription: '',
    status: 'PUBLISHED',
  });

  const [saving, setSaving] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/blogs');
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err: any) {
      setError(err.message || 'Error occurred while loading data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      image: blog.image,
      content: blog.content,
      category: blog.category,
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || '',
      status: blog.status,
    });
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      image: '/images/blogs/custom.jpg',
      content: '',
      category: 'Software Development',
      seoTitle: '',
      seoDescription: '',
      status: 'PUBLISHED',
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete blog');
      setBlogs(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error deleting blog');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch('/api/admin/blogs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to save blog. Check slug duplicates.');

      setIsFormOpen(false);
      fetchBlogs();
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
          <h1 className="text-3xl font-black text-brandBlue tracking-tight">Manage Blogs</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Configure company articles & news</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2.5 bg-brandBlue hover:bg-brandOrange text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add New Article</span>
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
              <h2 className="text-xl font-black text-brandBlue">{editingId ? 'Edit Article' : 'Write New Article'}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-semibold text-slate-600 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Blog Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Slug (Unique URL)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. why-custom-crm-is-better"
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Software Development"
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Blog Cover Image Path</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-black text-brandBlue uppercase">Blog Content (supports HTML tags)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  placeholder="<p>Blog post content here...</p><h2>Subheading</h2>"
                  className="w-full p-3 border border-slate-200 rounded-xl font-semibold font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">SEO Meta Title (Optional)</label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">SEO Meta Description (Optional)</label>
                  <input
                    type="text"
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1 max-w-xs">
                <label className="text-xxs font-black text-brandBlue uppercase">Publish Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="DRAFT">DRAFT</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3.5 bg-brandOrange hover:bg-brandBlue text-white font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors text-xs uppercase tracking-wider"
              >
                {saving ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Save className="w-4.5 h-4.5" />}
                <span>Save Blog Details</span>
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
                <th className="p-4 md:p-6">Blog Title</th>
                <th className="p-4 md:p-6">Category</th>
                <th className="p-4 md:p-6">Status</th>
                <th className="p-4 md:p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-slate-600">
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 md:p-6 font-extrabold text-brandBlue line-clamp-1 max-w-xs">{blog.title}</td>
                  <td className="p-4 md:p-6">{blog.category}</td>
                  <td className="p-4 md:p-6">
                    <span className={`px-2.5 py-0.5 rounded-full text-xxs font-bold ${
                      blog.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="p-4 md:p-6 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 border border-slate-200 hover:border-brandBlue hover:text-brandBlue rounded-lg transition-colors bg-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 border border-slate-200 hover:border-red-500 hover:text-red-500 rounded-lg transition-colors bg-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-400 italic">No blogs registered in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
