import React, { useState } from 'react';
import { BusinessTemplate, TEMPLATES, AGENCY_CONFIG } from '../../data/templateRegistry';
import { WebsiteOrderModal } from './WebsiteOrderModal';
import { ArrowLeft, Monitor, Tablet, Smartphone, MessageCircle, ChevronDown, Sparkles, Zap } from 'lucide-react';

interface TemplateNavbarProps {
  currentTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  onBackToHub: () => void;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  onChangeViewport: (mode: 'desktop' | 'tablet' | 'mobile') => void;
}

export const TemplateNavbar: React.FC<TemplateNavbarProps> = ({
  currentTemplateId,
  onSelectTemplate,
  onBackToHub,
  viewportMode,
  onChangeViewport
}) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const currentTemplate = TEMPLATES.find(t => t.id === currentTemplateId) || TEMPLATES[0];

  return (
    <>
      <div className="sticky top-0 z-50 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          {/* Left: Back button & Template Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBackToHub}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
              title="Return to Template Showcase Home"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Templates</span>
              <span className="sm:hidden">Back</span>
            </button>

            <span className="text-stone-700 hidden sm:inline" aria-hidden="true">|</span>

            {/* Template Switcher Dropdown */}
            <div className="relative flex items-center gap-2 min-w-0">
              <span className="text-[11px] text-stone-400 hidden md:inline shrink-0">Demo:</span>
              <select
                value={currentTemplateId}
                onChange={(e) => onSelectTemplate(e.target.value)}
                className="bg-stone-800 hover:bg-stone-750 text-xs font-semibold text-stone-100 py-1.5 pl-2.5 pr-8 rounded-lg border border-stone-700 focus:outline-none focus:border-stone-500 cursor-pointer truncate max-w-[200px] sm:max-w-xs"
              >
                {TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Center: Device Viewport Switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-stone-800/80 p-1 rounded-lg border border-stone-700/60">
            <button
              onClick={() => onChangeViewport('desktop')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewportMode === 'desktop' ? 'bg-stone-700 text-white shadow-xs' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Desktop View (Full Width)"
            >
              <Monitor className="w-4 h-4" />
            </button>

            <button
              onClick={() => onChangeViewport('tablet')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewportMode === 'tablet' ? 'bg-stone-700 text-white shadow-xs' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>

            <button
              onClick={() => onChangeViewport('mobile')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewportMode === 'mobile' ? 'bg-stone-700 text-white shadow-xs' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Mobile View (390px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Agency WhatsApp CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-xs transition-colors cursor-pointer"
              title="Order this website for your business"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Get This Website (48h)</span>
              <span className="sm:hidden">Get Site (48h)</span>
            </button>
          </div>
        </div>
      </div>

      <WebsiteOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        preselectedTemplateId={currentTemplateId}
        preselectedPackageId="one_premium"
      />
    </>
  );
};
