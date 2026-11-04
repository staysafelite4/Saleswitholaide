import React, { useState } from 'react';
import { Mail, CheckCircle, ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

export const JumiaFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 mt-12 border-t border-stone-800 text-xs">
      {/* Newsletter Strip */}
      <div className="bg-[#1f1f1f] border-b border-stone-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white">
              <Mail className="w-5 h-5 text-[#F68B1E]" />
              <h4 className="font-extrabold text-sm sm:text-base uppercase tracking-wide">
                NEW TO JUMIA KITCHEN?
              </h4>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Subscribe to get $15 CAD off your first cookware order and exclusive flash deals.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3.5 py-2.5 rounded bg-stone-800 border border-stone-700 text-white placeholder-stone-500 text-xs flex-1 focus:outline-none focus:border-[#F68B1E]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#F68B1E] hover:bg-[#e07a16] text-white font-extrabold uppercase rounded text-xs transition-colors shrink-0"
            >
              MALE / FEMALE
            </button>
          </form>
        </div>
        {subscribed && (
          <div className="max-w-7xl mx-auto mt-2 text-center md:text-right text-emerald-400 text-xs flex items-center justify-center md:justify-end gap-1 font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Subscribed successfully! Use voucher code JUMIAKITCHEN at checkout.</span>
          </div>
        )}
      </div>

      {/* Trust Highlights */}
      <div className="border-b border-stone-800 py-6 px-4 bg-stone-900/60">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-[#F68B1E] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">100% Genuine Cookware</p>
              <p className="text-[11px] text-stone-400">Direct from factory & brands</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-[#F68B1E] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">Jumia Express 24H</p>
              <p className="text-[11px] text-stone-400">Next-day door delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-[#F68B1E] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">7-Day Free Returns</p>
              <p className="text-[11px] text-stone-400">Hassle-free exchange & refund</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-[#F68B1E] shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">24/7 Priority Support</p>
              <p className="text-[11px] text-stone-400">Phone: 0700 600 0000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-400 text-xs">
        <div>
          <h5 className="font-bold text-white uppercase tracking-wider mb-3">NEED HELP?</h5>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-white transition-colors">Chat With Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center & FAQs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us (0700 600 0000)</a></li>
            <li><a href="#" className="hover:text-white transition-colors">How to Shop on Jumia</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Delivery Options & Timelines</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Return & Refund Policy</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white uppercase tracking-wider mb-3">ABOUT JUMIA</h5>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-white transition-colors">About Jumia Nigeria</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Jumia Express Delivery</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Official Brand Stores</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Notice</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Flash Sales Terms</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white uppercase tracking-wider mb-3">MAKE MONEY ON JUMIA</h5>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-white transition-colors">Sell on Jumia (Kitchenware)</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Vendor Hub & Academy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Become a Sales Consultant</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Jumia City Partner Program</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Logistics Services</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white uppercase tracking-wider mb-3">JUMIA INTERNATIONAL</h5>
          <div className="grid grid-cols-2 gap-1.5 text-stone-400">
            <span>🇳🇬 Nigeria</span>
            <span>🇪🇬 Egypt</span>
            <span>🇰🇪 Kenya</span>
            <span>🇬🇭 Ghana</span>
            <span>🇲🇦 Morocco</span>
            <span>🇨🇮 Ivory Coast</span>
            <span>🇸🇳 Senegal</span>
            <span>🇺🇬 Uganda</span>
          </div>

          <h5 className="font-bold text-white uppercase tracking-wider mt-5 mb-2">PAYMENT METHODS</h5>
          <div className="flex flex-wrap gap-2 text-[10px] text-stone-300">
            <span className="bg-stone-800 px-2 py-1 rounded border border-stone-700">Mastercard</span>
            <span className="bg-stone-800 px-2 py-1 rounded border border-stone-700">Visa</span>
            <span className="bg-stone-800 px-2 py-1 rounded border border-stone-700">Verve</span>
            <span className="bg-stone-800 px-2 py-1 rounded border border-stone-700">Interswitch</span>
            <span className="bg-stone-800 px-2 py-1 rounded border border-stone-700">Pay on Delivery</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-stone-800 py-4 px-4 text-center text-stone-500 text-[11px] flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <p>Copyright © 2026 Jumia Nigeria — The Premier Kitchen Utensils & Home Store. All Rights Reserved.</p>
        <p className="text-[#F68B1E] font-semibold">Developed by dev. Emmanuel Kehinde</p>
      </div>
    </footer>
  );
};
