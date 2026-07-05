
'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';

function ContactContent() {
  const searchParams = useSearchParams();
  const preSelectedService = searchParams ? searchParams.get('service') || '' : '';
  const preSelectedPackage = searchParams ? searchParams.get('package') || '' : '';

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    businessName: '',
    requiredService: preSelectedService || preSelectedPackage || 'Website Development',
    budget: '₹10,000 - ₹20,000',
    message: preSelectedPackage ? `Enquiring for the ${preSelectedPackage} package.` : '',
  });

  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');

  const servicesList = [
    'Website Development',
    'Mobile App Development',
    'Flutter App Development',
    'Restaurant Software',
    'CRM / Admin Dashboard',
    'UI/UX Design',
    'Logo Design',
    'Poster Design',
    'SEO',
    'Meta Ads / Google Ads',
    'Digital Marketing'
  ];

  const budgetTiers = [
    'Under ₹10,000',
    '₹10,000 - ₹20,000',
    '₹20,000 - ₹50,000',
    '₹50,000 - ₹1,000,000',
    '₹1,000,000+'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.email || !formData.message) {
      setStatus('ERROR');
      setErrorMessage('Please fill in all required fields (Name, Mobile, Email, Message).');
      return;
    }

    setStatus('LOADING');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit enquiry. Please try again.');
      }

      setStatus('SUCCESS');
      
      // Auto redirect to WhatsApp after 2 seconds
      setTimeout(() => {
        const waText = `Hi Together Tech Groups, my name is ${formData.name}. I am enquiring about ${formData.requiredService} (Budget: ${formData.budget}). ${formData.message}`;
        window.open(`https://wa.me/919047549682?text=${encodeURIComponent(waText)}`, '_blank');
      }, 1500);

    } catch (err: any) {
      setStatus('ERROR');
      setErrorMessage(err.message || 'An error occurred during submission.');
    }
  };

  return (
    <div className="space-y-0">
      
      {/* Header */}
      <section className="py-24 bg-gradient-to-r from-brandGreen to-[#5c9930] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4 pt-8">
          <span className="text-emerald-100 font-extrabold text-sm uppercase tracking-wider">Connect With Us</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-neogen">Contact Together Tech</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            Fill in the enquiry form or ping our WhatsApp coordinates to schedule a discussion.
          </p>
        </div>
      </section>

      {/* Forms & Coordinates */}
      <section className="py-24 bg-slate-50 text-brandDark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Coordinates - Left 5 cols */}
          <div className="lg:col-span-5 space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-brandDark tracking-tight border-b border-slate-100 pb-3">Contact Information</h2>
            
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-brandGreenLight flex items-center justify-center text-brandGreen flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-brandDark text-sm uppercase tracking-wide">Phone Number</h4>
                  <p className="text-sm text-brandGray font-bold mt-1">+91 90475 49682</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-brandGreenLight flex items-center justify-center text-brandGreen flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-brandDark text-sm uppercase tracking-wide">Email Address</h4>
                  <p className="text-sm text-brandGray font-bold mt-1">togethertechgroups@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-brandGreenLight flex items-center justify-center text-brandGreen flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-brandDark text-sm uppercase tracking-wide">Office Address</h4>
                  <p className="text-sm text-brandGray mt-1">123 Tech Park, IT Corridor, Chennai, India</p>
                </div>
              </li>
            </ul>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h4 className="font-extrabold text-brandDark text-sm uppercase tracking-wide">Live WhatsApp</h4>
              <a
                href="https://wa.me/919047549682?text=Hi%20Together%20Tech%20Groups,%20I%20need%20details%20about%20your%20IT%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Google Map Mockup */}
            <div className="pt-6">
              <div className="h-48 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 relative flex items-center justify-center text-center p-4">
                <MapPin className="w-8 h-8 text-brandGreen animate-bounce absolute" />
                <span className="text-xxs text-brandGray font-bold uppercase z-10 pt-16">Chennai Office Location Map</span>
              </div>
            </div>
          </div>

          {/* Form - Right 7 cols */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-md space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-brandDark tracking-tight">Enquiry Form</h2>
              <p className="text-xs text-brandGray font-semibold leading-relaxed">
                Provide details below and submit to store in our dashboard. We will redirect you to WhatsApp to double-verify your request.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandDark uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full p-3.5 border border-slate-200 rounded-xl text-brandDark font-bold text-xs bg-slate-50/50 focus:border-brandGreen focus:ring-2 focus:ring-brandGreen/25 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandDark uppercase tracking-wider">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                    className="w-full p-3.5 border border-slate-200 rounded-xl text-brandDark font-bold text-xs bg-slate-50/50 focus:border-brandGreen focus:ring-2 focus:ring-brandGreen/25 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandDark uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@business.com"
                    className="w-full p-3.5 border border-slate-200 rounded-xl text-brandDark font-bold text-xs bg-slate-50/50 focus:border-brandGreen focus:ring-2 focus:ring-brandGreen/25 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandDark uppercase tracking-wider">Business Name (Optional)</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Vikas Retailers"
                    className="w-full p-3.5 border border-slate-200 rounded-xl text-brandDark font-bold text-xs bg-slate-50/50 focus:border-brandGreen focus:ring-2 focus:ring-brandGreen/25 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandDark uppercase tracking-wider">Required Service *</label>
                  <select
                    name="requiredService"
                    value={formData.requiredService}
                    onChange={handleChange}
                    className="w-full p-3.5 border border-slate-200 rounded-xl text-brandDark font-bold text-xs bg-slate-50/50 focus:border-brandGreen focus:ring-2 focus:ring-brandGreen/25 outline-none transition-all"
                  >
                    {servicesList.map((svc) => (
                      <option key={svc} value={svc}>{svc}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-black text-brandDark uppercase tracking-wider">Estimated Budget *</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full p-3.5 border border-slate-200 rounded-xl text-brandDark font-bold text-xs bg-slate-50/50 focus:border-brandGreen focus:ring-2 focus:ring-brandGreen/25 outline-none transition-all"
                  >
                    {budgetTiers.map((tier) => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-black text-brandDark uppercase tracking-wider">Your Message / Requirements *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Detail your operational needs, page numbers, payment options..."
                  className="w-full p-3.5 border border-slate-200 rounded-xl text-brandDark font-bold text-xs bg-slate-50/50 focus:border-brandGreen focus:ring-2 focus:ring-brandGreen/25 outline-none transition-all"
                  required
                />
              </div>

              {status === 'SUCCESS' && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Enquiry saved successfully! Redirecting to WhatsApp verify in 2s...</span>
                </div>
              )}

              {status === 'ERROR' && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-3 text-red-800 text-xs font-bold">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'LOADING'}
                className="w-full py-4 rounded-xl bg-brandGreen hover:bg-brandGreenHover text-white font-bold transition-all duration-300 shadow-md shadow-brandGreen/10 text-sm flex items-center justify-center space-x-2"
              >
                {status === 'LOADING' ? (
                  <span>Saving Enquiry...</span>
                ) : (
                  <>
                    <span>Submit & Open WhatsApp</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-brandGreen font-bold">Loading Contact...</div>}>
      <ContactContent />
    </Suspense>
  );
}
