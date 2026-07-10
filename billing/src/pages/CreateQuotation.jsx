import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateQuotation({ settings, customers, documents, setDocuments, showToast }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  // Quotation form fields
  const [selectedClient, setSelectedClient] = useState('');
  const [clientDetails, setClientDetails] = useState(null);
  const [quoteNo, setQuoteNo] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [expiryDate, setExpiryDate] = useState(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  const [currency, setCurrency] = useState('INR - Indian Rupee');
  const [billingAddress, setBillingAddress] = useState('');
  const [notes, setNotes] = useState('This estimate is valid for 30 days. Final pricing is subject to revision upon requirement finalize.');
  const [gstPercent, setGstPercent] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);

  const [lineItems, setLineItems] = useState([
    { id: 1, desc: 'Enterprise Service Estimate', qty: 1, price: 15000.00 }
  ]);

  const currencySymbols = {
    'INR - Indian Rupee': '₹',
    'USD - US Dollar': '$',
    'EUR - Euro': '€',
    'GBP - British Pound': '£'
  };

  const activeSymbol = currencySymbols[currency] || '₹';

  // Load customer billing address dynamically
  useEffect(() => {
    const cust = customers.find(c => c.name === selectedClient);
    if (cust) {
      setClientDetails(cust);
      if (!isEditMode) {
        setBillingAddress(cust.address);
      }
    } else {
      setClientDetails(null);
    }
  }, [selectedClient, customers, isEditMode]);

  // Load state on Edit mode
  useEffect(() => {
    if (isEditMode) {
      const existing = documents.find(doc => doc.id === id);
      if (existing) {
        setQuoteNo(existing.id);
        setSelectedClient(existing.client);
        setIssueDate(existing.date);
        setExpiryDate(existing.expiryDate || existing.date);
        setBillingAddress(existing.billingAddress || '');
        setNotes(existing.notes || '');
        setGstPercent(existing.gstPercent !== undefined ? existing.gstPercent : 0);
        setDiscountPercent(existing.discountPercent !== undefined ? existing.discountPercent : 0);
        setCurrency(existing.currency || 'INR - Indian Rupee');
        
        if (existing.lineItems) {
          setLineItems(existing.lineItems);
        } else {
          setLineItems([{ id: 1, desc: 'Estimate Service Item', qty: 1, price: existing.amount }]);
        }
      }
    } else {
      setQuoteNo('QTN-' + String(Date.now()).slice(-4));
    }
  }, [id, isEditMode, documents]);

  // Calculations
  const subtotal = lineItems.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const gstBase = subtotal - discountAmount;
  const gstAmount = gstBase * (gstPercent / 100);
  const grandTotal = gstBase + gstAmount;

  const addRow = () => {
    const nextId = lineItems.length > 0 ? Math.max(...lineItems.map(i => i.id)) + 1 : 1;
    setLineItems([...lineItems, { id: nextId, desc: '', qty: 1, price: 0.00 }]);
  };

  const removeRow = (id) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const handleRowChange = (id, field, val) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        let parsedVal = val;
        if (field === 'qty') parsedVal = parseInt(val) || 0;
        if (field === 'price') parsedVal = parseFloat(val) || 0.00;
        return { ...item, [field]: parsedVal };
      }
      return item;
    }));
  };

  const handleSave = (isDraft) => {
    const docData = {
      id: quoteNo,
      client: selectedClient || 'Nova Logistics Ltd',
      type: 'Quotation',
      date: issueDate,
      expiryDate: expiryDate,
      currency: currency,
      billingAddress: billingAddress,
      notes: notes,
      gstPercent: gstPercent,
      discountPercent: discountPercent,
      amount: grandTotal,
      lineItems: lineItems,
      status: isDraft ? 'DRAFT' : 'APPROVED'
    };

    if (isEditMode) {
      setDocuments(prev => prev.map(doc => doc.id === id ? docData : doc));
      showToast('Quotation updated successfully');
    } else {
      setDocuments(prev => [...prev, docData]);
      showToast(isDraft ? 'Quotation draft saved' : 'Quotation saved successfully');
    }
    navigate('/quotations');
  };

  return (
    <div className="flex-grow p-lg max-w-container-max mx-auto w-full space-y-xl">
      <div className="max-w-[1000px] mx-auto py-xl px-lg space-y-xl">
        
        {/* Header Navigation */}
        <div className="flex justify-between items-start mb-xl">
          <div>
            <h2 className="font-display-lg text-display-lg text-primary font-bold">
              {isEditMode ? `Edit Quotation: ${quoteNo}` : 'Create New Quotation'}
            </h2>
            <p className="text-on-surface-variant mt-xs">Define scope estimates and billing schedules for approval.</p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white border border-outline-variant shadow-sm rounded-lg overflow-hidden">
          {/* Top Detail Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg p-lg border-b border-outline-variant bg-surface-container-lowest">
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-[10px]">QUOTATION NUMBER</label>
              <input 
                className="border border-outline-variant rounded px-md py-sm font-data-mono text-on-surface focus:ring-1 focus:ring-secondary focus:border-secondary w-full outline-none text-xs bg-white" 
                type="text" 
                value={quoteNo} 
                onChange={(e) => setQuoteNo(e.target.value)} 
              />
            </div>
            
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-[10px]">ISSUE DATE</label>
              <input
                className="w-full border-none bg-transparent p-0 font-body-md text-on-surface focus:ring-0 outline-none text-xs cursor-pointer"
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>

            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-[10px]">EXPIRY DATE</label>
              <input
                className="w-full border-none bg-transparent p-0 font-body-md text-on-surface focus:ring-0 outline-none text-xs cursor-pointer"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold text-[10px]">CURRENCY</label>
              <select
                className="w-full border-none bg-transparent p-0 font-body-md text-on-surface focus:ring-0 appearance-none cursor-pointer outline-none text-xs font-semibold"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option>INR - Indian Rupee</option>
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
                <option>GBP - British Pound</option>
              </select>
            </div>
          </div>

          {/* Client & Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl p-lg border-b border-outline-variant">
            <div className="space-y-md">
              <h3 className="font-label-caps text-label-caps text-secondary font-bold text-[10px]">FROM</h3>
              <div className="p-md bg-surface-container-low rounded border border-dashed border-outline-variant">
                <p className="font-bold text-primary text-xs font-neogen">{settings?.businessName || 'Together Tech'}</p>
                <p className="text-body-sm text-on-surface-variant text-[11px]">{settings?.website || 'togethertechgroups.in'}</p>
                <p className="text-body-sm text-on-surface-variant text-[11px]">{settings?.email || 'togethertechgroups@gmail.com'}</p>
                <p className="text-body-sm text-on-surface-variant font-data-mono text-[11px]">{settings?.phone || '+91 90475 49682'}</p>
                {settings?.gstin && <p className="text-body-sm text-on-surface-variant font-data-mono text-[11px]">GSTIN: {settings.gstin}</p>}
              </div>
            </div>
            
            <div className="space-y-md">
              <h3 className="font-label-caps text-label-caps text-secondary font-bold text-[10px]">CUSTOMER</h3>
              <div className="relative group space-y-sm">
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full bg-white border border-outline rounded p-md font-body-md text-on-surface focus:ring-2 focus:ring-secondary transition-all outline-none text-xs cursor-pointer"
                >
                  <option value="">Select Customer...</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {clientDetails && (
                  <div className="mt-sm space-y-xs px-xs">
                    <p className="text-body-sm text-on-surface-variant text-[11px] font-data-mono">GST: {clientDetails.gstin}</p>
                    <p className="text-body-sm text-on-surface-variant font-data-mono text-[11px]">Email: {clientDetails.email}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-md">
              <h3 className="font-label-caps text-label-caps text-secondary font-bold text-[10px]">BILLING ADDRESS</h3>
              <textarea
                className="w-full border border-outline rounded p-md font-body-md text-on-surface focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all text-xs bg-white resize-none"
                placeholder="Client registered office address..."
                rows="3"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Line Items Table Header Section */}
          <div className="p-lg bg-surface-container-low/20 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-title-sm text-title-sm text-primary font-bold text-xs">Service Items</h3>
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-xs text-secondary font-label-caps text-label-caps hover:underline cursor-pointer font-bold text-xs animate-pulse rounded-full px-sm py-1 hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-body-sm font-bold">add</span> Add Line Item
            </button>
          </div>

          {/* Service Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-surface-container-low">
                <tr className="border-b border-outline-variant">
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px]">Item Description</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant w-32 uppercase text-[10px] text-right">Quantity</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant text-right w-40 uppercase text-[10px]">Rate ({activeSymbol})</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant text-right w-40 uppercase text-[10px]">Total ({activeSymbol})</th>
                  <th className="px-md py-md w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {lineItems.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-lg py-md">
                      <input
                        className="w-full border-none focus:ring-0 p-0 font-body-md text-body-md placeholder:text-outline-variant bg-transparent outline-none text-on-surface text-xs"
                        placeholder="e.g. Strategic Consulting - Phase 1"
                        type="text"
                        value={item.desc}
                        onChange={(e) => handleRowChange(item.id, 'desc', e.target.value)}
                      />
                    </td>
                    <td className="px-lg py-md text-right">
                      <input
                        className="w-20 border-none focus:ring-0 p-0 text-right font-data-mono text-data-mono bg-transparent outline-none text-on-surface text-xs"
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => handleRowChange(item.id, 'qty', e.target.value)}
                      />
                    </td>
                    <td className="px-lg py-md text-right">
                      <input
                        className="w-28 border-none focus:ring-0 p-0 text-right font-data-mono text-data-mono bg-transparent outline-none text-on-surface text-xs"
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => handleRowChange(item.id, 'price', e.target.value)}
                      />
                    </td>
                    <td className="px-lg py-md text-right font-data-mono font-bold text-primary text-xs">
                      {activeSymbol}{(item.qty * item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-md py-md text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(item.id)}
                        className="text-on-surface-variant hover:text-error transition-colors cursor-pointer rounded-full p-1 hover:bg-surface-container-high"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 4: Footer - Summary & Terms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter p-lg border-t border-outline-variant bg-surface-container-lowest">
            {/* Custom Notes */}
            <div className="space-y-sm">
              <label className="block font-label-caps text-label-caps text-on-surface-variant font-bold text-[10px]">Quotation Notes / Terms</label>
              <textarea
                className="w-full bg-white border border-outline-variant p-md rounded font-body-sm text-body-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all resize-none text-on-surface outline-none text-xs"
                placeholder="Enter custom terms, validity periods for this quotation..."
                rows="5"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Financial Totals */}
            <div className="p-md bg-surface-container-low rounded-lg space-y-sm flex flex-col justify-between">
              <div className="space-y-sm">
                <div className="flex justify-between items-center text-on-surface-variant text-[11px]">
                  <span className="font-label-caps text-label-caps">Subtotal</span>
                  <span className="font-data-mono">
                    {activeSymbol}{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-on-surface-variant text-[11px]">
                  <span className="font-label-caps text-label-caps flex items-center gap-xs">
                    Discount (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-12 p-0 px-xs text-right border border-outline-variant focus:ring-secondary bg-white text-on-surface rounded font-data-mono text-[10px]"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                    />
                  </span>
                  <span className="font-data-mono text-error">
                    - {activeSymbol}{discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-on-surface-variant text-[11px]">
                  <span className="font-label-caps text-label-caps flex items-center gap-xs">
                    GST (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-12 p-0 px-xs text-right border border-outline-variant focus:ring-secondary bg-white text-on-surface rounded font-data-mono text-[10px]"
                      value={gstPercent}
                      onChange={(e) => setGstPercent(parseFloat(e.target.value) || 0)}
                    />
                  </span>
                  <span className="font-data-mono">
                    {activeSymbol}{gstAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              
              <div className="pt-sm border-t border-outline flex justify-between items-center mt-md">
                <span className="font-bold text-xs text-primary uppercase">Grand Total ({activeSymbol})</span>
                <span className="font-display-lg text-headline-md text-secondary font-bold">
                  {activeSymbol}{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-md gap-md">
          <button
            type="button"
            onClick={() => navigate('/quotations')}
            className="flex items-center gap-sm text-on-surface-variant hover:text-error transition-colors cursor-pointer font-bold text-xs rounded-full px-md py-sm hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-sm">close</span>
            <span className="font-label-caps text-label-caps">Cancel</span>
          </button>
          
          <div className="flex flex-wrap gap-md justify-center w-full md:w-auto">
            <button
              onClick={() => handleSave(true)}
              className="px-lg py-sm border border-outline-variant text-primary rounded-full font-label-caps text-label-caps hover:bg-surface-container-low transition-colors cursor-pointer font-bold text-xs bg-white"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(false)}
              className="px-xl py-sm bg-secondary text-on-secondary rounded-full font-label-caps text-label-caps hover:opacity-90 transition-opacity shadow-md flex items-center gap-sm cursor-pointer font-bold text-xs"
            >
              <span className="material-symbols-outlined text-[18px]">save</span> Save Quotation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
