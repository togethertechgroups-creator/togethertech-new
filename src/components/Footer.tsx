import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-brandGray border-t border-slate-200 pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About column */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Together Tech Groups Logo"
              width={52}
              height={52}
              className="w-13 h-13 object-contain"
            />
            <span className="font-rustic text-2xl tracking-tight text-brandDark">
              Together<span className="text-brandGreen">Tech</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-brandGray">
            Together Tech Groups is a digital technology company helping businesses grow through premium websites, mobile apps, custom software, branding, SEO, and result-oriented digital marketing.
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com/togethertech" className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-brandGreen hover:text-white text-brandDark transition-colors flex items-center justify-center" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://twitter.com/togethertech" className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-brandGreen hover:text-white text-brandDark transition-colors flex items-center justify-center" aria-label="Twitter">
              <TwitterIcon />
            </a>
            <a href="https://linkedin.com/company/togethertech" className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-brandGreen hover:text-white text-brandDark transition-colors flex items-center justify-center" aria-label="Linkedin">
              <LinkedinIcon />
            </a>
            <a href="https://instagram.com/togethertech" className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-brandGreen hover:text-white text-brandDark transition-colors flex items-center justify-center" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>


        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="font-extrabold text-lg tracking-wide border-l-4 border-brandGreen pl-3 text-brandDark">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-3 text-sm">
            <li><Link href="/" className="hover:text-brandGreen transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-brandGreen transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-brandGreen transition-colors">Services</Link></li>
            <li><Link href="/portfolio" className="hover:text-brandGreen transition-colors">Portfolio</Link></li>
            <li><Link href="/packages" className="hover:text-brandGreen transition-colors">Packages</Link></li>
            <li><Link href="/team" className="hover:text-brandGreen transition-colors">Our Team</Link></li>
            <li><Link href="/contact" className="hover:text-brandGreen transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Services column */}
        <div className="space-y-6">
          <h3 className="font-extrabold text-lg tracking-wide border-l-4 border-brandGreen pl-3 text-brandDark">Services</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/services/website-development" className="hover:text-brandGreen transition-colors">Website Development</Link></li>
            <li><Link href="/services/mobile-app-development" className="hover:text-brandGreen transition-colors">Mobile App Development</Link></li>
            <li><Link href="/services/flutter-app-development" className="hover:text-brandGreen transition-colors">Flutter App Development</Link></li>
            <li><Link href="/services/ui-ux-design" className="hover:text-brandGreen transition-colors">UI/UX Prototype Design</Link></li>
            <li><Link href="/services/digital-marketing" className="hover:text-brandGreen transition-colors">Digital Marketing</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="font-extrabold text-lg tracking-wide border-l-4 border-brandGreen pl-3 text-brandDark">Get in Touch</h3>
          <ul className="space-y-4 text-sm text-brandGray">
            <li className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-brandGreen mt-0.5 flex-shrink-0" />
              <span>+91 90475 49682</span>
            </li>
            <li className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-brandGreen mt-0.5 flex-shrink-0" />
              <span>contact@togethertechgroups.in</span>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-brandGreen mt-0.5 flex-shrink-0" />
              <span>123 Tech Park, IT Corridor, Chennai, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-sm text-brandGray/80 space-y-4 md:space-y-0">
        <div>
          © {new Date().getFullYear()} Together Tech Groups. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link href="/admin/login" className="hover:text-brandGreen transition-colors font-semibold text-brandDark">Admin Login</Link>
          <a href="#" className="hover:text-brandGreen transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brandGreen transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
