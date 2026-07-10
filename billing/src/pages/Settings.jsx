import React, { useState } from 'react';

export default function Settings({ settings, setSettings, showToast }) {
  const [businessName, setBusinessName] = useState(settings?.businessName || '');
  const [gstin, setGstin] = useState(settings?.gstin || '');
  const [address, setAddress] = useState(settings?.address || '');
  const [website, setWebsite] = useState(settings?.website || '');
  const [email, setEmail] = useState(settings?.email || '');
  const [phone, setPhone] = useState(settings?.phone || '');
  const [accountNum, setAccountNum] = useState(settings?.accountNum || '');
  const [swift, setSwift] = useState(settings?.swift || '');
  const [branch, setBranch] = useState(settings?.branch || '');
  const [brandColor, setBrandColor] = useState(settings?.brandColor || '#0058be');
  const [saving, setSaving] = useState(false);
  const [signatures, setSignatures] = useState(settings?.signatures || []);
  const [newSigLabel, setNewSigLabel] = useState('');
  const [newSigImage, setNewSigImage] = useState('');

  const handleSigFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSigImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSignature = () => {
    if (!newSigLabel.trim()) {
      showToast('Please enter a signature label');
      return;
    }
    if (!newSigImage) {
      showToast('Please select a signature image');
      return;
    }
    
    const newSig = {
      id: 'SIG-' + Date.now(),
      label: newSigLabel.trim(),
      image: newSigImage
    };
    
    setSignatures([...signatures, newSig]);
    setNewSigLabel('');
    setNewSigImage('');
    showToast('Signature added to list (save changes to persist)');
  };

  const handleDeleteSignature = (id) => {
    setSignatures(signatures.filter(sig => sig.id !== id));
    showToast('Signature removed (save changes to persist)');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSettings({
        businessName,
        gstin,
        address,
        website,
        email,
        phone,
        accountNum,
        swift,
        branch,
        brandColor,
        signatures,
      });
      setSaving(false);
      showToast('Settings saved successfully!');
    }, 800);
  };

  return (
    <div className="flex-grow overflow-y-auto p-lg w-full custom-scrollbar space-y-xl">
      <div className="w-full space-y-xl p-xs">
        <div className="mb-xl">
          <h1 className="font-display-lg text-display-lg text-primary mb-xs font-bold">Company Settings</h1>
          <p className="text-on-surface-variant font-body-md">Manage your business profile and branding for generated invoices and financial documents.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-gutter">
          {/* Section: Brand Identity */}
          <section className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-none space-y-md">
            <div className="flex items-center gap-sm mb-lg border-b border-outline-variant pb-md">
              <span className="material-symbols-outlined text-secondary">palette</span>
              <h2 className="font-title-sm text-title-sm text-primary font-bold">Brand Identity</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-xl">
              <div className="space-y-md">
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs font-bold text-xs">Company Logo</label>
                <div className="flex items-center gap-lg">
                  <div className="h-24 w-24 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col items-center justify-center overflow-hidden shrink-0">
                    <img src="/logo.webp" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 space-y-md">
                    <p className="text-body-sm text-on-surface-variant mb-md text-gray-500">Logo loaded from public/logo.webp. Change the file in the project public directory to update the logo.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-md">
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs font-bold text-xs">Primary Brand Color</label>
                <div className="flex items-center gap-md">
                  <input
                    className="h-12 w-24 p-1 rounded-lg border border-outline-variant bg-white cursor-pointer"
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                  />
                  <div className="flex-grow">
                    <input
                      className="w-full border border-outline-variant rounded-lg px-md py-sm font-data-mono text-data-mono focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface bg-white"
                      type="text"
                      value={brandColor.toUpperCase()}
                      onChange={(e) => setBrandColor(e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-body-sm text-on-surface-variant text-gray-500">This color is used as the accent color across documents.</p>
              </div>
            </div>
          </section>

          {/* Section: Digital Signatures */}
          <section className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-none space-y-md">
            <div className="flex items-center gap-sm mb-lg border-b border-outline-variant pb-md">
              <span className="material-symbols-outlined text-secondary">draw</span>
              <h2 className="font-title-sm text-title-sm text-primary font-bold">Digital Signatures</h2>
            </div>
            
            <div className="space-y-md">
              <p className="text-body-sm text-on-surface-variant text-gray-500">
                Upload and manage signatures. These signatures can be selected in the preview page to be embedded on invoices and quotations.
              </p>
              
              <div className="grid md:grid-cols-2 gap-xl">
                {/* Upload Form */}
                <div className="space-y-md p-md bg-surface-container-low rounded-xl border border-outline-variant">
                  <h3 className="font-bold text-sm text-[#242f3e]">Add New Signature</h3>
                  
                  <div className="space-y-sm">
                    <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-xs">Signature Label / Name</label>
                    <input
                      className="w-full border border-outline-variant rounded-lg px-md py-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface bg-white text-xs"
                      placeholder="e.g. Authorized Signatory, Manager, CEO"
                      type="text"
                      value={newSigLabel}
                      onChange={(e) => setNewSigLabel(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-sm">
                    <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-xs">Signature Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSigFileChange}
                      className="w-full text-xs text-on-surface-variant file:mr-md file:py-xs file:px-sm file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-container file:text-on-primary-container hover:file:bg-primary-container/85 cursor-pointer"
                    />
                  </div>

                  {newSigImage && (
                    <div className="h-20 w-full max-w-[200px] border border-dashed border-outline-variant rounded-lg flex items-center justify-center p-xs bg-white">
                      <img src={newSigImage} alt="Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleAddSignature}
                    className="w-full py-md bg-primary text-white rounded-full font-label-caps text-label-caps flex items-center justify-center gap-sm hover:brightness-110 shadow-sm transition-all active:scale-95 cursor-pointer font-bold text-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Add Signature
                  </button>
                </div>
                
                {/* Signatures List */}
                <div className="space-y-md">
                  <h3 className="font-bold text-sm text-[#242f3e]">Uploaded Signatures</h3>
                  {signatures.length === 0 ? (
                    <div className="p-xl text-center border border-dashed border-outline-variant rounded-xl bg-surface-container-low text-on-surface-variant text-gray-500 text-sm">
                      No signatures uploaded yet. Add one on the left.
                    </div>
                  ) : (
                    <div className="space-y-sm">
                      {signatures.map((sig, idx) => (
                        <div key={sig.id || idx} className="flex items-center justify-between p-md border border-outline-variant rounded-xl bg-white shadow-sm">
                          <div className="flex items-center gap-md">
                            <div className="h-12 w-20 bg-surface-container-low rounded-lg border border-outline-variant flex items-center justify-center overflow-hidden p-xs shrink-0">
                              <img src={sig.image} alt={sig.label} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-[#242f3e]">{sig.label}</p>
                              <p className="text-xs text-gray-500">Ready to use in preview</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteSignature(sig.id)}
                            className="h-8 w-8 text-red-600 hover:bg-red-50 rounded-full flex items-center justify-center transition-all cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Section: Business Details */}
          <section className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-none space-y-md">
            <div className="flex items-center gap-sm mb-lg border-b border-outline-variant pb-md">
              <span className="material-symbols-outlined text-secondary">business_center</span>
              <h2 className="font-title-sm text-title-sm text-primary font-bold">Business Details</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-md">
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-xs">Business Name</label>
                <input
                  className="w-full border border-outline-variant rounded-lg px-md py-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface bg-white"
                  placeholder="e.g. Acme Corp Inc."
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-xs">GST / Tax Identification Number</label>
                <input
                  className="w-full border border-outline-variant rounded-lg px-md py-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface bg-white"
                  placeholder="e.g. 27AAAAA0000A1Z5"
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-xs">Website URL</label>
                <input
                  className="w-full border border-outline-variant rounded-lg px-md py-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface bg-white"
                  placeholder="togethertechgroups.in"
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-xs">Business Email</label>
                <input
                  className="w-full border border-outline-variant rounded-lg px-md py-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface bg-white"
                  placeholder="togethertechgroups@gmail.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-xs md:col-span-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-xs">Contact Number</label>
                <input
                  className="w-full border border-outline-variant rounded-lg px-md py-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface bg-white"
                  placeholder="+91 90475 49682"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              <div className="md:col-span-2 space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-xs">Registered Office Address</label>
                <textarea
                  className="w-full border border-outline-variant rounded-lg px-md py-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none resize-none text-on-surface bg-white"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          {/* Section: Bank Information */}
          <section className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-none space-y-md">
            <div className="flex items-center gap-sm mb-lg border-b border-outline-variant pb-md">
              <span className="material-symbols-outlined text-secondary">account_balance</span>
              <h2 className="font-title-sm text-title-sm text-primary font-bold">Bank Information</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-md">
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-xs">Account Number</label>
                <input
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-data-mono text-data-mono focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface bg-white"
                  placeholder="XXXX XXXX XXXX"
                  type="text"
                  value={accountNum}
                  onChange={(e) => setAccountNum(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-xs">IFSC / SWIFT Code</label>
                <input
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-data-mono text-data-mono focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface bg-white"
                  placeholder="ABCD0123456"
                  type="text"
                  value={swift}
                  onChange={(e) => setSwift(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-xs">Branch Name</label>
                <input
                  className="w-full border border-outline-variant rounded-lg px-md py-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface bg-white"
                  placeholder="e.g. Downtown Branch"
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="mt-md p-md bg-surface-container-low rounded-lg flex items-start gap-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">info</span>
              <p className="text-body-sm text-on-surface-variant">Bank details are automatically appended to the footer of every quotation and invoice generated by the system for easy wire transfers.</p>
            </div>
          </section>

          {/* Save Actions */}
          <div className="pt-lg flex items-center justify-end gap-md">
            <button
              type="button"
              onClick={() => showToast('Changes discarded')}
              className="px-xl py-md border border-outline-variant rounded-full font-label-caps text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-all active:scale-95 cursor-pointer font-bold text-xs bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-xl py-md bg-secondary text-white rounded-full font-label-caps text-label-caps flex items-center gap-sm hover:brightness-110 shadow-md transition-all active:scale-95 cursor-pointer font-bold text-xs"
            >
              {saving ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                  Saving Changes...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
