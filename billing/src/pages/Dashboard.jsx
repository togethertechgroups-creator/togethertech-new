import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ customers, documents, payments }) {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);

  // Invoices only
  const invoices = useMemo(() => documents.filter(d => d.type === 'Invoice'), [documents]);

  // Per-invoice paid amounts
  const paidByInvoice = useMemo(() => {
    const map = {};
    payments.forEach(p => {
      map[p.invoiceId] = (map[p.invoiceId] || 0) + p.amount;
    });
    return map;
  }, [payments]);

  // Summary numbers
  const totalInvoiceAmount = useMemo(() => invoices.reduce((s, i) => s + i.amount, 0), [invoices]);
  const totalReceived = useMemo(() => payments.reduce((s, p) => s + p.amount, 0), [payments]);
  const totalDue = totalInvoiceAmount - totalReceived;

  const overdueAmount = useMemo(() => invoices.reduce((s, inv) => {
    const paid = paidByInvoice[inv.id] || 0;
    const balance = inv.amount - paid;
    const isOverdue = inv.dueDate && new Date(inv.dueDate) < new Date() && balance > 0;
    return s + (isOverdue ? balance : 0);
  }, 0), [invoices, paidByInvoice]);

  const todaysCollections = useMemo(() =>
    payments.filter(p => p.date === today).reduce((s, p) => s + p.amount, 0),
    [payments, today]);

  const activeQuotesCount = useMemo(() =>
    documents.filter(d => d.type === 'Quotation' && ['DRAFT', 'PENDING', 'APPROVED'].includes(d.status)).length,
    [documents]);

  const recentDocs = useMemo(() => [...documents].slice(-3).reverse(), [documents]);

  const handleRowClick = (id) => {
    localStorage.setItem('finops_preview_doc_id', id);
    navigate('/pdf-preview');
  };

  const metricCards = [
    { label: 'Total Customers', value: customers.length, isMoney: false, color: 'from-[#1d8cf8] to-[#33b5e5]', icon: 'group', link: '/customers' },
    { label: 'Total Invoice Amount', value: totalInvoiceAmount, isMoney: true, color: 'from-[#00b074] to-[#05d688]', icon: 'receipt_long', link: '/invoices' },
    { label: 'Amount Received', value: totalReceived, isMoney: true, color: 'from-[#1d8cf8] to-[#6366f1]', icon: 'check_circle', link: '/customers' },
    { label: 'Total Due Amount', value: totalDue, isMoney: true, color: 'from-[#f59e0b] to-[#f97316]', icon: 'pending_actions', link: '/customers' },
  ];

  return (
    <div className="flex-grow overflow-y-auto p-lg w-full custom-scrollbar space-y-xl">
      <div className="w-full space-y-xl">
        {/* Dashboard Header & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-xl gap-md">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary mb-xs">Dashboard</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Welcome back. Here is what's happening with your accounts today.</p>
          </div>
          <div className="flex gap-md">
            <button
              onClick={() => navigate('/quotations/create')}
              className="flex items-center gap-sm border border-outline-variant bg-surface-container-lowest text-on-surface px-xl py-md rounded-full font-label-caps text-label-caps hover:bg-surface-container-high hover:border-secondary transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined">request_quote</span>
              Create Quotation
            </button>
            <button
              onClick={() => navigate('/invoices/create')}
              className="flex items-center gap-sm bg-secondary text-on-secondary px-xl py-md rounded-full font-label-caps text-label-caps hover:opacity-90 hover:shadow-lg shadow-secondary/10 transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined">receipt</span>
              Create Invoice
            </button>
          </div>
        </div>

        {/* Financial Summary Cards — 6 cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
          {metricCards.map(card => (
            <div
              key={card.label}
              onClick={() => navigate(card.link)}
              className={`bg-gradient-to-br ${card.color} text-white p-lg rounded-[20px] hover:shadow-lg hover:-translate-y-0.5 duration-200 shadow-md cursor-pointer transition-all min-h-[130px] flex flex-col justify-between`}
            >
              <div className="flex justify-between items-start mb-sm">
                <p className="text-[9px] font-bold text-white/80 uppercase leading-tight">{card.label}</p>
                <span className="material-symbols-outlined text-lg opacity-70">{card.icon}</span>
              </div>
              <h3 className="font-bold text-white mt-sm text-2xl leading-tight">
                {card.isMoney
                  ? `₹${card.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                  : card.value
                }
              </h3>
            </div>
          ))}
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl">
            <div className="flex justify-between items-center mb-xl">
              <h4 className="font-title-sm text-title-sm text-primary font-bold">Monthly Revenue Overview</h4>
              <div className="flex gap-xs">
                <button className="px-md py-sm bg-surface-container-high rounded-full text-xs font-label-caps hover:bg-surface-container-highest transition-colors cursor-pointer">6 Months</button>
                <button className="px-md py-sm bg-secondary text-on-secondary rounded-full text-xs font-label-caps hover:opacity-90 transition-opacity cursor-pointer">1 Year</button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-sm px-md pb-md border-b border-outline-variant">
              {/* Simplified Bar Chart Visual */}
              <div className="w-full flex flex-col items-center gap-sm">
                <div className="w-full bg-secondary-container/20 rounded-t-sm transition-all hover:bg-secondary" style={{ height: '40%' }}></div>
                <span className="font-label-caps text-xs text-on-surface-variant">Jan</span>
              </div>
              <div className="w-full flex flex-col items-center gap-sm">
                <div className="w-full bg-secondary-container/20 rounded-t-sm transition-all hover:bg-secondary" style={{ height: '55%' }}></div>
                <span className="font-label-caps text-xs text-on-surface-variant">Feb</span>
              </div>
              <div className="w-full flex flex-col items-center gap-sm">
                <div className="w-full bg-secondary-container/20 rounded-t-sm transition-all hover:bg-secondary" style={{ height: '48%' }}></div>
                <span className="font-label-caps text-xs text-on-surface-variant">Mar</span>
              </div>
              <div className="w-full flex flex-col items-center gap-sm">
                <div className="w-full bg-secondary-container/20 rounded-t-sm transition-all hover:bg-secondary" style={{ height: '72%' }}></div>
                <span className="font-label-caps text-xs text-on-surface-variant">Apr</span>
              </div>
              <div className="w-full flex flex-col items-center gap-sm">
                <div className="w-full bg-secondary-container/20 rounded-t-sm transition-all hover:bg-secondary" style={{ height: '65%' }}></div>
                <span className="font-label-caps text-xs text-on-surface-variant">May</span>
              </div>
              <div className="w-full flex flex-col items-center gap-sm">
                <div className="w-full bg-secondary-container/20 rounded-t-sm transition-all hover:bg-secondary" style={{ height: '85%' }}></div>
                <span className="font-label-caps text-xs text-on-surface-variant">Jun</span>
              </div>
              <div className="w-full flex flex-col items-center gap-sm">
                <div className="w-full bg-secondary-container/20 rounded-t-sm transition-all hover:bg-secondary" style={{ height: '95%' }}></div>
                <span className="font-label-caps text-xs text-on-surface-variant">Jul</span>
              </div>
            </div>
          </div>

          {/* Recent Activity Table Sidebar */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h4 className="font-title-sm text-title-sm text-primary font-bold">Recent Documents</h4>
              <button
                onClick={() => navigate('/invoices')}
                className="text-secondary font-label-caps text-xs hover:bg-secondary/5 px-sm py-xs rounded transition-colors cursor-pointer"
              >
                View All
              </button>
            </div>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full zebra-table border-collapse text-left">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant">ID</th>
                    <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant">Amount</th>
                    <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDocs.map((doc) => {
                    let badgeClass = 'bg-gray-50 text-gray-700 border-gray-200';
                    if (doc.status === 'PAID') badgeClass = 'bg-green-50 text-green-700 border-green-200';
                    else if (doc.status === 'SENT' || doc.status === 'PENDING' || doc.status === 'APPROVED') badgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
                    else if (doc.status === 'OVERDUE') badgeClass = 'bg-red-50 text-red-700 border-red-200';

                    return (
                      <tr
                        key={doc.id}
                        onClick={() => handleRowClick(doc.id)}
                        className="hover:bg-surface-container transition-colors cursor-pointer"
                      >
                        <td className="px-md py-md">
                          <p className="font-body-sm text-body-sm font-bold text-primary">{doc.id}</p>
                          <p className="font-label-caps text-[10px] text-on-surface-variant uppercase truncate max-w-[110px]">{doc.client}</p>
                        </td>
                        <td className="px-md py-md font-data-mono text-sm text-primary">
                          ₹{doc.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-md py-md text-right">
                          <span className={`inline-flex px-sm py-xs rounded-full ${badgeClass} text-[10px] font-bold border`}>
                            {doc.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Visual Asset Section (Asymmetric / Modern UI Decor) */}
        <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="relative overflow-hidden rounded-xl h-48 bg-primary-container flex items-center p-xl">
            <div className="relative z-10">
              <h4 className="font-headline-md text-headline-md text-on-primary mb-sm font-bold">FinOps Insights</h4>
              <p className="font-body-sm text-body-sm text-on-primary-container max-w-xs">AI-driven analysis suggests optimizing payment terms for 'Net 30' to improve cash flow by 15%.</p>
              <button
                onClick={() => navigate('/invoices')}
                className="mt-md text-inverse-primary font-label-caps text-xs flex items-center gap-xs hover:text-white transition-colors cursor-pointer"
              >
                Read Full Report <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden opacity-30"></div>
          </div>
          
          <div className="rounded-xl h-48 border border-outline-variant flex flex-col justify-center p-xl bg-surface-container-low relative group overflow-hidden">
            <div className="relative z-10">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">Active Quotations</p>
              <p className="font-display-lg text-display-lg text-primary font-bold">
                {activeQuotesCount} <span className="text-body-md font-normal text-on-surface-variant">Active Retainers</span>
              </p>
            </div>
            {/* Aesthetic background pattern */}
            <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
              <span className="material-symbols-outlined text-[120px]">hourglass_empty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
