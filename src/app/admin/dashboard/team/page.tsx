'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Loader2, AlertCircle } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  skills: string;
  socialLinks: string;
  status: string;
}

export default function TeamAdminPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    photo: '/images/team/custom.jpg',
    bio: '',
    skills: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    github: '',
    behance: '',
    email: '',
    status: 'ACTIVE',
  });

  const [saving, setSaving] = useState(false);

  const fetchTeam = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/team');
      if (!res.ok) throw new Error('Failed to fetch team members');
      const data = await res.json();
      setTeam(data.teamMembers || []);
    } catch (err: any) {
      setError(err.message || 'Error occurred while loading data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleEdit = (mem: TeamMember) => {
    setEditingId(mem.id);
    const social = JSON.parse(mem.socialLinks || '{}');
    setFormData({
      name: mem.name,
      role: mem.role,
      photo: mem.photo,
      bio: mem.bio,
      skills: mem.skills,
      facebook: social.facebook || '',
      twitter: social.twitter || '',
      linkedin: social.linkedin || '',
      github: social.github || '',
      behance: social.behance || '',
      email: social.email || '',
      status: mem.status,
    });
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      photo: '/images/team/custom.jpg',
      bio: '',
      skills: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      github: '',
      behance: '',
      email: '',
      status: 'ACTIVE',
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete team member');
      setTeam(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error deleting team member');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const { facebook, twitter, linkedin, github, behance, email, ...rest } = formData;
      const socialLinks = { facebook, twitter, linkedin, github, behance, email };
      
      const body = editingId 
        ? { ...rest, socialLinks, id: editingId } 
        : { ...rest, socialLinks };

      const res = await fetch('/api/admin/team', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to save team member.');

      setIsFormOpen(false);
      fetchTeam();
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
          <h1 className="text-3xl font-black text-brandBlue tracking-tight">Manage Team</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Configure company profiles & skills</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2.5 bg-brandBlue hover:bg-brandOrange text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add New Member</span>
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
              <h2 className="text-xl font-black text-brandBlue">{editingId ? 'Edit Team Member' : 'Add New Member'}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-semibold text-slate-600 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Role / Title</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Software Developer"
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-black text-brandBlue uppercase">Short Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-black text-brandBlue uppercase">Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React, Dart, Figma"
                  className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Github URL</label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Corporate Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandBlue uppercase">Avatar Path</label>
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl font-semibold"
                    required
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
                <span>Save Team Details</span>
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
                <th className="p-4 md:p-6">Name</th>
                <th className="p-4 md:p-6">Role</th>
                <th className="p-4 md:p-6">Status</th>
                <th className="p-4 md:p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-slate-600">
              {team.map((mem) => (
                <tr key={mem.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 md:p-6 font-extrabold text-brandBlue">{mem.name}</td>
                  <td className="p-4 md:p-6">{mem.role}</td>
                  <td className="p-4 md:p-6">
                    <span className={`px-2.5 py-0.5 rounded-full text-xxs font-bold ${
                      mem.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {mem.status}
                    </span>
                  </td>
                  <td className="p-4 md:p-6 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(mem)}
                      className="p-2 border border-slate-200 hover:border-brandBlue hover:text-brandBlue rounded-lg transition-colors bg-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(mem.id)}
                      className="p-2 border border-slate-200 hover:border-red-500 hover:text-red-500 rounded-lg transition-colors bg-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {team.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-400 italic">No team members registered in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
