'use client';

import { useState, useEffect } from 'react';
import { Settings, Save, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function WebsiteSettingsAdminPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    email: '',
    whatsapp: '',
    address: '',
    logo: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    seoTitle: '',
    seoDescription: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      const settings = data.settings || {};
      
      const socialLinks = JSON.parse(settings.socialLinks || '{}');

      setFormData({
        companyName: settings.companyName || '',
        phone: settings.phone || '',
        email: settings.email || '',
        whatsapp: settings.whatsapp || '',
        address: settings.address || '',
        logo: settings.logo || '',
        facebook: socialLinks.facebook || '',
        twitter: socialLinks.twitter || '',
        linkedin: socialLinks.linkedin || '',
        instagram: socialLinks.instagram || '',
        seoTitle: settings.seoTitle || '',
        seoDescription: settings.seoDescription || '',
      });
    } catch (err: any) {
      setError(err.message || 'Error fetching website settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const { facebook, twitter, linkedin, instagram, ...rest } = formData;
      const socialLinks = JSON.stringify({ facebook, twitter, linkedin, instagram });

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...rest, socialLinks }),
      });

      if (!res.ok) throw new Error('Failed to update website settings');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving data.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-8 h-8 text-brandOrange animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-black text-brandBlue tracking-tight">Website Settings</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Configure global variables & SEO metadata</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-3 text-red-800 text-xs font-bold">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3 text-emerald-800 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Website settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        
        {/* Core Info */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-lg text-brandBlue border-b border-slate-100 pb-2">Core Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xxs font-black text-brandBlue uppercase">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xxs font-black text-brandBlue uppercase">Logo Path / URL</label>
              <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-xxs font-black text-brandBlue uppercase">Office Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xxs font-black text-brandBlue uppercase">WhatsApp Number</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xxs font-black text-brandBlue uppercase">Corporate Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xxs font-black text-brandBlue uppercase">Office Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs"
              required
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-lg text-brandBlue border-b border-slate-100 pb-2">Social Networks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xxs font-black text-brandBlue uppercase">Facebook URL</label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xxs font-black text-brandBlue uppercase">Twitter URL</label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xxs font-black text-brandBlue uppercase">LinkedIn URL</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xxs font-black text-brandBlue uppercase">Instagram URL</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs"
              />
            </div>
          </div>
        </div>

        {/* SEO Parameters */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-lg text-brandBlue border-b border-slate-100 pb-2">Global SEO & Meta</h3>
          <div className="space-y-1">
            <label className="text-xxs font-black text-brandBlue uppercase">SEO Meta Title</label>
            <input
              type="text"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xxs font-black text-brandBlue uppercase">SEO Meta Description</label>
            <textarea
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 rounded-xl bg-brandOrange hover:bg-brandBlue text-white hover:text-white font-bold transition-all duration-300 shadow-orange-glow text-sm flex items-center justify-center space-x-2"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Save Website Settings</span>
              <Save className="w-4 h-4" />
            </>
          )}
        </button>

      </form>
    </div>
  );
}
