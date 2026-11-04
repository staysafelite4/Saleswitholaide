import React, { useState, useRef } from 'react';
import { useSpa } from '../../context/SpaContext';
import { SpaTreatment, SpaAppointment } from '../../types/spa';
import {
  SPA_HERO_IMAGE,
  SPA_OIL_IMAGE
} from '../../data/initialSpaData';
import {
  X,
  Lock,
  DollarSign,
  Leaf,
  Megaphone,
  Palette,
  Calendar,
  ClipboardList,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Check,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  Download,
  Clock,
  Sparkles
} from 'lucide-react';

export const SpaAdmin: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuth,
    setIsAdminAuth,
    activeAdminTab,
    setActiveAdminTab,
    config,
    updateConfig,
    treatments,
    updateTreatment,
    addTreatment,
    deleteTreatment,
    toggleTreatmentAvailability,
    updateTreatmentPrice,
    appointments,
    updateAppointmentStatus,
    formatCurrency,
    resetToDefaults,
    exportData
  } = useSpa();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [editingT, setEditingT] = useState<SpaTreatment | null>(null);
  const [isAddingT, setIsAddingT] = useState(false);

  // New treatment form
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState(30000);
  const [newDuration, setNewDuration] = useState('60 Minutes');
  const [newCategory, setNewCategory] = useState<SpaTreatment['category']>('massage');
  const [newImage, setNewImage] = useState(SPA_OIL_IMAGE);
  const [newTag, setNewTag] = useState('Relaxation');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'solace2025' || pinInput === 'admin123' || pinInput === 'admin') {
      setIsAdminAuth(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN code. Hint: use solace2025');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (editingT) {
          setEditingT({ ...editingT, image: base64 });
        } else {
          setNewImage(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTreatment({
      title: newTitle,
      tagline: newTagline || 'Holistic Botanical Ritual',
      description: newDesc || 'Tailored therapy for mind and body relaxation.',
      price: Number(newPrice) || 30000,
      duration: newDuration,
      category: newCategory,
      image: newImage,
      tag: newTag,
      therapists: ['Certified Practitioner'],
      availability: 'available',
      featured: false
    });

    setIsAddingT(false);
    setNewTitle('');
    setNewPrice(30000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingT) return;
    updateTreatment(editingT.id, editingT);
    setEditingT(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-stone-900 my-auto">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#F4EFE6] border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-serif font-bold text-stone-900">
                  {config.spaName} Sanctuary CMS
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                  LIVE SPA ADMIN
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Manage holistic treatments, session fees, slot availability, and WhatsApp appointments.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuth && (
              <button
                onClick={() => setIsAdminAuth(false)}
                className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-950 rounded-lg"
              >
                Lock
              </button>
            )}
            <button onClick={() => setIsAdminOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-950">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN Screen */}
        {!isAdminAuth ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-900">Sanctuary Access</h3>
              <p className="text-xs text-stone-500 mt-1">Enter your security PIN code to access the clinic scheduler.</p>
            </div>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Enter PIN (e.g. solace2025)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-mono px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-emerald-800"
                autoFocus
              />
              {pinError && <p className="text-xs text-rose-600 font-medium">{pinError}</p>}
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                >
                  Unlock Sanctuary Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminAuth(true);
                    setPinError('');
                  }}
                  className="w-full py-2 px-4 text-xs font-medium text-stone-500 hover:text-stone-900 bg-stone-100 rounded-lg"
                >
                  Quick Unlock Demo (solace2025)
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Main Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            <aside className="w-full md:w-56 bg-stone-50 border-r border-stone-200 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0 text-xs font-medium">
              <button
                onClick={() => setActiveAdminTab('pricing')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap ${
                  activeAdminTab === 'pricing' ? 'bg-emerald-800 text-white font-bold' : 'text-stone-600 hover:bg-stone-200'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Treatments & Pricing</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('banner')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap ${
                  activeAdminTab === 'banner' ? 'bg-emerald-800 text-white font-bold' : 'text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Megaphone className="w-4 h-4" />
                <span>Promo Banner</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('settings')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap ${
                  activeAdminTab === 'settings' ? 'bg-emerald-800 text-white font-bold' : 'text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Sanctuary & WhatsApp</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('appointments')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap ${
                  activeAdminTab === 'appointments' ? 'bg-emerald-800 text-white font-bold' : 'text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Appointments ({appointments.length})</span>
              </button>
            </aside>

            <main className="flex-1 p-6 overflow-y-auto bg-white">
              {/* TAB 1: PRICING */}
              {activeAdminTab === 'pricing' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-stone-900">Treatment Menu & Live Pricing</h3>
                      <p className="text-xs text-stone-500">Update session investments and booking availability in real time.</p>
                    </div>
                    <button
                      onClick={() => setIsAddingT(true)}
                      className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900"
                    >
                      + Add New Treatment
                    </button>
                  </div>

                  <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                        <tr>
                          <th className="py-3 px-4">Treatment</th>
                          <th className="py-3 px-3">Duration</th>
                          <th className="py-3 px-3">Price ({config.currencySymbol})</th>
                          <th className="py-3 px-3">Availability</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-stone-700">
                        {treatments.map((t) => (
                          <tr key={t.id} className="hover:bg-stone-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img src={t.image} alt={t.title} className="w-10 h-10 rounded-lg object-cover bg-stone-100 border border-stone-200" />
                                <div>
                                  <p className="font-serif font-bold text-stone-900">{t.title}</p>
                                  <p className="text-[11px] text-stone-400">{t.tag}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 font-mono text-[11px] text-stone-500">{t.duration}</td>
                            <td className="py-3 px-3">
                              <input
                                type="number"
                                value={t.price}
                                onChange={(e) => updateTreatmentPrice(t.id, Number(e.target.value))}
                                className="w-24 px-2 py-1 bg-stone-50 border border-stone-300 rounded font-mono font-bold text-emerald-900"
                              />
                            </td>
                            <td className="py-3 px-3">
                              <select
                                value={t.availability}
                                onChange={(e) => toggleTreatmentAvailability(t.id, e.target.value as any)}
                                className="text-xs p-1 rounded border bg-stone-50 border-stone-200"
                              >
                                <option value="available">Slots Available</option>
                                <option value="low_slots">Few Slots Left</option>
                                <option value="fully_booked">Fully Booked</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button onClick={() => setEditingT(t)} className="p-1 text-stone-500 hover:text-stone-900 mr-1">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${t.title}"?`)) deleteTreatment(t.id);
                                }}
                                className="p-1 text-stone-400 hover:text-rose-600"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: PROMO BANNER */}
              {activeAdminTab === 'banner' && (
                <div className="space-y-4 max-w-xl text-xs">
                  <h3 className="text-base font-serif font-bold text-stone-900">Promotional Alert Banner</h3>
                  <div className="space-y-3 bg-stone-50 p-5 rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold text-stone-900">Enable Alert Banner</label>
                      <input
                        type="checkbox"
                        checked={config.promoBanner.enabled}
                        onChange={(e) => updateConfig({ promoBanner: { ...config.promoBanner, enabled: e.target.checked } })}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1">Banner Text</label>
                      <input
                        type="text"
                        value={config.promoBanner.text}
                        onChange={(e) => updateConfig({ promoBanner: { ...config.promoBanner, text: e.target.value } })}
                        className="w-full p-2 bg-white border border-stone-200 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SETTINGS */}
              {activeAdminTab === 'settings' && (
                <div className="space-y-4 max-w-xl text-xs">
                  <h3 className="text-base font-serif font-bold text-stone-900">Clinic WhatsApp & Information</h3>
                  <div className="space-y-3 bg-stone-50 p-5 rounded-xl border border-stone-200">
                    <div>
                      <label className="block text-stone-600 mb-1">Clinic Name</label>
                      <input
                        type="text"
                        value={config.spaName}
                        onChange={(e) => updateConfig({ spaName: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-200 rounded font-serif font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1">WhatsApp Booking Number</label>
                      <input
                        type="text"
                        value={config.whatsappNumber}
                        onChange={(e) => updateConfig({ whatsappNumber: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-200 rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1">Sanctuary Address</label>
                      <input
                        type="text"
                        value={config.sanctuaryAddress}
                        onChange={(e) => updateConfig({ sanctuaryAddress: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-200 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: APPOINTMENTS */}
              {activeAdminTab === 'appointments' && (
                <div className="space-y-4 text-xs">
                  <h3 className="text-base font-serif font-bold text-stone-900">Client Appointments ({appointments.length})</h3>
                  {appointments.length === 0 ? (
                    <p className="text-stone-400 py-8 text-center">No bookings received yet.</p>
                  ) : (
                    <div className="border border-stone-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                          <tr>
                            <th className="py-2.5 px-3">Booking ID</th>
                            <th className="py-2.5 px-3">Guest</th>
                            <th className="py-2.5 px-3">Treatment</th>
                            <th className="py-2.5 px-3">Date & Slot</th>
                            <th className="py-2.5 px-3">Fee</th>
                            <th className="py-2.5 px-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-700">
                          {appointments.map((a) => (
                            <tr key={a.id}>
                              <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">#{a.id}</td>
                              <td className="py-2.5 px-3">{a.clientName} ({a.clientPhone})</td>
                              <td className="py-2.5 px-3 font-medium">{a.treatmentName}</td>
                              <td className="py-2.5 px-3">{a.date} at {a.timeSlot}</td>
                              <td className="py-2.5 px-3 font-mono font-bold">{formatCurrency(a.treatmentPrice)}</td>
                              <td className="py-2.5 px-3">
                                <select
                                  value={a.status}
                                  onChange={(e) => updateAppointmentStatus(a.id, e.target.value as any)}
                                  className="p-1 border rounded text-[11px]"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        )}

        {/* Modal: Add New Treatment */}
        {isAddingT && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 max-w-md w-full space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h3 className="font-serif font-bold text-base text-stone-900">Add New Treatment</h3>
                <button onClick={() => setIsAddingT(false)} className="text-stone-400 hover:text-stone-900">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveNew} className="space-y-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Treatment Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Deep Tissue Magnesium Therapy"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Session Fee ({config.currencySymbol})</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 75 Minutes"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Photo Upload</label>
                  <div className="flex items-center gap-3">
                    <img src={newImage} alt="Preview" className="w-12 h-12 rounded object-cover border border-stone-200" />
                    <div>
                      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded text-stone-800 text-xs"
                      >
                        Upload Photo File
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-stone-200">
                  <button type="button" onClick={() => setIsAddingT(false)} className="px-4 py-2 text-stone-500">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-emerald-800 text-white rounded-lg font-bold">
                    Save Treatment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
