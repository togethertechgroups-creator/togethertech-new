import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddCustomer({ customers, setCustomers, showToast }) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gstin, setGstin] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !gstin || !email) {
      showToast('Customer Name, GSTIN, and Email Address are required.', 'error_outline');
      return;
    }

    setLoading(true);
    const newId = 'CUST-' + String(Date.now()).slice(-4);
    const fullAddress = street ? `${street}, ${city}, ${state} ${zip}` : 'No address recorded';
    
    const newCust = {
      id: newId,
      name,
      gstin,
      email,
      phone,
      address: fullAddress,
      status: 'ACTIVE',
      spend: 0,
      tier: 'Standard Partner'
    };

    setTimeout(() => {
      setCustomers([...customers, newCust]);
      setLoading(false);
      showToast('Customer registered successfully!');
      navigate('/customers');
    }, 1000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-lg max-w-4xl mx-auto w-full custom-scrollbar space-y-xl">
      {/* Header */}
      <div>
        <h2 className="font-headline-md text-2xl font-bold text-primary dark:text-white">Register New Customer</h2>
        <p className="text-on-surface-variant font-body-sm">Add a new client to the ledger directory.</p>
      </div>

      {/* Onboarding Form */}
      <form onSubmit={handleSubmit} className="space-y-lg">
        {/* Basic Information */}
        <section className="bg-white dark:bg-surface-container-low border border-outline-variant dark:border-outline rounded-xl overflow-hidden shadow-sm">
          <div className="px-md py-sm bg-surface-container-low dark:bg-primary-container/30 border-b border-outline-variant/30">
            <h3 className="font-title-sm text-sm font-bold text-primary dark:text-white">Basic Information</h3>
          </div>
          <div className="p-md grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant block">Company Name</label>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-sm border border-outline-variant dark:border-outline rounded-lg bg-transparent font-body-md text-on-surface"
                required
              />
            </div>
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant block">Primary Contact Person</label>
              <input
                type="text"
                placeholder="John Doe"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full p-sm border border-outline-variant dark:border-outline rounded-lg bg-transparent font-body-md text-on-surface"
              />
            </div>
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant block">Email Address</label>
              <input
                type="email"
                placeholder="billing@acme.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-sm border border-outline-variant dark:border-outline rounded-lg bg-transparent font-body-md text-on-surface"
                required
              />
            </div>
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant block">Phone Number</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-sm border border-outline-variant dark:border-outline rounded-lg bg-transparent font-body-md text-on-surface"
              />
            </div>
          </div>
        </section>

        {/* Tax Information */}
        <section className="bg-white dark:bg-surface-container-low border border-outline-variant dark:border-outline rounded-xl overflow-hidden shadow-sm">
          <div className="px-md py-sm bg-surface-container-low dark:bg-primary-container/30 border-b border-outline-variant/30">
            <h3 className="font-title-sm text-sm font-bold text-primary dark:text-white">Tax & Identification</h3>
          </div>
          <div className="p-md grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant block">GST/Tax Identification Number</label>
              <input
                type="text"
                placeholder="27AAACF4582G1ZX"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full p-sm border border-outline-variant dark:border-outline rounded-lg bg-transparent font-body-md text-on-surface font-data-mono"
                required
              />
            </div>
          </div>
        </section>

        {/* Billing Address */}
        <section className="bg-white dark:bg-surface-container-low border border-outline-variant dark:border-outline rounded-xl overflow-hidden shadow-sm">
          <div className="px-md py-sm bg-surface-container-low dark:bg-primary-container/30 border-b border-outline-variant/30">
            <h3 className="font-title-sm text-sm font-bold text-primary dark:text-white">Billing Address</h3>
          </div>
          <div className="p-md space-y-md">
            <div className="space-y-xs">
              <label class="font-label-caps text-label-caps text-on-surface-variant block">Street Address</label>
              <input
                type="text"
                placeholder="123 Financial Plaza"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full p-sm border border-outline-variant dark:border-outline rounded-lg bg-transparent font-body-md text-on-surface"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant block">City</label>
                <input
                  type="text"
                  placeholder="New York"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-sm border border-outline-variant dark:border-outline rounded-lg bg-transparent font-body-md text-on-surface"
                />
              </div>
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant block">State</label>
                <input
                  type="text"
                  placeholder="NY"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-sm border border-outline-variant dark:border-outline rounded-lg bg-transparent font-body-md text-on-surface"
                />
              </div>
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant block">Zip Code</label>
                <input
                  type="text"
                  placeholder="10001"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full p-sm border border-outline-variant dark:border-outline rounded-lg bg-transparent font-body-md text-on-surface font-data-mono"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end gap-md pt-md">
          <button
            type="button"
            onClick={() => navigate('/customers')}
            className="px-xl py-sm border border-outline text-primary dark:text-white rounded-full hover:bg-surface-container transition-all cursor-pointer font-bold text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-xl py-sm bg-secondary text-white rounded-full hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-sm shadow-md cursor-pointer font-bold text-xs"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                Saving...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">save</span>
                Save Customer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
