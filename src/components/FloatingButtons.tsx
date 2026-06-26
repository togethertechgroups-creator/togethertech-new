'use client';

import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingButtons() {
  const whatsappNumber = '919876543210';
  const callNumber = '+919876543210';
  const message = 'Hi Together Tech Groups, I need details about your IT services. Please contact me.';
  const encodedMessage = encodeURIComponent(message);

  return (
    <>
      {/* Floating Call Button - Bottom Left */}
      <a
        href={`tel:${callNumber}`}
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-brandDark hover:bg-brandGreen text-white transition-all duration-300 shadow-md transform hover:scale-110 active:scale-95 group animate-bounce"
        title="Call Us Now"
      >
        <Phone className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
        <span className="absolute left-16 bg-brandDark border border-slate-700 text-white font-bold text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-md">
          Call +91 98765 43210
        </span>
      </a>

      {/* Floating WhatsApp Button - Bottom Right */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodedMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 shadow-lg transform hover:scale-110 active:scale-95 group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-600 group-hover:text-emerald-700 transition-colors" />
        <span className="absolute right-16 bg-brandDark border border-emerald-600/30 text-white font-bold text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-md">
          Chat on WhatsApp
        </span>
      </a>
    </>
  );
}
