import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { siteConfig } = useStore();
  const faqs = siteConfig.faqs || [];
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="py-20 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-[#720026] font-semibold mb-2">
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Storage guidelines, WhatsApp dispatch, shelf life, and ingredient provenance.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-stone-200/90 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-serif font-semibold text-base sm:text-lg text-stone-900 hover:text-[#720026] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#720026]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-stone-600 text-sm leading-relaxed border-t border-stone-100">
                    <p>{faq.answer}</p>
                    {faq.category && (
                      <span className="inline-block mt-3 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                        Topic: {faq.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
