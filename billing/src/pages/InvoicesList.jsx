import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InvoicesList({ documents, setDocuments, showToast }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // State for actions dropdown
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0, openUpward: false });
  
  // State for delete confirmation modal
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClose = () => setActiveDropdownId(null);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, []);

  // Filter invoices
  const invoices = useMemo(() => {
    return documents.filter(doc => doc.type === 'Invoice');
  }, [documents]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(doc => {
      const matchesSearch = doc.client.toLowerCase().includes(searchQuery.toLowerCase()) || doc.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' ? true : doc.status.toUpperCase() === statusFilter.toUpperCase();
      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  const activeDocForDropdown = useMemo(() => {
    return documents.find(d => d.id === activeDropdownId);
  }, [documents, activeDropdownId]);

  // Actions
  const handleManageClick = (e, id) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const dropdownHeight = 220; // estimated dropdown height in px
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < dropdownHeight;
    setDropdownCoords({
      top: openUpward ? rect.top - dropdownHeight - 4 : rect.bottom + 4,
      left: rect.right - 192,
      openUpward
    });
    setActiveDropdownId(activeDropdownId === id ? null : id);
  };

  const handleMarkAsPaid = (id) => {
    setDocuments(prev => prev.map(doc => doc.id === id ? { ...doc, status: 'PAID' } : doc));
    showToast(`Invoice ${id} marked as PAID`);
    setActiveDropdownId(null);
  };

  const handleDuplicate = (id) => {
    const original = documents.find(doc => doc.id === id);
    if (!original) return;
    const newId = 'INV-DUPE-' + String(Date.now()).slice(-4);
    const copy = {
      ...original,
      id: newId,
      date: new Date().toISOString().slice(0, 10),
      status: 'DRAFT'
    };
    setDocuments(prev => [...prev, copy]);
    showToast(`Invoice duplicated as ${newId}`);
    setActiveDropdownId(null);
  };

  const handleDelete = () => {
    if (!deleteConfirmId) return;
    setDocuments(prev => prev.filter(doc => doc.id !== deleteConfirmId));
    showToast(`Invoice ${deleteConfirmId} deleted successfully`);
    setDeleteConfirmId(null);
  };

  const handleDownload = (id) => {
    showToast(`Downloading PDF for invoice ${id}...`, 'download');
    setActiveDropdownId(null);
  };

  const handlePrint = (id) => {
    showToast(`Opening Print dialog for ${id}...`);
    setActiveDropdownId(null);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="flex-grow p-lg w-full space-y-xl">
      <div className="w-full space-y-xl">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md mb-xl">
          <div>
            <h1 className="font-display-lg text-display-lg text-primary font-bold">Invoices Inventory</h1>
            <p className="text-on-surface-variant font-body-md">View and manage customer billing invoices, status logs, and duplicates.</p>
          </div>
          <button
            onClick={() => navigate('/invoices/create')}
            className="flex items-center gap-xs px-lg py-md bg-secondary text-white rounded-full font-label-caps hover:brightness-110 shadow-md transition-all active:scale-95 cursor-pointer font-bold text-xs shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Invoice
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-md bg-surface-container-low p-md rounded-xl border border-outline-variant">
          <div className="relative flex-grow max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              type="text"
              placeholder="Search by client or invoice number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-outline-variant rounded-lg pl-10 pr-md py-sm font-body-sm text-body-sm focus:ring-2 focus:ring-secondary/20 transition-all outline-none text-on-surface"
            />
          </div>
          <div className="flex items-center gap-sm">
            <label className="font-label-caps text-xs text-on-surface-variant font-bold">Status Filter:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-outline-variant rounded-lg px-md py-sm text-xs font-semibold text-on-surface outline-none cursor-pointer"
            >
              <option value="All">All Invoices</option>
              <option value="Paid">Paid</option>
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Invoices List Table */}
        <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead className="bg-surface-container-low">
                <tr className="border-b border-outline-variant">
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px] font-bold">Invoice No.</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px] font-bold">Customer</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px] font-bold">Invoice Date</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px] font-bold">Due Date</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px] font-bold text-right">Total</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px] font-bold">Status</th>
                  <th className="px-lg py-md w-28 text-center font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px] font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((doc) => {
                    let badgeClass = 'bg-gray-100 text-gray-800 border-gray-200';
                    let dotClass = 'bg-gray-500';
                    if (doc.status === 'PAID') { badgeClass = 'bg-green-50 text-green-700 border-green-200'; dotClass = 'bg-green-600'; }
                    else if (doc.status === 'SENT' || doc.status === 'PENDING') { badgeClass = 'bg-blue-50 text-blue-700 border-blue-200'; dotClass = 'bg-blue-600'; }
                    else if (doc.status === 'OVERDUE') { badgeClass = 'bg-red-50 text-red-700 border-red-200'; dotClass = 'bg-red-600'; }
                    else if (doc.status === 'DRAFT') { badgeClass = 'bg-gray-100 text-gray-700 border-gray-300'; dotClass = 'bg-gray-400'; }

                    const initials = doc.client.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

                    return (
                      <tr key={doc.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="px-lg py-md font-data-mono font-bold text-primary">{doc.id}</td>
                        <td className="px-lg py-md">
                          <div className="flex items-center gap-sm">
                            <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center font-label-caps text-[9px] shrink-0 font-bold">
                              {initials}
                            </div>
                            <span className="font-semibold text-on-surface text-xs">{doc.client}</span>
                          </div>
                        </td>
                        <td className="px-lg py-md text-on-surface-variant text-xs">{doc.date}</td>
                        <td className="px-lg py-md text-on-surface-variant text-xs font-semibold">
                          {doc.dueDate || new Date(new Date(doc.date).getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}
                        </td>
                        <td className="px-lg py-md text-right font-data-mono font-bold text-primary text-xs">
                          ₹{doc.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-lg py-md">
                          <span className={`inline-flex items-center px-sm py-[2px] rounded-full ${badgeClass} text-[10px] font-bold border`}>
                            <span className={`w-1 h-1 rounded-full ${dotClass} mr-xs`}></span>
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-lg py-md text-center">
                          <button
                            onClick={(e) => handleManageClick(e, doc.id)}
                            className="px-md py-sm border border-outline-variant hover:bg-surface-container rounded-full text-[10px] font-bold text-on-surface-variant hover:text-primary flex items-center justify-center gap-xs cursor-pointer bg-white"
                          >
                            Manage
                            <span className="material-symbols-outlined text-[12px]">expand_more</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="px-lg py-xl text-center text-on-surface-variant font-medium text-xs">
                      No invoices found matching current search filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating Actions Dropdown */}
        {activeDropdownId && activeDocForDropdown && (
          <div 
            style={{ 
              position: 'fixed', 
              top: `${dropdownCoords.top}px`, 
              left: `${dropdownCoords.left}px`,
              width: '12rem',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-outline-variant rounded-xl shadow-xl z-50 divide-y divide-outline-variant overflow-hidden animate-fade-in text-left"
          >
            <div className="py-1">
              <button
                onClick={() => {
                  localStorage.setItem('finops_preview_doc_id', activeDocForDropdown.id);
                  navigate('/pdf-preview');
                }}
                className="w-full px-md py-xs text-xs text-on-surface hover:bg-surface-container flex items-center gap-sm cursor-pointer bg-white"
              >
                <span className="material-symbols-outlined text-sm">visibility</span>
                View Preview
              </button>
              <button
                onClick={() => navigate(`/invoices/edit/${activeDocForDropdown.id}`)}
                className="w-full px-md py-xs text-xs text-on-surface hover:bg-surface-container flex items-center gap-sm cursor-pointer bg-white"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                Edit Details
              </button>
              <button
                onClick={() => handleDuplicate(activeDocForDropdown.id)}
                className="w-full px-md py-xs text-xs text-on-surface hover:bg-surface-container flex items-center gap-sm cursor-pointer bg-white"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                Duplicate
              </button>
            </div>
            <div className="py-1">
              <button
                onClick={() => handleDownload(activeDocForDropdown.id)}
                className="w-full px-md py-xs text-xs text-on-surface hover:bg-surface-container flex items-center gap-sm cursor-pointer bg-white"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Download PDF
              </button>
              <button
                onClick={() => handlePrint(activeDocForDropdown.id)}
                className="w-full px-md py-xs text-xs text-on-surface hover:bg-surface-container flex items-center gap-sm cursor-pointer bg-white"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                Print
              </button>
            </div>
            <div className="py-1">
              {activeDocForDropdown.status !== 'PAID' && (
                <button
                  onClick={() => handleMarkAsPaid(activeDocForDropdown.id)}
                  className="w-full px-md py-xs text-xs text-green-600 hover:bg-surface-container flex items-center gap-sm cursor-pointer bg-white"
                >
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Mark as Paid
                </button>
              )}
              <button
                onClick={() => { setDeleteConfirmId(activeDocForDropdown.id); setActiveDropdownId(null); }}
                className="w-full px-md py-xs text-xs text-error hover:bg-error/5 flex items-center gap-sm cursor-pointer bg-white"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                Delete Invoice
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal Overlay */}
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[80] flex items-center justify-center">
            <div className="bg-white rounded-2xl border border-outline-variant p-lg max-w-sm w-full mx-md shadow-2xl space-y-md animate-scale-in text-center">
              <span className="material-symbols-outlined text-error text-4xl block">warning</span>
              <h3 className="font-title-sm text-primary font-bold text-base">Delete Invoice?</h3>
              <p className="text-on-surface-variant text-body-sm text-gray-500">
                Are you sure you want to delete invoice <span className="font-bold font-data-mono">{deleteConfirmId}</span>? This action is permanent and cannot be undone.
              </p>
              <div className="flex gap-sm justify-center pt-md">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-xl py-sm border border-outline-variant rounded-full text-on-surface-variant font-bold text-xs hover:bg-surface-container cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-xl py-sm bg-error text-white rounded-full font-bold text-xs hover:brightness-110 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
