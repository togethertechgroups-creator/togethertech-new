import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Documents({ documents, setDocuments, showToast }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Invoice'); // 'Invoice' or 'Quotation'
  const [custQuery, setCustQuery] = useState('');
  const [statusQuery, setStatusQuery] = useState('All Statuses');
  const [dateQuery, setDateQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredDocs = useMemo(() => {
    return documents.filter((d) => {
      const matchesTab = d.type === activeTab;
      const matchesCustomer = d.client.toLowerCase().includes(custQuery.toLowerCase());
      
      let matchesStatus = true;
      if (statusQuery !== 'All Statuses') {
        matchesStatus = d.status.toUpperCase() === statusQuery.toUpperCase();
      }

      let matchesDate = true;
      if (dateQuery) {
        matchesDate = d.date === dateQuery;
      }

      return matchesTab && matchesCustomer && matchesStatus && matchesDate;
    });
  }, [documents, activeTab, custQuery, statusQuery, dateQuery]);

  // Dynamic Metrics
  const outstandingSum = useMemo(() => {
    return documents
      .filter((d) => d.type === 'Invoice' && d.status !== 'PAID')
      .reduce((sum, d) => sum + d.amount, 0);
  }, [documents]);

  const pendingCount = useMemo(() => {
    return documents.filter((d) => d.status === 'PENDING' || d.status === 'DRAFT').length;
  }, [documents]);

  const overdueCount = useMemo(() => {
    return documents.filter((d) => d.type === 'Invoice' && d.status === 'OVERDUE').length;
  }, [documents]);

  const handleRowClick = (id) => {
    localStorage.setItem('finops_preview_doc_id', id);
    navigate('/pdf-preview');
  };

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((x) => x !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(filteredDocs.map((d) => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleResetFilters = () => {
    setCustQuery('');
    setStatusQuery('All Statuses');
    setDateQuery('');
  };

  const handleBatchSend = () => {
    showToast(`Sending ${selectedIds.length} reminders...`, 'info_outline');
    setTimeout(() => {
      showToast('Batch reminders sent successfully!');
      setSelectedIds([]);
    }, 1200);
  };

  const handleExport = () => {
    showToast('Exporting document data...', 'download');
    setTimeout(() => {
      showToast('Export file downloaded successfully!');
    }, 1200);
  };

  return (
    <div className="flex-grow overflow-y-auto p-lg max-w-container-max mx-auto w-full custom-scrollbar space-y-xl">
      <div className="max-w-container-max mx-auto space-y-xl">
        {/* Page Header & Main Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">Document Inventory</h2>
            <p className="text-on-surface-variant font-body-sm">Manage, track, and process your enterprise financial documents.</p>
          </div>
          <div className="flex gap-sm">
            <button
              onClick={handleExport}
              className="flex items-center gap-sm px-md py-sm border border-outline-variant rounded-full font-label-caps text-label-caps text-primary hover:bg-surface-container transition-colors active:scale-95 cursor-pointer font-bold text-xs bg-white"
            >
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              Export Data
            </button>
            {activeTab === 'Invoice' ? (
              <button
                onClick={() => navigate('/create-invoice')}
                className="flex items-center gap-sm px-md py-sm bg-secondary text-white rounded-full font-label-caps text-label-caps hover:bg-opacity-90 transition-colors shadow-sm active:scale-95 cursor-pointer font-bold text-xs"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                New Invoice
              </button>
            ) : (
              <button
                onClick={() => navigate('/create-quotation')}
                className="flex items-center gap-sm px-md py-sm bg-secondary text-white rounded-full font-label-caps text-label-caps hover:bg-opacity-90 transition-colors shadow-sm active:scale-95 cursor-pointer font-bold text-xs"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                New Quotation
              </button>
            )}
          </div>
        </div>

        {/* Bento Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-xl">
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col gap-xs">
            <span className="text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest font-bold">Total Outstanding</span>
            <div className="text-headline-md font-bold text-primary font-data-mono">
              ₹{outstandingSum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[12px] text-green-600 flex items-center gap-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +12.4% vs last month
            </div>
          </div>
          
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col gap-xs">
            <span className="text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest font-bold">Pending Approval</span>
            <div className="text-headline-md font-bold text-primary font-data-mono">{pendingCount}</div>
            <div className="text-[12px] text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              Estimated: Draft/Pending
            </div>
          </div>
          
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col gap-xs">
            <span className="text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest font-bold font-bold">Overdue Invoices</span>
            <div className="text-headline-md font-bold text-error font-data-mono">{overdueCount}</div>
            <div className="text-[12px] text-error flex items-center gap-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              Action required
            </div>
          </div>
          
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col gap-xs">
            <span className="text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest font-bold">Avg. Payment Days</span>
            <div className="text-headline-md font-bold text-primary font-data-mono">14.2</div>
            <div className="text-[12px] text-green-600 flex items-center gap-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              -2 days improved
            </div>
          </div>
        </div>

        {/* Table Section with Filters */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col">
          {/* Tab Switching & Batch Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center border-b border-outline-variant px-md py-sm gap-md">
            <div className="flex bg-surface-container-low rounded-lg p-[2px] w-fit">
              <button
                onClick={() => { setActiveTab('Invoice'); setSelectedIds([]); }}
                className={`px-xl py-xs transition-all font-label-caps text-xs font-bold rounded-md cursor-pointer ${
                  activeTab === 'Invoice' ? 'bg-white text-secondary shadow-sm font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Invoices
              </button>
              <button
                onClick={() => { setActiveTab('Quotation'); setSelectedIds([]); }}
                className={`px-xl py-xs transition-all font-label-caps text-xs font-bold rounded-md cursor-pointer ${
                  activeTab === 'Quotation' ? 'bg-white text-secondary shadow-sm font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Quotations
              </button>
            </div>

            {/* Batch actions */}
            <div className={`flex items-center gap-sm transition-opacity ${selectedIds.length > 0 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <span className="text-on-surface-variant text-[12px] mr-xs font-bold">{selectedIds.length} Selected</span>
              <button
                onClick={handleBatchSend}
                className="flex items-center gap-xs px-sm py-xs bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-label-caps text-[11px] hover:bg-secondary/20 transition-all cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[16px]">forward_to_inbox</span>
                Send Reminders
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-md p-md bg-surface-container-lowest/50 border-b border-outline-variant bg-surface-container-low/10">
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-[10px] text-on-surface-variant font-bold">Customer Name</label>
              <input
                type="text"
                placeholder="Search customer..."
                value={custQuery}
                onChange={(e) => setCustQuery(e.target.value)}
                className="w-full px-md py-xs text-body-sm border border-outline-variant rounded bg-white focus:border-secondary outline-none text-on-surface"
              />
            </div>
            
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-[10px] text-on-surface-variant font-bold">Status</label>
              <select
                value={statusQuery}
                onChange={(e) => setStatusQuery(e.target.value)}
                className="w-full px-md py-xs text-body-sm border border-outline-variant rounded bg-white focus:border-secondary outline-none text-on-surface cursor-pointer"
              >
                <option>All Statuses</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>Overdue</option>
                <option>Draft</option>
                <option>Approved</option>
                <option>Sent</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-[10px] text-on-surface-variant font-bold">Date Issued</label>
              <input
                type="date"
                value={dateQuery}
                onChange={(e) => setDateQuery(e.target.value)}
                className="w-full px-md py-xs text-body-sm border border-outline-variant rounded bg-white focus:border-secondary outline-none text-on-surface cursor-pointer"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleResetFilters}
                className="w-full py-xs border border-outline-variant text-on-surface font-label-caps text-[11px] rounded-full hover:bg-surface-container transition-all flex items-center justify-center gap-sm bg-white cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[16px]">filter_list</span>
                Reset Filters
              </button>
            </div>
          </div>

          {/* Table Listing */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant w-12 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length > 0 && selectedIds.length === filteredDocs.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer"
                    />
                  </th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant">Document ID</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant">Date Issued</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant">Customer</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant text-right">Amount</th>
                  <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant">Status</th>
                  <th className="px-md py-md w-24 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filteredDocs.map((d) => {
                  let badgeClass = 'bg-gray-100 text-gray-800 border-gray-200';
                  let dotClass = 'bg-gray-500';
                  if (d.status === 'PAID') { badgeClass = 'bg-green-50 text-green-700 border-green-200'; dotClass = 'bg-green-600'; }
                  else if (d.status === 'SENT' || d.status === 'PENDING' || d.status === 'APPROVED') { badgeClass = 'bg-blue-50 text-blue-700 border-blue-200'; dotClass = 'bg-blue-600'; }
                  else if (d.status === 'OVERDUE') { badgeClass = 'bg-red-50 text-red-700 border-red-200'; dotClass = 'bg-red-600'; }
                  else if (d.status === 'DRAFT') { badgeClass = 'bg-gray-100 text-gray-700 border-gray-300'; dotClass = 'bg-gray-400'; }

                  const initials = d.client.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

                  return (
                    <tr
                      key={d.id}
                      onClick={() => handleRowClick(d.id)}
                      className="hover:bg-surface-container-low transition-colors cursor-pointer"
                    >
                      <td className="px-lg py-md text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(d.id)}
                          onChange={(e) => handleCheckboxChange(d.id, e.target.checked)}
                          className="rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer"
                        />
                      </td>
                      
                      <td className="px-lg py-md font-data-mono font-semibold text-primary">{d.id}</td>
                      <td className="px-lg py-md text-on-surface-variant">{d.date}</td>
                      
                      <td className="px-lg py-md">
                        <div className="flex items-center gap-sm">
                          <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-label-caps text-[10px] shrink-0 font-bold">
                            {initials}
                          </div>
                          <span className="font-semibold text-on-surface truncate max-w-[180px]">{d.client}</span>
                        </div>
                      </td>
                      
                      <td className="px-lg py-md text-right font-data-mono font-bold text-primary">
                        ₹{d.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      
                      <td className="px-lg py-md">
                        <span className={`inline-flex items-center px-sm py-1 rounded-full ${badgeClass} text-[11px] font-bold border`}>
                          <span className={`w-1 h-1 rounded-full ${dotClass} mr-xs`}></span>
                          {d.status}
                        </span>
                      </td>
                      
                      <td className="px-md py-md text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleRowClick(d.id)}
                          className="material-symbols-outlined text-on-surface-variant hover:text-secondary p-xs rounded transition-colors cursor-pointer"
                        >
                          visibility
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer showing item counts */}
          <div className="p-md bg-surface-container-lowest border-t border-outline-variant flex justify-between items-center shrink-0">
            <span className="text-[12px] text-on-surface-variant">
              Showing {filteredDocs.length} of {documents.filter(d => d.type === activeTab).length} results
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
