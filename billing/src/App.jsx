import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import local data defaults
import { DEFAULT_CUSTOMERS, DEFAULT_DOCUMENTS } from './data/mockData';

// Import layout & page components
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import AddCustomer from './pages/AddCustomer';
import CreateInvoice from './pages/CreateInvoice';
import CreateQuotation from './pages/CreateQuotation';
import InvoicesList from './pages/InvoicesList';
import QuotationsList from './pages/QuotationsList';
import PdfPreview from './pages/PdfPreview';
import Settings from './pages/Settings';
import CustomerDueDetails from './pages/CustomerDueDetails';

// Default payments seed data
const DEFAULT_PAYMENTS = [
  {
    id: 'RCP-0001',
    invoiceId: 'INV-099644',
    customerId: 'CUST-001',
    customerName: 'ARUNRAJ .S',
    date: '2026-05-14',
    amount: 8999,
    mode: 'UPI',
    reference: 'UPI-TXN-0996',
    notes: 'Full payment received',
  },
  {
    id: 'RCP-0002',
    invoiceId: 'INV-559714',
    customerId: 'CUST-002',
    customerName: 'MICRO LASER ART',
    date: '2026-04-18',
    amount: 4200,
    mode: 'UPI',
    reference: 'UPI-TXN-5597',
    notes: 'Full payment received',
  },
  {
    id: 'RCP-0003',
    invoiceId: 'INV-587307',
    customerId: 'CUST-003',
    customerName: 'GOWTHAM',
    date: '2026-04-02',
    amount: 5000,
    mode: 'UPI',
    reference: 'UPI-TXN-5873',
    notes: 'Full payment received',
  },
  {
    id: 'RCP-0004',
    invoiceId: 'INV-581573',
    customerId: 'CUST-004',
    customerName: 'ANJUGAM',
    date: '2026-04-02',
    amount: 2500,
    mode: 'UPI',
    reference: 'UPI-TXN-5815',
    notes: 'Full payment received',
  },
  {
    id: 'RCP-0005',
    invoiceId: 'INV-156309',
    customerId: 'CUST-005',
    customerName: 'VICKY',
    date: '2026-04-02',
    amount: 10000,
    mode: 'UPI',
    reference: 'UPI-TXN-1563',
    notes: 'Full payment received',
  },
];

// One-time data reset requested by user
if (localStorage.getItem('finops_data_reset_v3') !== 'true') {
  localStorage.removeItem('finops_customers');
  localStorage.removeItem('finops_documents');
  localStorage.removeItem('finops_payments');
  localStorage.removeItem('finops_settings');
  localStorage.setItem('finops_data_reset_v3', 'true');
}

// Cloud API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://www.togethertechgroups.in/api';

async function callApi(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  const config = {
    method,
    headers,
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  
  const res = await fetch(`${API_BASE_URL}${endpoint}`, config);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `API call failed: ${res.statusText}`);
  }
  return res.json();
}

