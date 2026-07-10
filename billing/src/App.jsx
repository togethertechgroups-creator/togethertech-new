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

  // Sync to local storage
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

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login showToast={showToast} />} />
        
        {/* Auth Layout Wrapper */}
        <Route element={<Layout settings={settings} toast={toast} theme={theme} toggleTheme={toggleTheme} />}>
          <Route path="/dashboard" element={<Dashboard customers={customers} documents={documents} payments={payments} />} />
          <Route path="/customers" element={<Customers customers={customers} setCustomers={setCustomers} documents={documents} payments={payments} showToast={showToast} />} />
          <Route path="/customers/:id" element={<CustomerDueDetails customers={customers} documents={documents} payments={payments} setPayments={setPayments} setDocuments={setDocuments} showToast={showToast} />} />
          <Route path="/add-customer" element={<AddCustomer customers={customers} setCustomers={setCustomers} showToast={showToast} />} />
          
          <Route path="/invoices" element={<InvoicesList documents={documents} setDocuments={setDocuments} showToast={showToast} />} />
          <Route path="/invoices/create" element={<CreateInvoice settings={settings} customers={customers} documents={documents} setDocuments={setDocuments} showToast={showToast} />} />
          <Route path="/invoices/edit/:id" element={<CreateInvoice settings={settings} customers={customers} documents={documents} setDocuments={setDocuments} showToast={showToast} />} />
          
          <Route path="/quotations" element={<QuotationsList documents={documents} setDocuments={setDocuments} showToast={showToast} />} />
          <Route path="/quotations/create" element={<CreateQuotation settings={settings} customers={customers} documents={documents} setDocuments={setDocuments} showToast={showToast} />} />
          <Route path="/quotations/edit/:id" element={<CreateQuotation settings={settings} customers={customers} documents={documents} setDocuments={setDocuments} showToast={showToast} />} />
          
          <Route path="/pdf-preview" element={<PdfPreview settings={settings} customers={customers} documents={documents} setDocuments={setDocuments} payments={payments} showToast={showToast} />} />
          <Route path="/settings" element={<Settings settings={settings} setSettings={setSettings} showToast={showToast} />} />
          
          {/* Default redirect to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
