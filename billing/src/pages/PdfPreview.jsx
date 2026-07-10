import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PdfPreview({ settings, customers, documents, setDocuments, payments, showToast }) {
  const navigate = useNavigate();
  const [selectedSignatureId, setSelectedSignatureId] = useState('');

  const signatures = settings?.signatures || [];
  const selectedSignature = signatures.find(s => s.id === selectedSignatureId);

  const activeDoc = useMemo(() => {
    const docId = localStorage.getItem('finops_preview_doc_id') || '';
    
    if (docId.startsWith('RCP-') && payments) {
      const receipt = payments.find(p => p.id === docId);
      if (receipt) {
        return {
          id: receipt.id,
          client: receipt.customerName,
          type: 'Receipt',
          date: receipt.date,
          amount: receipt.amount,
          gstPercent: 0,
          discountPercent: 0,
          billingAddress: receipt.billingAddress || '',
          lineItems: [
            {
              id: 1,
              desc: `Payment Received for Invoice #${receipt.invoiceId}`,
              details: `Payment Mode: ${receipt.mode}${receipt.reference ? ` (Ref: ${receipt.reference})` : ''}\nNotes: ${receipt.notes || 'N/A'}`,
              qty: 1,
              price: receipt.amount
            }
          ]
        };
      }
    }
    
    return documents.find((d) => d.id === docId) || documents[0];
  }, [documents, payments]);

  const clientInfo = useMemo(() => {
    if (!activeDoc) return null;
    return customers.find((c) => c.name === activeDoc.client) || {
      name: activeDoc.client,
      email: 'accounts@clientcompany.com',
      address: 'Standard Client Office Address',
      phone: '+91 98765 43210'
    };
  }, [activeDoc, customers]);

  const calcs = useMemo(() => {
    if (!activeDoc) return { subtotal: 0, discount: 0, tax: 0, total: 0, gstPercent: 0, discountPercent: 0 };
    
    const gstPercent = activeDoc.gstPercent !== undefined ? activeDoc.gstPercent : 0;
    const discountPercent = activeDoc.discountPercent !== undefined ? activeDoc.discountPercent : 0;
    
    const subtotal = activeDoc.lineItems 
      ? activeDoc.lineItems.reduce((sum, item) => sum + (item.qty * item.price), 0)
      : activeDoc.amount / (1 + (gstPercent / 100));
      
    const discountAmount = subtotal * (discountPercent / 100);
    const gstBase = subtotal - discountAmount;
    const gstAmount = gstBase * (gstPercent / 100);
    
    return {
      subtotal,
      discount: discountAmount,
      tax: gstAmount,
      total: activeDoc.amount,
      gstPercent,
      discountPercent
    };
  }, [activeDoc]);

  // Compute total paid & balance for this invoice
  const paymentSummary = useMemo(() => {
    if (!activeDoc || activeDoc.type === 'Receipt' || activeDoc.type === 'Quotation') {
      return { totalPaid: 0, balance: 0, hasPayments: false };
    }
    const paid = (payments || [])
      .filter(p => p.invoiceId === activeDoc.id)
      .reduce((sum, p) => sum + p.amount, 0);
    const balance = (activeDoc.amount || 0) - paid;
    return { totalPaid: paid, balance, hasPayments: paid > 0 };
  }, [activeDoc, payments]);


  const itemsList = useMemo(() => {
    if (activeDoc?.lineItems && activeDoc.lineItems.length > 0) {
      return activeDoc.lineItems;
    }
    return [
      { id: 1, desc: 'Professional Services Scope Execution', qty: 1, price: calcs.subtotal }
    ];
  }, [activeDoc, calcs]);

  // Real client-side PDF export using html2canvas & jsPDF (matches preview 100%)
  const handleDownload = async () => {
    showToast('Generating PDF document...', 'info_outline');
    try {
      const invoiceElement = document.getElementById('invoice-print-area');
      if (!invoiceElement) {
        showToast('Error: Invoice print area not found', 'error');
        return;
      }

      // Temporarily hide decorative UI borders & shadow for clean PDF canvas
      const originalBoxShadow = invoiceElement.style.boxShadow;
      const originalBorder = invoiceElement.style.border;
      const originalBorderRadius = invoiceElement.style.borderRadius;

      invoiceElement.style.boxShadow = 'none';
      invoiceElement.style.border = 'none';
      invoiceElement.style.borderRadius = '0';

      const canvas = await html2canvas(invoiceElement, {
        scale: 3, // High DPI rendering
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      // Restore styling on preview screen
      invoiceElement.style.boxShadow = originalBoxShadow;
      invoiceElement.style.border = originalBorder;
      invoiceElement.style.borderRadius = originalBorderRadius;

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      const imageHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imageHeight;
      let position = 0;

      pdf.addImage(
        imageData,
        "PNG",
        0,
        position,
        pdfWidth,
        imageHeight
      );

      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imageHeight;
        pdf.addPage();
        pdf.addImage(
          imageData,
          "PNG",
          0,
          position,
          pdfWidth,
          imageHeight
        );
        heightLeft -= pdfHeight;
      }

      pdf.save(`${activeDoc.id}.pdf`);
      showToast('PDF downloaded successfully!');
    } catch (err) {
      console.error("PDF generation failed:", err);
      showToast('Failed to generate PDF document');
    }
  };

  const handleSend = async () => {
    const rawPhone = clientInfo?.phone || '';
    const cleanPhone = rawPhone.replace(/\D/g, '');
    
    if (!cleanPhone) {
      showToast('Error: Customer does not have a phone number entered!', 'error');
      return;
    }

    let formattedPhone = cleanPhone;
    if (formattedPhone.length === 10) {
      formattedPhone = '91' + formattedPhone;
    }

    try {
      showToast('Generating PDF for WhatsApp...', 'info_outline');
      const invoiceElement = document.getElementById('invoice-print-area');
      if (!invoiceElement) {
        showToast('Error: Invoice print area not found', 'error');
        return;
      }

      // Hide shadows/borders temporarily for clean screenshot
      const originalBoxShadow = invoiceElement.style.boxShadow;
      const originalBorder = invoiceElement.style.border;
      const originalBorderRadius = invoiceElement.style.borderRadius;

      invoiceElement.style.boxShadow = 'none';
      invoiceElement.style.border = 'none';
      invoiceElement.style.borderRadius = '0';

      const canvas = await html2canvas(invoiceElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      invoiceElement.style.boxShadow = originalBoxShadow;
      invoiceElement.style.border = originalBorder;
      invoiceElement.style.borderRadius = originalBorderRadius;

      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = 210;
      const pdfHeight = 297;
      const imageHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imageHeight;
      let position = 0;

      pdf.addImage(imageData, 'PNG', 0, position, pdfWidth, imageHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imageHeight;
        pdf.addPage();
        pdf.addImage(imageData, 'PNG', 0, position, pdfWidth, imageHeight);
        heightLeft -= pdfHeight;
      }

      const pdfBlob = pdf.output('blob');

      showToast('Uploading PDF for WhatsApp delivery...', 'info_outline');

      const formData = new FormData();
      formData.append('file', pdfBlob, `${activeDoc.id}.pdf`);

      const uploadRes = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: formData
      });

      if (!uploadRes.ok) {
        throw new Error('Upload to tmpfiles.org failed');
      }

      const uploadData = await uploadRes.json();
      if (!uploadData.data || !uploadData.data.url) {
        throw new Error('Upload response missing URL');
      }

      // Convert view URL to direct download URL (needed by WhatsApp API)
      const publicUrl = uploadData.data.url.replace('https://tmpfiles.org/', 'https://tmpfiles.org/dl/');

      showToast('Sending via Metamerged WhatsApp API...', 'send');

      const apiToken = '6706963cd785e0eefa38f06c81e39cd3';
      const messageText = `Here is your ${activeDoc.type} #${activeDoc.id} from ${settings?.businessName || 'Together Tech'}.`;
      const apiUrl = `https://api.metamerged.com/api/send?number=${formattedPhone}&type=document&message=${encodeURIComponent(messageText)}&document_url=${encodeURIComponent(publicUrl)}&file_name=${encodeURIComponent(activeDoc.id + '.pdf')}&access_token=${apiToken}`;

      // Use mode: 'no-cors' to prevent browser from blocking the request due to missing CORS headers on Metamerged API
      await fetch(apiUrl, { mode: 'no-cors' });

      if (setDocuments && activeDoc) {
        setDocuments(prevDocs => prevDocs.map(doc => {
          if (doc.id === activeDoc.id) {
            return { ...doc, status: 'SENT' };
          }
          return doc;
        }));
      }

      showToast('Document sent successfully to customer via WhatsApp! ✅');
      navigate(activeDoc.type === 'Invoice' ? '/invoices' : '/quotations');
    } catch (err) {
      console.error('WhatsApp API delivery failed:', err);
      showToast('Failed to send document automatically. Redirecting to manual WhatsApp link...', 'warning');
      
      // Fallback: Open wa.me link directly
      const message = `Hello ${clientInfo?.name || ''},\n\nPlease find your ${activeDoc.type} *#${activeDoc.id}* from *${settings?.businessName || 'Together Tech'}*.\n\nAmount: ₹${(activeDoc.amount || 0).toLocaleString()}\nDate: ${activeDoc.date}\n\nThank you!`;
      const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    }
  };

  if (!activeDoc) {
    return <div className="p-lg text-center font-bold">No preview document selected.</div>;
  }

  const accentColor = settings?.brandColor || '#8ec63f';

  return (
    <div className="flex flex-col md:flex-row h-full min-h-0">
      {/* Printable Preview Area */}
      <div className="flex-1 overflow-y-auto p-lg md:p-xl flex justify-center bg-surface-dim/30 dark:bg-primary-container/10 custom-scrollbar print:p-0 print:bg-white z-10">
        <div id="invoice-print-area" className="bg-white text-black w-full max-w-[800px] h-[1122px] rounded-xl shadow-lg flex flex-col justify-between overflow-hidden border border-outline-variant print:border-none print:shadow-none print:rounded-none relative pb-16">
          
          {/* Header slanted SVG segment */}
          <div className="relative w-full h-32 bg-white select-none">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 128" preserveAspectRatio="none">
              {/* Green Slanted Ribbon (z-10, drawn first) */}
              <polygon points="408.8,0 456.8,0 415.2,128 367.2,128" fill={accentColor} />
              {/* Navy Block Left slanted (z-20, drawn on top) */}
              <polygon points="0,0 440,0 360.8,128 0,128" fill="#242f3e" />
            </svg>
            
            {/* Left Side Header Text overlay */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-xl z-30">
              <div className="flex items-center gap-sm">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  <img src="/logo.webp" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-black text-lg md:text-xl tracking-wider leading-none uppercase text-white mb-[2px] font-neogen">{settings?.businessName || 'Together Tech'}</h2>
                  <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">{settings?.website || 'togethertechgroups.in'}</p>
                </div>
              </div>
            </div>
            
            {/* Right Side Document Title and Meta */}
            <div className="absolute inset-y-0 right-0 flex flex-col justify-center items-end pr-xl z-30 text-[#242f3e]">
              <h1 className="font-extrabold text-3xl tracking-widest leading-none uppercase" style={{ color: accentColor }}>
                {activeDoc.type}
              </h1>
              <div className="text-[10px] text-gray-500 mt-xs font-bold font-data-mono space-y-0.5 text-right">
                <p className="uppercase">Number: #{activeDoc.id}</p>
                <p className="uppercase">Date: {activeDoc.date}</p>
              </div>
            </div>
          </div>

          {/* Invoice To / Invoice From details */}
          <div className="grid grid-cols-2 gap-xl px-xl py-lg text-xs bg-white">
            <div className="space-y-xs">
              <p className="font-bold text-[10px] uppercase tracking-wider" style={{ color: accentColor }}>Invoice To:</p>
              <div className="space-y-0.5">
                <h3 className="font-bold text-[#242f3e] text-sm">{clientInfo.name}</h3>
                {clientInfo.tier && <p className="text-gray-500 font-semibold text-[10px]">{clientInfo.tier}</p>}
                <p className="text-gray-600 font-medium">{clientInfo.address}</p>
                {clientInfo.phone && <p className="text-gray-600">Phone: {clientInfo.phone}</p>}
                <p className="text-gray-600 font-data-mono">{clientInfo.email}</p>
                {clientInfo.gstin && <p className="text-gray-500 font-data-mono font-bold text-[10px] uppercase">GSTIN: {clientInfo.gstin}</p>}
              </div>
            </div>
            
            <div className="space-y-xs text-right">
              <p className="font-bold text-[10px] uppercase tracking-wider" style={{ color: accentColor }}>Invoice From:</p>
              <div className="space-y-0.5">
                <h3 className="font-bold text-[#242f3e] text-sm font-neogen">{settings?.businessName || 'Together Tech'}</h3>
                <p className="text-gray-600 font-medium">{settings?.address || 'Suite 405, Tech Plaza, Financial District'}</p>
                <p className="text-gray-600">Phone: {settings?.phone || '+91 90475 49682'}</p>
                <p className="text-gray-600 font-data-mono">{settings?.email || 'togethertechgroups@gmail.com'}</p>
                {settings?.gstin && <p className="text-gray-500 font-data-mono font-bold text-[10px] uppercase">GSTIN: {settings.gstin}</p>}
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="px-xl py-md overflow-hidden">
            <table className="w-[calc(100%+6mm)] text-left border-separate text-xs -ml-[3mm]" style={{ borderSpacing: '3mm 0px' }}>
              <thead>
                <tr>
                  <th className="py-sm px-xs font-bold uppercase text-[10px] text-white w-12 text-center" style={{ backgroundColor: accentColor }}>NO.</th>
                  <th className="py-sm px-md font-bold uppercase text-[10px] text-white text-center" style={{ backgroundColor: accentColor }}>PRODUCT DESCRIPTION</th>
                  <th className="py-sm px-xs font-bold uppercase text-[10px] text-white w-24 text-center bg-[#242f3e]">PRICE</th>
                  <th className="py-sm px-xs font-bold uppercase text-[10px] text-white w-20 text-center bg-[#242f3e]">QTY.</th>
                  <th className="py-sm px-md font-bold uppercase text-[10px] text-white w-28 text-center bg-[#242f3e]">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {itemsList.map((item, idx) => (
                  <tr key={item.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f4f7f6]'}>
                    <td className="py-md px-xs text-center font-bold text-gray-500 font-data-mono border-b border-gray-100/60">
                      {String(idx + 1).padStart(2, '0')}
                    </td>
                    <td className="py-md px-md text-center border-b border-gray-100/60">
                      <p className="font-bold text-[#242f3e]">{item.desc || 'Services rendered'}</p>
                      <p className="text-gray-500 text-[10px] mt-[2px]">{item.details || 'Professional execution retainer'}</p>
                    </td>
                    <td className="py-md px-xs text-center font-data-mono text-gray-600 border-b border-gray-100/60">
                      ₹{(item.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-md px-xs text-center font-data-mono text-gray-600 border-b border-gray-100/60">
                      {item.qty || 1}
                    </td>
                    <td className="py-md px-md text-center font-bold font-data-mono text-[#242f3e] border-b border-gray-100/60">
                      ₹{((item.qty || 1) * (item.price || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Spacer pushes bottom section to the bottom of the page */}
          <div className="flex-grow"></div>

          {/* Calculations and payment info details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl px-xl py-md mt-auto">
            {/* Payment Method / Instructions */}
            <div>
              <p className="font-bold text-[10px] uppercase tracking-wider mb-xs" style={{ color: accentColor }}>Payment Method:</p>
              <div className="text-[11px] text-gray-600 space-y-0.5 font-medium">
                <p><span className="font-bold text-[#242f3e]">Account No:</span> {settings?.accountNum || '8829 4410 2293'}</p>
                <p><span className="font-bold text-[#242f3e]">Branch Name:</span> {settings?.branch || 'Global Business Center'}</p>
                <p><span className="font-bold text-[#242f3e]">SWIFT/IFSC:</span> {settings?.swift || 'BNKUS00129'}</p>
              </div>
            </div>

            {/* Signature Line centered */}
            <div className="flex flex-col items-center justify-end pb-md">
              <div className="w-48 border-b border-gray-300 pb-xs text-center flex flex-col items-center justify-end h-24">
                {selectedSignature ? (
                  <img src={selectedSignature.image} alt={selectedSignature.label} className="max-w-full max-h-20 object-contain" />
                ) : (
                  <span className="font-signature font-bold text-gray-400 select-none">Authorized Sign</span>
                )}
              </div>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-xs text-center">
                {selectedSignature ? selectedSignature.label : 'Authorised Sign'}
              </p>
            </div>

            {/* Summary Totals Table */}
            <div className="space-y-sm flex flex-col justify-start">
              <div className="space-y-xs text-xs pl-md border-l border-gray-100">
                <div className="flex justify-between items-center py-xs">
                  <span className="text-gray-500 font-bold uppercase text-[10px]">Subtotal:</span>
                  <span className="font-data-mono text-[#242f3e] font-bold">
                    ₹{calcs.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                {calcs.discount > 0 && (
                  <div className="flex justify-between items-center py-xs border-b border-gray-100">
                    <span className="text-gray-500 font-bold uppercase text-[10px]">Discount ({calcs.discountPercent}%):</span>
                    <span className="font-data-mono text-red-600 font-bold">
                      -₹{calcs.discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                {calcs.tax > 0 && (
                  <div className="flex justify-between items-center py-xs">
                    <span className="text-gray-500 font-bold uppercase text-[10px]">Tax ({calcs.gstPercent}%):</span>
                    <span className="font-data-mono text-[#242f3e] font-bold">
                      ₹{calcs.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                
                {/* Total banner block */}
                <div className="flex justify-between items-center text-white px-md py-sm rounded mt-md" style={{ backgroundColor: accentColor }}>
                  <span className="font-extrabold uppercase tracking-widest text-[11px]">Total:</span>
                  <span className="font-extrabold text-base font-data-mono">
                    ₹{calcs.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Amount Paid & Balance Due */}
                {paymentSummary.hasPayments && (
                  <>
                    <div className="flex justify-between items-center py-xs border-t border-gray-100 mt-xs">
                      <span className="text-green-600 font-bold uppercase text-[10px]">Amount Paid:</span>
                      <span className="font-data-mono text-green-600 font-bold">
                        ₹{paymentSummary.totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-md py-sm rounded" style={{ backgroundColor: paymentSummary.balance <= 0 ? '#dcfce7' : '#fef2f2' }}>
                      <span className="font-extrabold uppercase tracking-widest text-[11px]" style={{ color: paymentSummary.balance <= 0 ? '#16a34a' : '#dc2626' }}>
                        {paymentSummary.balance <= 0 ? 'Fully Paid ✓' : 'Balance Due:'}
                      </span>
                      <span className="font-extrabold text-base font-data-mono" style={{ color: paymentSummary.balance <= 0 ? '#16a34a' : '#dc2626' }}>
                        ₹{Math.max(0, paymentSummary.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Terms and conditions - now placed below calculations */}
          <div className="px-xl py-sm space-y-xs text-[10px] text-gray-500">
            <p className="font-bold uppercase tracking-wider" style={{ color: accentColor }}>Terms & Conditions:</p>
            <p className="leading-relaxed">This document serves as an official accounting statement. Remittances should be issued strictly matching the payment term limits. Under no circumstances should payments exceed balance terms without authorization.</p>
          </div>

          {/* Footer edge to edge banner */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#242f3e] text-white text-[10px] py-md px-xl flex justify-between items-center z-10">
            <div className="flex items-center gap-md font-bold">
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-[13px]" style={{ color: accentColor }}>phone</span>
                <span>{settings?.phone || '+91 90475 49682'}</span>
              </div>
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-[13px]" style={{ color: accentColor }}>mail</span>
                <span>{settings?.email || 'togethertechgroups@gmail.com'}</span>
              </div>
            </div>
            <p className="font-extrabold tracking-wider uppercase text-white">Thank You For Your Business</p>
          </div>

        </div>
      </div>

      {/* Sidebar Action panel */}
      <aside className="w-full md:w-80 bg-surface-container-low border-l border-outline-variant p-lg flex flex-col gap-md print:hidden sticky top-[64px] h-[calc(100vh-64px)] z-20 shrink-0">
        <div className="space-y-sm">
          <h3 className="font-title-sm text-title-sm text-primary font-bold">Actions</h3>
          <p className="text-body-sm text-on-surface-variant">Review the high-fidelity document before distribution.</p>
        </div>

        {/* Signature Selector */}
        <div className="space-y-md bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
          <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold text-xs flex items-center gap-xs">
            <span className="material-symbols-outlined text-[18px]">draw</span>
            Document Signature
          </h4>
          
          {signatures.length === 0 ? (
            <div className="text-xs text-on-surface-variant text-gray-500 py-xs leading-relaxed">
              No signatures found. Upload signatures in{' '}
              <a href="/settings" className="text-primary font-bold hover:underline">
                Settings
              </a>{' '}
              to embed them here.
            </div>
          ) : (
            <div className="space-y-sm">
              <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider">Select Signature:</label>
              <select
                value={selectedSignatureId}
                onChange={(e) => setSelectedSignatureId(e.target.value)}
                className="w-full border border-outline-variant rounded-lg px-sm py-xs outline-none text-xs bg-white text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
              >
                <option value="">-- No Signature --</option>
                {signatures.map((sig) => (
                  <option key={sig.id} value={sig.id}>
                    {sig.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-sm">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-sm bg-secondary text-white py-md px-lg rounded-full font-bold hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer shadow-md text-xs font-label-caps"
          >
            <span className="material-symbols-outlined">download</span>
            Download PDF
          </button>
          
          <button
            onClick={handleSend}
            className="flex items-center justify-center gap-sm bg-white border border-primary text-primary py-md px-lg rounded-full font-bold hover:bg-surface-container-high transition-all active:scale-[0.98] cursor-pointer text-xs font-label-caps"
          >
            <span className="material-symbols-outlined">send</span>
            Send to Customer
          </button>
          
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-sm bg-white border border-outline text-on-surface-variant py-md px-lg rounded-full font-bold hover:bg-surface-container-high transition-all active:scale-[0.98] cursor-pointer text-xs font-label-caps"
          >
            <span className="material-symbols-outlined">print</span>
            Print
          </button>
        </div>
        
        <hr className="border-outline-variant my-md" />
        
        <div className="space-y-md">
          <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold text-xs">Document History</h4>
          <div className="space-y-md">
            <div className="flex gap-sm">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined text-sm">edit</span>
              </div>
              <div>
                <p className="text-body-sm font-semibold text-primary">Draft Created</p>
                <p className="text-xs text-on-surface-variant">Today, {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