export default function App() {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('finops_customers');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOMERS;
  });

  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('finops_documents');
    return saved ? JSON.parse(saved) : DEFAULT_DOCUMENTS;
  });

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('finops_payments');
    return saved ? JSON.parse(saved) : DEFAULT_PAYMENTS;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('finops_settings');
    let parsed = saved ? JSON.parse(saved) : null;
    if (parsed) {
      if (parsed.brandColor === '#0058be' || !parsed.brandColor) {
        parsed.brandColor = '#8ec63f';
      }
      if (parsed.businessName === 'Together Tech Groups') {
        parsed.businessName = 'Together Tech';
      }
    }
    return parsed || {
      businessName: 'Together Tech',
      gstin: '27AAACF4582G1ZX',
      address: 'Suite 405, Tech Plaza, Financial District,\nSan Francisco, CA 94105',
      website: 'togethertechgroups.in',
      email: 'togethertechgroups@gmail.com',
      phone: '+91 90475 49682',
      accountNum: '8829 4410 2293',
      swift: 'BNKUS00129',
      branch: 'Global Business Center',
      brandColor: '#8ec63f',
    };
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync to local storage cache
  useEffect(() => {
    localStorage.setItem('finops_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('finops_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('finops_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('finops_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Load from Cloud Database on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [customersData, documentsData, paymentsData, settingsData] = await Promise.all([
          callApi('/billing/customers', 'GET'),
          callApi('/billing/documents', 'GET'),
          callApi('/billing/payments', 'GET'),
          callApi('/billing/settings', 'GET'),
        ]);

        if (customersData && customersData.length > 0) setCustomers(customersData);
        if (documentsData && documentsData.length > 0) setDocuments(documentsData);
        if (paymentsData && paymentsData.length > 0) setPayments(paymentsData);
        if (settingsData) setSettings(settingsData);
      } catch (err) {
        console.error('Failed to load data from cloud database:', err);
        showToast('Offline mode: Using cached browser data.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Sync state mutations to Cloud Database
  const handleSetCustomers = async (value) => {
    let nextVal;
    if (typeof value === 'function') {
      nextVal = value(customers);
    } else {
      nextVal = value;
    }
    setCustomers(nextVal);

    try {
      // Create / Update
      for (const next of nextVal) {
        const prev = customers.find(c => c.id === next.id);
        if (!prev || JSON.stringify(prev) !== JSON.stringify(next)) {
          await callApi('/billing/customers', 'POST', next);
        }
      }
      // Delete
      for (const prev of customers) {
        const next = nextVal.find(c => c.id === prev.id);
        if (!next) {
          await callApi(`/billing/customers?id=${prev.id}`, 'DELETE');
        }
      }
    } catch (err) {
      console.error('Cloud sync failed for customers:', err);
      showToast('Database write failed. Changes saved locally.');
    }
  };

  const handleSetDocuments = async (value) => {
    let nextVal;
    if (typeof value === 'function') {
      nextVal = value(documents);
    } else {
      nextVal = value;
    }
    setDocuments(nextVal);

    try {
      // Create / Update
      for (const next of nextVal) {
        const prev = documents.find(d => d.id === next.id);
        if (!prev || JSON.stringify(prev) !== JSON.stringify(next)) {
          await callApi('/billing/documents', 'POST', next);
        }
      }
      // Delete
      for (const prev of documents) {
        const next = nextVal.find(d => d.id === prev.id);
        if (!next) {
          await callApi(`/billing/documents?id=${prev.id}`, 'DELETE');
        }
      }
    } catch (err) {
      console.error('Cloud sync failed for documents:', err);
      showToast('Database write failed. Changes saved locally.');
    }
  };

  const handleSetPayments = async (value) => {
    let nextVal;
    if (typeof value === 'function') {
      nextVal = value(payments);
    } else {
      nextVal = value;
    }
    setPayments(nextVal);

    try {
      // Create / Update
      for (const next of nextVal) {
        const prev = payments.find(p => p.id === next.id);
        if (!prev || JSON.stringify(prev) !== JSON.stringify(next)) {
          await callApi('/billing/payments', 'POST', next);
        }
      }
      // Delete
      for (const prev of payments) {
        const next = nextVal.find(p => p.id === prev.id);
        if (!next) {
          await callApi(`/billing/payments?id=${prev.id}`, 'DELETE');
        }
      }
    } catch (err) {
      console.error('Cloud sync failed for payments:', err);
      showToast('Database write failed. Changes saved locally.');
    }
  };

  const handleSetSettings = async (value) => {
    let nextVal;
    if (typeof value === 'function') {
      nextVal = value(settings);
    } else {
      nextVal = value;
    }
    setSettings(nextVal);

    try {
      if (JSON.stringify(settings) !== JSON.stringify(nextVal)) {
        await callApi('/billing/settings', 'POST', nextVal);
      }
    } catch (err) {
      console.error('Cloud sync failed for settings:', err);
      showToast('Database write failed. Changes saved locally.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#8ec63f]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col items-center z-10 space-y-6">
          {/* Minimalist sleek loader */}
          <div className="w-10 h-10 relative flex items-center justify-center">
            {/* Spinning ring */}
            <div className="absolute inset-0 border-2 border-gray-800 rounded-full" />
            <div className="absolute inset-0 border-2 border-t-[#8ec63f] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          </div>
          
          <div className="text-center space-y-1">
            <h1 className="text-xl font-bold tracking-wider text-white font-neogen bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Together Tech
            </h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
              Billing Portal
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login showToast={showToast} />} />
        
        {/* Auth Layout Wrapper */}
        <Route element={<Layout settings={settings} toast={toast} theme={theme} toggleTheme={toggleTheme} />}>
          <Route path="/dashboard" element={<Dashboard customers={customers} documents={documents} payments={payments} />} />
          <Route path="/customers" element={<Customers customers={customers} setCustomers={handleSetCustomers} documents={documents} payments={payments} showToast={showToast} />} />
          <Route path="/customers/:id" element={<CustomerDueDetails customers={customers} documents={documents} payments={payments} setPayments={handleSetPayments} setDocuments={handleSetDocuments} showToast={showToast} />} />
          <Route path="/add-customer" element={<AddCustomer customers={customers} setCustomers={handleSetCustomers} showToast={showToast} />} />
          
          <Route path="/invoices" element={<InvoicesList documents={documents} setDocuments={handleSetDocuments} showToast={showToast} />} />
          <Route path="/invoices/create" element={<CreateInvoice settings={settings} customers={customers} documents={documents} setDocuments={handleSetDocuments} showToast={showToast} />} />
          <Route path="/invoices/edit/:id" element={<CreateInvoice settings={settings} customers={customers} documents={documents} setDocuments={setDocuments} showToast={showToast} />} />
          
          <Route path="/quotations" element={<QuotationsList documents={documents} setDocuments={handleSetDocuments} showToast={showToast} />} />
          <Route path="/quotations/create" element={<CreateQuotation settings={settings} customers={customers} documents={documents} setDocuments={handleSetDocuments} showToast={showToast} />} />
          <Route path="/quotations/edit/:id" element={<CreateQuotation settings={settings} customers={customers} documents={documents} setDocuments={handleSetDocuments} showToast={showToast} />} />
          
          <Route path="/pdf-preview" element={<PdfPreview settings={settings} customers={customers} documents={documents} setDocuments={handleSetDocuments} payments={payments} showToast={showToast} />} />
          <Route path="/settings" element={<Settings settings={settings} setSettings={handleSetSettings} showToast={showToast} />} />
          
          {/* Default redirect to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
