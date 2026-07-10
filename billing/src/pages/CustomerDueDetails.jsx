import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Helper: compute invoice payment status
function getInvoiceStatus(invoice, payments) {
  const paid = payments
    .filter(p => p.invoiceId === invoice.id)
    .reduce((sum, p) => sum + p.amount, 0);
  const balance = invoice.amount - paid;
  const isOverdue = new Date(invoice.dueDate) < new Date() && balance > 0;
  if (balance <= 0) return { paid, balance: 0, status: 'PAID' };
  if (isOverdue) return { paid, balance, status: 'OVERDUE' };
  if (paid > 0) return { paid, balance, status: 'PARTIAL' };
  return { paid, balance, status: 'DUE' };
}

const MODES = ['Cash', 'UPI', 'Bank Transfer', 'Card', 'Cheque'];

export default function CustomerDueDetails({ customers, documents, payments, setPayments, setDocuments, showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const customer = customers.find(c => c.id === id);

  // Customer invoices
  const invoices = useMemo(() =>
    documents.filter(d => d.type === 'Invoice' && d.client === customer?.name),
    [documents, customer]);

  // Enriched invoices with payment data
  const enrichedInvoices = useMemo(() =>
    invoices.map(inv => ({ ...inv, ...getInvoiceStatus(inv, payments) })),
    [invoices, payments]);

  // Customer payment history
  const customerPayments = useMemo(() =>
    payments.filter(p => p.customerId === customer?.id).sort((a, b) => new Date(b.date) - new Date(a.date)),
    [payments, customer]);

  // Totals
  const totalInvoice = enrichedInvoices.reduce((s, i) => s + i.amount, 0);
  const totalPaid = enrichedInvoices.reduce((s, i) => s + i.paid, 0);
  const totalDue = enrichedInvoices.reduce((s, i) => s + i.balance, 0);
  const lastPayment = customerPayments[0];

  // Add Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payForm, setPayForm] = useState({
    invoiceId: '',
    date: new Date().toISOString().slice(0, 10),
    amount: '',
    mode: 'UPI',
    reference: '',
    notes: '',
  });

  // Delete payment confirmation
  const [deletePayId, setDeletePayId] = useState(null);

  // Edit payment state
  const [editPay, setEditPay] = useState(null);

  const selectedInvoice = enrichedInvoices.find(i => i.id === payForm.invoiceId);

  const handleOpenPayment = (invoiceId = '') => {
    setPayForm({
      invoiceId,
      date: new Date().toISOString().slice(0, 10),
      amount: '',
      mode: 'UPI',
      reference: '',
      notes: '',
    });
    setEditPay(null);
    setShowPaymentModal(true);
  };

  const handleEditPayment = (pay) => {
    setEditPay(pay);
    setPayForm({
      invoiceId: pay.invoiceId,
      date: pay.date,
      amount: String(pay.amount),
      mode: pay.mode,
      reference: pay.reference || '',
      notes: pay.notes || '',
    });
    setShowPaymentModal(true);
  };

  const handleSavePayment = () => {
    const amount = parseFloat(payForm.amount);
    if (!payForm.invoiceId) { showToast('Please select an invoice'); return; }
    if (!amount || amount <= 0) { showToast('Enter a valid payment amount'); return; }
    if (selectedInvoice && amount > selectedInvoice.balance + (editPay ? editPay.amount : 0)) {
      showToast('Payment exceeds pending balance!'); return;
    }

    if (editPay) {
      setPayments(prev => prev.map(p => p.id === editPay.id ? {
        ...p, invoiceId: payForm.invoiceId, date: payForm.date,
        amount, mode: payForm.mode, reference: payForm.reference, notes: payForm.notes,
      } : p));
      showToast('Payment updated successfully');
    } else {
      const newId = 'RCP-' + String(Date.now()).slice(-4);
      setPayments(prev => [...prev, {
        id: newId, invoiceId: payForm.invoiceId, customerId: customer.id,
        customerName: customer.name, date: payForm.date, amount,
        mode: payForm.mode, reference: payForm.reference, notes: payForm.notes,
      }]);
      showToast('Payment recorded successfully');
    }
    setShowPaymentModal(false);
  };

  const handleDeletePayment = () => {
    setPayments(prev => prev.filter(p => p.id !== deletePayId));
    showToast('Payment deleted and balance recalculated');
    setDeletePayId(null);
  };

  if (!customer) return (
    <div className="flex-grow p-lg flex items-center justify-center">
      <p className="text-on-surface-variant">Customer not found.</p>
    </div>
  );

  const statusColor = {
    PAID: 'bg-green-50 text-green-700 border-green-200',
    PARTIAL: 'bg-amber-50 text-amber-700 border-amber-200',
    DUE: 'bg-blue-50 text-blue-700 border-blue-200',
    OVERDUE: 'bg-red-50 text-red-700 border-red-200',
    CANCELLED: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  const statusDot = {
    PAID: 'bg-green-500', PARTIAL: 'bg-amber-500', DUE: 'bg-blue-500',
    OVERDUE: 'bg-red-500', CANCELLED: 'bg-gray-400',
  };

  return (
    <div className="flex-grow overflow-y-auto p-lg w-full space-y-xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-md">
        <div>
          <button onClick={() => navigate('/customers')} className="flex items-center gap-xs text-on-surface-variant hover:text-secondary text-xs mb-sm cursor-pointer">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Customers
          </button>
          <h1 className="font-display-lg text-display-lg text-primary font-bold">{customer.name}</h1>
          <p className="text-on-surface-variant text-xs mt-xs">{customer.tier} · GSTIN: {customer.gstin}</p>
        </div>
        <button
          onClick={() => handleOpenPayment()}
          className="flex items-center gap-xs px-lg py-md bg-secondary text-white rounded-full font-bold text-xs hover:brightness-110 shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        {[
          { label: 'Total Invoiced', value: totalInvoice, color: 'from-[#1d8cf8] to-[#33b5e5]', icon: 'receipt_long' },
          { label: 'Total Paid', value: totalPaid, color: 'from-[#00b074] to-[#05d688]', icon: 'check_circle' },
          { label: 'Total Due', value: totalDue, color: 'from-[#f5365c] to-[#f56036]', icon: 'pending_actions' },
          { label: 'Last Payment', value: lastPayment ? `₹${lastPayment.amount.toLocaleString()}` : '—', raw: true, color: 'from-[#8a2be2] to-[#da70d6]', icon: 'calendar_today' },
        ].map(card => (
          <div key={card.label} className={`bg-gradient-to-br ${card.color} rounded-xl p-md text-white shadow-md`}>
            <div className="flex justify-between items-start mb-sm">
              <p className="text-[10px] font-bold uppercase opacity-80">{card.label}</p>
              <span className="material-symbols-outlined text-xl opacity-70">{card.icon}</span>
            </div>
            <p className="text-xl font-bold font-data-mono">
              {card.raw ? card.value : `₹${card.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </p>
          </div>
        ))}
      </div>

      {/* Customer Info Card */}
      <div className="bg-white border border-outline-variant rounded-xl p-lg shadow-sm">
        <h3 className="font-bold text-primary text-sm mb-md flex items-center gap-xs">
          <span className="material-symbols-outlined text-secondary text-base">person</span>
          Customer Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
          {[
            { label: 'Customer Name', value: customer.name },
            { label: 'Email', value: customer.email },
            { label: 'Mobile', value: customer.phone },
            { label: 'GST Number', value: customer.gstin },
            { label: 'Status', value: customer.status },
            { label: 'Address', value: customer.address },
          ].map(f => (
            <div key={f.label}>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">{f.label}</p>
              <p className="text-xs font-semibold text-on-surface mt-xs">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Invoices Table */}
      <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="p-lg border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-bold text-primary text-sm flex items-center gap-xs">
            <span className="material-symbols-outlined text-secondary text-base">receipt</span>
            Invoice Summary
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead className="bg-surface-container-low">
              <tr className="border-b border-outline-variant">
                {['Invoice No.', 'Invoice Date', 'Due Date', 'Invoice Total', 'Paid', 'Balance', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-lg py-md text-[10px] font-bold text-on-surface-variant uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {enrichedInvoices.length > 0 ? enrichedInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-lg py-md font-data-mono font-bold text-primary text-xs">{inv.id}</td>
                  <td className="px-lg py-md text-xs text-on-surface-variant">{inv.date}</td>
                  <td className="px-lg py-md text-xs text-on-surface-variant font-semibold">{inv.dueDate}</td>
                  <td className="px-lg py-md text-xs font-data-mono font-bold">₹{inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="px-lg py-md text-xs font-data-mono text-green-700">₹{inv.paid.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="px-lg py-md text-xs font-data-mono text-red-600 font-bold">₹{inv.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="px-lg py-md">
                    <span className={`inline-flex items-center gap-xs px-sm py-[2px] rounded-full text-[10px] font-bold border ${statusColor[inv.status] || statusColor.DUE}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[inv.status] || statusDot.DUE}`}></span>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-lg py-md">
                    <div className="flex items-center gap-xs">
                      {inv.balance > 0 && (
                        <button
                          onClick={() => handleOpenPayment(inv.id)}
                          className="text-[10px] font-bold text-secondary border border-secondary rounded-full px-sm py-[2px] hover:bg-secondary hover:text-white transition-colors cursor-pointer"
                        >
                          Pay Now
                        </button>
                      )}
                      <button
                        onClick={() => {
                          localStorage.setItem('finops_preview_doc_id', inv.id);
                          navigate('/pdf-preview');
                        }}
                        className="text-[10px] font-bold text-on-surface-variant border border-outline-variant rounded-full px-sm py-[2px] hover:bg-surface-container-high transition-colors cursor-pointer bg-white"
                      >
                        View PDF
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-lg py-xl text-center text-on-surface-variant text-xs">No invoices for this customer.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="p-lg border-b border-outline-variant">
          <h3 className="font-bold text-primary text-sm flex items-center gap-xs">
            <span className="material-symbols-outlined text-secondary text-base">history</span>
            Payment History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-surface-container-low">
              <tr className="border-b border-outline-variant">
                {['Receipt No.', 'Payment Date', 'Invoice No.', 'Payment Mode', 'Paid Amount', 'Actions'].map(h => (
                  <th key={h} className="px-lg py-md text-[10px] font-bold text-on-surface-variant uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {customerPayments.length > 0 ? customerPayments.map(pay => (
                <tr key={pay.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-lg py-md font-data-mono font-bold text-primary text-xs">{pay.id}</td>
                  <td className="px-lg py-md text-xs text-on-surface-variant">{pay.date}</td>
                  <td className="px-lg py-md font-data-mono text-xs text-secondary">{pay.invoiceId}</td>
                  <td className="px-lg py-md">
                    <span className="inline-flex items-center gap-xs text-[10px] font-bold bg-surface-container px-sm py-[2px] rounded-full border border-outline-variant">
                      <span className="material-symbols-outlined text-[11px]">
                        {pay.mode === 'Cash' ? 'payments' : pay.mode === 'UPI' ? 'qr_code' : pay.mode === 'Card' ? 'credit_card' : 'account_balance'}
                      </span>
                      {pay.mode}
                    </span>
                  </td>
                  <td className="px-lg py-md font-data-mono font-bold text-green-700 text-xs">
                    ₹{pay.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-lg py-md">
                    <div className="flex items-center gap-xs">
                      <button
                        onClick={() => {
                          localStorage.setItem('finops_preview_doc_id', pay.id);
                          navigate('/pdf-preview');
                        }}
                        className="text-[10px] font-bold text-secondary border border-secondary bg-white rounded-full px-sm py-[2px] hover:bg-secondary hover:text-white transition-colors cursor-pointer"
                      >
                        Receipt PDF
                      </button>
                      <button
                        onClick={() => handleEditPayment(pay)}
                        className="text-[10px] font-bold text-on-surface-variant border border-outline-variant bg-white rounded-full px-sm py-[2px] hover:bg-surface-container-high transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletePayId(pay.id)}
                        className="text-[10px] font-bold text-error border border-error bg-white rounded-full px-sm py-[2px] hover:bg-error hover:text-white transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-lg py-xl text-center text-on-surface-variant text-xs">No payments recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] flex items-center justify-center p-md">
          <div className="bg-white rounded-2xl shadow-2xl border border-outline-variant w-full max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-lg py-md border-b border-outline-variant bg-surface-container-low">
              <h3 className="font-bold text-primary text-base flex items-center gap-xs">
                <span className="material-symbols-outlined text-secondary">payments</span>
                {editPay ? 'Edit Payment' : 'Add Payment'}
              </h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-on-surface-variant hover:text-error cursor-pointer rounded-full p-xs hover:bg-surface-container">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-lg space-y-md overflow-y-auto max-h-[70vh]">

              {/* Customer Name (read-only) */}
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-xs">Customer Name</label>
                <div className="px-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-xs font-semibold text-on-surface">{customer.name}</div>
              </div>

              {/* Invoice Select */}
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-xs">Select Invoice</label>
                <select
                  value={payForm.invoiceId}
                  onChange={e => setPayForm(f => ({ ...f, invoiceId: e.target.value, amount: '' }))}
                  className="w-full border border-outline-variant rounded-lg px-md py-sm text-xs text-on-surface bg-white outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                >
                  <option value="">-- Select Invoice --</option>
                  {enrichedInvoices.filter(i => i.balance > 0 || (editPay && i.id === editPay.invoiceId)).map(inv => (
                    <option key={inv.id} value={inv.id}>
                      {inv.id} — Balance: ₹{inv.balance.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Balance */}
              {selectedInvoice && (
                <div className="grid grid-cols-3 gap-md">
                  <div className="bg-surface-container-low rounded-lg p-md text-center border border-outline-variant">
                    <p className="text-[9px] font-bold text-on-surface-variant uppercase">Invoice Total</p>
                    <p className="font-bold text-xs text-primary mt-xs">₹{selectedInvoice.amount.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-md text-center border border-green-100">
                    <p className="text-[9px] font-bold text-green-700 uppercase">Already Paid</p>
                    <p className="font-bold text-xs text-green-700 mt-xs">₹{selectedInvoice.paid.toLocaleString()}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-md text-center border border-red-100">
                    <p className="text-[9px] font-bold text-red-600 uppercase">Current Balance</p>
                    <p className="font-bold text-xs text-red-600 mt-xs">₹{(selectedInvoice.balance + (editPay ? editPay.amount : 0)).toLocaleString()}</p>
                  </div>
                </div>
              )}

              {/* Payment Date & Amount */}
              <div className="grid grid-cols-2 gap-md">
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-xs">Payment Date</label>
                  <input
                    type="date"
                    value={payForm.date}
                    onChange={e => setPayForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full border border-outline-variant rounded-lg px-md py-sm text-xs text-on-surface bg-white outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-xs">Payment Amount (₹)</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedInvoice ? selectedInvoice.balance + (editPay ? editPay.amount : 0) : undefined}
                    value={payForm.amount}
                    onChange={e => setPayForm(f => ({ ...f, amount: e.target.value }))}
                    placeholder="Enter amount..."
                    className="w-full border border-outline-variant rounded-lg px-md py-sm text-xs text-on-surface bg-white outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              </div>

              {/* Payment preview */}
              {payForm.amount && selectedInvoice && (
                <div className={`rounded-lg p-md border text-xs font-semibold flex items-center gap-sm ${
                  parseFloat(payForm.amount) >= selectedInvoice.balance + (editPay ? editPay.amount : 0)
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-amber-50 border-amber-200 text-amber-700'
                }`}>
                  <span className="material-symbols-outlined text-base">
                    {parseFloat(payForm.amount) >= selectedInvoice.balance + (editPay ? editPay.amount : 0) ? 'check_circle' : 'info'}
                  </span>
                  {parseFloat(payForm.amount) >= selectedInvoice.balance + (editPay ? editPay.amount : 0)
                    ? `Full Payment — New Balance: ₹0 → Status: PAID`
                    : `Partial Payment — New Balance: ₹${((selectedInvoice.balance + (editPay ? editPay.amount : 0)) - parseFloat(payForm.amount)).toLocaleString()} → Status: PARTIAL`
                  }
                </div>
              )}

              {/* Payment Mode */}
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-xs">Payment Mode</label>
                <div className="flex flex-wrap gap-sm">
                  {MODES.map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPayForm(f => ({ ...f, mode }))}
                      className={`px-md py-sm rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                        payForm.mode === mode
                          ? 'bg-secondary text-white border-secondary shadow-sm'
                          : 'bg-white text-on-surface-variant border-outline-variant hover:border-secondary'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reference & Notes */}
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-xs">Transaction Reference</label>
                <input
                  type="text"
                  value={payForm.reference}
                  onChange={e => setPayForm(f => ({ ...f, reference: e.target.value }))}
                  placeholder="UPI Txn ID / Cheque No / Bank Ref..."
                  className="w-full border border-outline-variant rounded-lg px-md py-sm text-xs text-on-surface bg-white outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-xs">Notes</label>
                <textarea
                  value={payForm.notes}
                  onChange={e => setPayForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Additional remarks..."
                  rows={2}
                  className="w-full border border-outline-variant rounded-lg px-md py-sm text-xs text-on-surface bg-white outline-none focus:ring-2 focus:ring-secondary resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-md px-lg py-md border-t border-outline-variant bg-surface-container-low">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-lg py-sm border border-outline-variant rounded-full text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePayment}
                className="px-xl py-sm bg-secondary text-white rounded-full text-xs font-bold hover:brightness-110 shadow-md cursor-pointer flex items-center gap-xs"
              >
                <span className="material-symbols-outlined text-sm">save</span>
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Payment Confirmation */}
      {deletePayId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] flex items-center justify-center p-md">
          <div className="bg-white rounded-2xl p-lg max-w-sm w-full shadow-2xl text-center space-y-md">
            <span className="material-symbols-outlined text-error text-4xl block">warning</span>
            <h3 className="font-bold text-primary text-base">Delete Payment?</h3>
            <p className="text-xs text-on-surface-variant">
              Deleting <span className="font-bold font-data-mono">{deletePayId}</span> will recalculate the invoice balance automatically.
            </p>
            <div className="flex justify-center gap-md pt-sm">
              <button onClick={() => setDeletePayId(null)} className="px-lg py-sm border border-outline-variant rounded-full text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer bg-white">Cancel</button>
              <button onClick={handleDeletePayment} className="px-lg py-sm bg-error text-white rounded-full text-xs font-bold hover:brightness-110 cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
