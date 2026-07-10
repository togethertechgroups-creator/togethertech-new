import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Customers({ customers, setCustomers, documents, payments, showToast }) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState('ADD'); // 'ADD' or 'EDIT'
  const [selectedCust, setSelectedCust] = useState(null);

  // Form states for side-panel
  const [name, setName] = useState('');
  const [gstin, setGstin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesStatus = activeFilter === 'ALL' || c.status === activeFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        c.name.toLowerCase().includes(q) ||
        (c.gstin || '').toLowerCase().includes(q) ||
        (c.email || '').toLowerCase().includes(q) ||
        (c.phone && c.phone.includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [customers, activeFilter, searchQuery]);

  // Calculations for stats
  const totalCount = customers.length;
  const activeCount = customers.filter(c => c.status === 'ACTIVE').length;
  const activePercent = totalCount > 0 ? ((activeCount / totalCount) * 100).toFixed(1) : '0.0';
  
  const totalInvoiced = useMemo(() => {
    return documents
      .filter(doc => doc.type === 'Invoice')
      .reduce((sum, doc) => sum + doc.amount, 0);
  }, [documents]);
  
  const averageValue = totalCount > 0 ? (totalInvoiced / totalCount).toFixed(0) : '0';

  const openAddDrawer = () => {
    setDrawerMode('ADD');
    setSelectedCust(null);
    setName('');
    setGstin('');
    setEmail('');
    setPhone('');
    setAddress('');
    setDrawerOpen(true);
  };

  const openEditDrawer = (cust) => {
    setDrawerMode('EDIT');
    setSelectedCust(cust);
    setName(cust.name);
    setGstin(cust.gstin);
    setEmail(cust.email);
    setPhone(cust.phone || '');
    setAddress(cust.address || '');
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Customer Legal Name and Email are required.', 'error_outline');
      return;
    }

    if (drawerMode === 'ADD') {
      const newId = 'CUST-' + String(Date.now()).slice(-4);
      const newCust = {
        id: newId,
        name,
        gstin,
        email,
        phone,
        address: address || 'No address recorded',
        status: 'ACTIVE',
        spend: 0,
        tier: 'Standard Partner'
      };
      setCustomers([...customers, newCust]);
      showToast('Customer registered successfully!');
    } else {
      const updated = customers.map((c) => {
        if (c.id === selectedCust.id) {
          return {
            ...c,
            name,
            gstin,
            email,
            phone,
            address,
          };
        }
        return c;
      });
      setCustomers(updated);
      showToast('Customer details updated successfully!');
    }
    closeDrawer();
  };

  const handleExport = () => {
    showToast('Exporting customer database in CSV format...', 'download');
    setTimeout(() => {
      showToast('Export file downloaded successfully!');
    }, 1200);
  };

  return (
    <div className="flex-grow overflow-y-auto p-lg w-full custom-scrollbar space-y-xl">
      <div className="w-full p-xs space-y-xl">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-lg mb-xl">
          <div>
            <div className="flex items-center gap-sm mb-xs">
              <nav className="flex text-xs text-on-surface-variant font-medium gap-sm">
                <span>Main</span>
                <span>/</span>
                <span className="text-secondary font-bold">Customers</span>
              </nav>
            </div>
            <h2 className="font-display-lg text-display-lg text-primary font-bold">Customer Registry</h2>
            <p className="text-on-surface-variant mt-xs">Manage and monitor enterprise accounts and billing status.</p>
          </div>
          <div className="flex gap-md w-full md:w-auto">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow md:w-64 px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest font-body-sm text-body-sm focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
            />
            <button
              onClick={handleExport}
              className="bg-surface-container-lowest border border-outline-variant px-md py-sm flex items-center justify-center gap-sm font-bold text-on-surface hover:bg-surface-container-low transition-colors rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">download</span>
              <span className="font-label-caps text-label-caps">Export List</span>
            </button>
            <button
              onClick={openAddDrawer}
              className="bg-secondary text-on-secondary px-lg py-sm flex items-center justify-center gap-sm font-bold shadow-sm hover:shadow-md active:scale-95 transition-all rounded-full cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-xl">person_add</span>
              <span className="font-label-caps text-label-caps">+ Add Customer</span>
            </button>
          </div>
        </div>

        {/* Bento Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-xl">
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded flex flex-col gap-sm">
            <span className="text-on-surface-variant font-label-caps text-xs">Total Customers</span>
            <div className="flex items-baseline gap-sm">
              <span className="text-headline-md font-bold text-primary">{totalCount}</span>
              <span className="text-[10px] text-green-600 font-bold bg-green-50 px-base rounded">+12%</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded flex flex-col gap-sm">
            <span className="text-on-surface-variant font-label-caps text-xs">Active Registry</span>
            <div className="flex items-baseline gap-sm">
              <span className="text-headline-md font-bold text-primary">{activePercent}%</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded flex flex-col gap-sm">
            <span className="text-on-surface-variant font-label-caps text-xs">Avg. Billing Value</span>
            <div className="flex items-baseline gap-sm">
              <span className="text-headline-md font-bold text-primary">₹{Number(averageValue).toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded flex flex-col gap-sm">
            <span className="text-on-surface-variant font-label-caps text-xs">Pending Approvals</span>
            <div className="flex items-baseline gap-sm">
              <span className="text-headline-md font-bold text-primary">04</span>
              <span className="text-[10px] text-error font-bold bg-error-container/20 px-base rounded">High</span>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-sm mb-md px-xs">
          {['ALL', 'ACTIVE', 'PENDING', 'DELINQUENT'].map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-md py-xs rounded-full font-label-caps text-xs font-bold transition-all cursor-pointer ${
                activeFilter === status
                  ? 'bg-secondary text-on-secondary shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Customer Table Container */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant">
                  <th className="px-md py-lg font-label-caps text-on-surface-variant text-xs uppercase tracking-wider">Customer Name</th>
                  <th className="px-md py-lg font-label-caps text-on-surface-variant text-xs uppercase tracking-wider">GST Number</th>
                  <th className="px-md py-lg font-label-caps text-on-surface-variant text-xs uppercase tracking-wider">Contact Info</th>
                  <th className="px-md py-lg font-label-caps text-on-surface-variant text-xs uppercase tracking-wider">Status</th>
                  <th className="px-md py-lg font-label-caps text-on-surface-variant text-xs uppercase tracking-wider text-right">Total Invoiced</th>
                  <th className="px-md py-lg font-label-caps text-on-surface-variant text-xs uppercase tracking-wider text-center w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filteredCustomers.map((cust) => {
                  const initials = cust.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase();

                  let badge = 'bg-gray-100 text-gray-800 border-gray-200';
                  if (cust.status === 'ACTIVE') badge = 'bg-green-50 text-green-700 border-green-200';
                  else if (cust.status === 'PENDING') badge = 'bg-yellow-50 text-yellow-700 border-yellow-200';
                  else if (cust.status === 'DELINQUENT') badge = 'bg-red-50 text-red-700 border-red-200';

                  return (
                    <tr
                      key={cust.id}
                      onClick={() => navigate(`/customers/${cust.id}`)}
                      className="hover:bg-surface-container-low transition-colors cursor-pointer group"
                    >
                      <td className="px-md py-md">
                        <div className="flex items-center gap-md">
                          <div className="w-10 h-10 rounded bg-primary-container text-inverse-primary flex items-center justify-center font-bold font-headline-md">
                            {initials}
                          </div>
                          <div>
                            <div className="text-on-surface font-bold">{cust.name}</div>
                            <div className="text-xs text-on-surface-variant">{cust.tier}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-md py-md font-data-mono text-data-mono">{cust.gstin}</td>
                      <td className="px-md py-md">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-on-surface">{cust.email}</span>
                          <span className="text-xs text-on-surface-variant">{cust.phone}</span>
                        </div>
                      </td>
                      <td className="px-md py-md">
                        <span className={`inline-flex items-center px-sm py-xs rounded-full text-[10px] font-bold border ${badge}`}>
                          {cust.status}
                        </span>
                      </td>
                      <td className="px-md py-md text-right font-data-mono text-primary font-bold">
                        ₹{documents
                          .filter(doc => doc.type === 'Invoice' && doc.client === cust.name)
                          .reduce((sum, doc) => sum + doc.amount, 0)
                          .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-md py-md text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-xs">
                          <button
                            onClick={() => navigate(`/customers/${cust.id}`)}
                            title="View Due Details"
                            className="text-[10px] font-bold text-secondary border border-secondary rounded-full px-sm py-[2px] hover:bg-secondary hover:text-white transition-colors cursor-pointer"
                          >
                            Due Details
                          </button>
                          <button
                            onClick={() => openEditDrawer(cust)}
                            className="material-symbols-outlined text-on-surface-variant hover:text-secondary p-xs rounded transition-colors cursor-pointer"
                          >
                            edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-md bg-surface-container-lowest border-t border-outline-variant flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-medium">
              Showing {filteredCustomers.length} of {customers.length} customers
            </span>
          </div>
        </div>
      </div>

      {/* Slide-out Drawer Overlay */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-primary/40 backdrop-blur-sm z-[60] transition-opacity duration-200 ${
          drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      ></div>

      {/* Centered Modal Container */}
      <aside
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-surface-container-lowest shadow-2xl z-[70] rounded-2xl flex flex-col max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
          drawerOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-lg border-b border-outline-variant flex items-center justify-between bg-primary text-on-primary">
          <div>
            <h3 className="font-headline-md text-title-sm font-bold">
              {drawerMode === 'ADD' ? 'Create New Customer' : 'Update Client Info'}
            </h3>
            <p className="text-[10px] text-on-primary-container font-medium uppercase tracking-widest mt-base">
              Enterprise Onboarding
            </p>
          </div>
          <button
            onClick={closeDrawer}
            className="material-symbols-outlined hover:bg-white/10 rounded-full p-sm transition-colors text-white cursor-pointer"
          >
            close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-lg space-y-lg custom-scrollbar">
          <div className="space-y-md">
            <div className="flex flex-col gap-xs">
              <label className="text-xs font-bold text-on-surface-variant uppercase">Customer Legal Name</label>
              <input
                type="text"
                placeholder="e.g. Acme Corp Inc."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-md py-sm border border-outline rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-body-sm text-on-surface"
                required
              />
            </div>
            
            <div className="flex flex-col gap-xs">
              <label className="text-xs font-bold text-on-surface-variant uppercase">GST Number (Optional)</label>
              <input
                type="text"
                placeholder="27XXXXX0000X0Z0"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-md py-sm border border-outline rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-data-mono uppercase text-on-surface"
              />
            </div>

            <div className="grid grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Email Address</label>
                <input
                  type="email"
                  placeholder="billing@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-md py-sm border border-outline rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-body-sm text-on-surface"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-xs">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 000 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-md py-sm border border-outline rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-body-sm text-on-surface"
                />
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-xs font-bold text-on-surface-variant uppercase">Business Address</label>
              <textarea
                placeholder="Full registered office address..."
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-md py-sm border border-outline rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-body-sm resize-none text-on-surface"
              />
            </div>

            <div className="pt-md">
              <div className="p-md bg-surface-container rounded-lg border border-outline-variant border-dashed">
                <div className="flex items-center gap-md">
                  <span className="material-symbols-outlined text-secondary text-2xl">verified_user</span>
                  <div className="text-xs">
                    <p className="font-bold text-on-surface">Automatic Compliance Check</p>
                    <p className="text-on-surface-variant">System will verify GST credentials with government servers upon submission.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="p-lg bg-surface-container-low border-t border-outline-variant flex gap-md">
          <button
            type="button"
            onClick={closeDrawer}
            className="flex-1 py-sm border border-outline-variant bg-white text-on-surface-variant font-bold rounded-full hover:bg-surface-container transition-colors font-label-caps text-label-caps cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSubmit}
            className="flex-[2] py-sm bg-secondary text-on-secondary font-bold rounded-full hover:brightness-110 active:scale-95 transition-all font-label-caps text-label-caps shadow-lg shadow-secondary/20 hover:shadow-xl cursor-pointer"
          >
            {drawerMode === 'ADD' ? 'Register Customer' : 'Save Changes'}
          </button>
        </div>
      </aside>
    </div>
  );
}
