import React, { useState, useRef } from 'react';
import { useFashion } from '../../context/FashionContext';
import { Garment, GarmentAvailability, BoutiqueOrder, PrivateFittingBooking } from '../../types/fashion';
import {
  FASHION_HERO_IMAGE,
  FASHION_DRESS_IMAGE,
  FASHION_KIMONO_IMAGE,
  FASHION_TROUSERS_IMAGE,
  FASHION_TRENCH_IMAGE,
  FASHION_PRESET_IMAGES
} from '../../data/initialFashionData';
import {
  X,
  Lock,
  DollarSign,
  Sparkles,
  Megaphone,
  Palette,
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
  Scissors,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';

export const FashionAdmin: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuth,
    setIsAdminAuth,
    activeAdminTab,
    setActiveAdminTab,
    config,
    updateConfig,
    garments,
    updateGarment,
    addGarment,
    deleteGarment,
    toggleGarmentAvailability,
    updateGarmentPrice,
    orders,
    fittings,
    updateOrderStatus,
    updateFittingStatus,
    formatCurrency,
    resetToDefaults,
    exportData,
    importData
  } = useFashion();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [editingGarment, setEditingGarment] = useState<Garment | null>(null);
  const [isAddingGarment, setIsAddingGarment] = useState(false);

  // New Garment Form Fields
  const [newName, setNewName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState(38000);
  const [newComparePrice, setNewComparePrice] = useState<number | undefined>(45000);
  const [newCategory, setNewCategory] = useState<Garment['category']>('dresses');
  const [newImage, setNewImage] = useState(FASHION_DRESS_IMAGE);
  const [newFabric, setNewFabric] = useState('22-Momme 100% Pure Mulberry Silk');
  const [newAvailability, setNewAvailability] = useState<GarmentAvailability>('in_stock');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'aura2025' || pinInput === 'admin123' || pinInput === 'admin') {
      setIsAdminAuth(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN code. Hint: use aura2025');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (isEdit && editingGarment) {
          setEditingGarment({ ...editingGarment, image: base64 });
        } else {
          setNewImage(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addGarment({
      name: newName,
      tagline: newTagline || 'Tailored Quiet Luxury Garment',
      description: newDesc || 'Hand-finished in our Lekki atelier with delicate French seams.',
      price: Number(newPrice) || 38000,
      compareAtPrice: newComparePrice ? Number(newComparePrice) : undefined,
      category: newCategory,
      image: newImage,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Champagne Gold', hex: '#E6D3B3' },
        { name: 'Obsidian Black', hex: '#1C1917' }
      ],
      availability: newAvailability,
      fabric: newFabric,
      details: [
        'Bias cut for natural fluid silhouette',
        'French seams with zero interior fraying',
        'Complimentary bespoke hem tailoring'
      ],
      careInstructions: 'Dry clean or delicate hand wash cold with silk detergent.',
      featured: false
    });

    setIsAddingGarment(false);
    setNewName('');
    setNewTagline('');
    setNewDesc('');
    setNewPrice(38000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGarment) return;
    updateGarment(editingGarment.id, editingGarment);
    setEditingGarment(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-stone-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-stone-900 my-auto">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-950 text-white flex items-center justify-center font-bold">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-serif font-bold text-stone-950">
                  {config.brandName} Atelier CMS
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 text-stone-800 font-semibold">
                  LIVE BOUTIQUE ADMIN
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Update collection pricing, stock status, lookbook photos, WhatsApp orders, and private fittings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuth && (
              <button
                onClick={() => setIsAdminAuth(false)}
                className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-950 rounded-lg hover:bg-stone-100 transition-colors"
              >
                Lock CMS
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-950 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN Screen */}
        {!isAdminAuth ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-14 h-14 bg-stone-100 text-stone-900 rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-950">Atelier Concierge Access</h3>
              <p className="text-xs text-stone-500 mt-1">Enter your security PIN to manage the boutique catalog.</p>
            </div>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Enter PIN (e.g. aura2025)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-mono px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-950"
                autoFocus
              />
              {pinError && <p className="text-xs text-rose-600 font-medium">{pinError}</p>}
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-stone-950 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  Unlock Atelier Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminAuth(true);
                    setPinError('');
                  }}
                  className="w-full py-2 px-4 text-xs font-medium text-stone-500 hover:text-stone-950 bg-stone-100 rounded-lg transition-colors"
                >
                  Quick Unlock Demo (aura2025)
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Main CMS Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Tabs */}
            <aside className="w-full md:w-56 bg-stone-50 border-r border-stone-200 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0 text-xs font-medium">
              <button
                onClick={() => setActiveAdminTab('pricing')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap transition-colors ${
                  activeAdminTab === 'pricing'
                    ? 'bg-stone-950 text-white font-bold shadow-xs'
                    : 'text-stone-600 hover:bg-stone-200/60'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Collection & Pricing</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('fittings')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap transition-colors ${
                  activeAdminTab === 'fittings'
                    ? 'bg-stone-950 text-white font-bold shadow-xs'
                    : 'text-stone-600 hover:bg-stone-200/60'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Private Fittings ({fittings.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('orders')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap transition-colors ${
                  activeAdminTab === 'orders'
                    ? 'bg-stone-950 text-white font-bold shadow-xs'
                    : 'text-stone-600 hover:bg-stone-200/60'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span>WhatsApp Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('banner')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap transition-colors ${
                  activeAdminTab === 'banner'
                    ? 'bg-stone-950 text-white font-bold shadow-xs'
                    : 'text-stone-600 hover:bg-stone-200/60'
                }`}
              >
                <Megaphone className="w-4 h-4" />
                <span>Promo Banner</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('settings')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap transition-colors ${
                  activeAdminTab === 'settings'
                    ? 'bg-stone-950 text-white font-bold shadow-xs'
                    : 'text-stone-600 hover:bg-stone-200/60'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Boutique & WhatsApp</span>
              </button>
            </aside>

            {/* Main Tab Panel */}
            <main className="flex-1 p-6 overflow-y-auto bg-white">
              {/* TAB 1: PRICING & GARMENTS */}
              {activeAdminTab === 'pricing' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-stone-950">Lookbook Garments & Pricing</h3>
                      <p className="text-xs text-stone-500">
                        Live inline price edits, stock switcher, and photo updates.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddingGarment(true)}
                      className="px-4 py-2 bg-stone-950 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Garment</span>
                    </button>
                  </div>

                  <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                        <tr>
                          <th className="py-3 px-4">Garment & Fabric</th>
                          <th className="py-3 px-3">Category</th>
                          <th className="py-3 px-3">Price ({config.currencySymbol})</th>
                          <th className="py-3 px-3">Stock Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-stone-700">
                        {garments.map((g) => (
                          <tr key={g.id} className="hover:bg-stone-50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={g.image}
                                  alt={g.name}
                                  className="w-11 h-14 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                                />
                                <div>
                                  <p className="font-serif font-bold text-stone-950">{g.name}</p>
                                  <p className="text-[11px] text-stone-500">{g.fabric}</p>
                                  <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                                    Sizes: {g.sizes.join(', ')}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 capitalize font-medium">{g.category}</td>
                            <td className="py-3 px-3">
                              <input
                                type="number"
                                value={g.price}
                                onChange={(e) => updateGarmentPrice(g.id, Number(e.target.value))}
                                className="w-24 px-2 py-1 bg-stone-50 border border-stone-300 rounded font-mono font-bold text-stone-950 focus:outline-none focus:border-stone-950"
                              />
                            </td>
                            <td className="py-3 px-3">
                              <select
                                value={g.availability}
                                onChange={(e) => toggleGarmentAvailability(g.id, e.target.value as any)}
                                className="text-xs p-1 rounded border bg-stone-50 border-stone-200 text-stone-800"
                              >
                                <option value="in_stock">In Stock</option>
                                <option value="low_stock">Low Stock</option>
                                <option value="pre_order">Pre-Order</option>
                                <option value="sold_out">Sold Out</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => setEditingGarment(g)}
                                className="p-1.5 text-stone-500 hover:text-stone-950 hover:bg-stone-100 rounded mr-1"
                                title="Edit Garment"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${g.name}" from catalog?`)) deleteGarment(g.id);
                                }}
                                className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                                title="Delete Garment"
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

              {/* TAB 2: PRIVATE FITTINGS */}
              {activeAdminTab === 'fittings' && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <div>
                      <h3 className="text-base font-serif font-bold text-stone-950">
                        Private Salon Fittings & Styling Appointments ({fittings.length})
                      </h3>
                      <p className="text-stone-500">
                        Clients who booked fitting sessions at the Lekki showroom or virtual concierge.
                      </p>
                    </div>
                  </div>

                  {fittings.length === 0 ? (
                    <div className="text-center py-12 text-stone-400">
                      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No fitting appointments scheduled yet.</p>
                    </div>
                  ) : (
                    <div className="border border-stone-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                          <tr>
                            <th className="py-2.5 px-3">Booking ID</th>
                            <th className="py-2.5 px-3">Client</th>
                            <th className="py-2.5 px-3">Date & Time</th>
                            <th className="py-2.5 px-3">Type</th>
                            <th className="py-2.5 px-3">Pieces / Notes</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3 text-right">WhatsApp</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-700">
                          {fittings.map((fit) => {
                            const cleanPhone = (fit.clientPhone || '').replace(/\D/g, '');
                            return (
                              <tr key={fit.id} className="hover:bg-stone-50">
                                <td className="py-2.5 px-3 font-mono font-bold text-stone-950">#{fit.id}</td>
                                <td className="py-2.5 px-3">
                                  <p className="font-bold text-stone-950">{fit.clientName}</p>
                                  <p className="font-mono text-[11px] text-stone-500">{fit.clientPhone}</p>
                                </td>
                                <td className="py-2.5 px-3">
                                  <p className="font-semibold text-stone-900">{fit.preferredDate}</p>
                                  <p className="text-[11px] text-stone-500">{fit.preferredTime}</p>
                                </td>
                                <td className="py-2.5 px-3">
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 font-medium">
                                    {fit.fittingType === 'in_atelier' ? 'Lekki Salon' : 'Virtual Call'}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 max-w-[200px]">
                                  {fit.garmentInterests && fit.garmentInterests.length > 0 && (
                                    <p className="text-[11px] text-stone-800 truncate">
                                      {fit.garmentInterests.join(', ')}
                                    </p>
                                  )}
                                  {fit.measurementsNotes && (
                                    <p className="text-[10px] text-stone-500 italic truncate">{fit.measurementsNotes}</p>
                                  )}
                                </td>
                                <td className="py-2.5 px-3">
                                  <select
                                    value={fit.status}
                                    onChange={(e) => updateFittingStatus(fit.id, e.target.value as any)}
                                    className="p-1 border rounded text-[11px] bg-white"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                  </select>
                                </td>
                                <td className="py-2.5 px-3 text-right">
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${fit.clientName}, this is AURA Atelier concierge regarding your private fitting appointment #${fit.id}.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded font-semibold text-[11px]"
                                  >
                                    <MessageCircle className="w-3 h-3 text-emerald-600" />
                                    <span>Chat</span>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CLIENT ORDERS */}
              {activeAdminTab === 'orders' && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <div>
                      <h3 className="text-base font-serif font-bold text-stone-950">
                        Client WhatsApp Orders ({orders.length})
                      </h3>
                      <p className="text-stone-500">
                        Track live orders, dispatch statuses, and client delivery addresses.
                      </p>
                    </div>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-12 text-stone-400">
                      <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No boutique orders logged yet.</p>
                    </div>
                  ) : (
                    <div className="border border-stone-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                          <tr>
                            <th className="py-2.5 px-3">Order ID</th>
                            <th className="py-2.5 px-3">Client</th>
                            <th className="py-2.5 px-3">Destination</th>
                            <th className="py-2.5 px-3">Pieces</th>
                            <th className="py-2.5 px-3">Total</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3 text-right">WhatsApp</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-700">
                          {orders.map((o) => {
                            const cleanPhone = (o.clientPhone || '').replace(/\D/g, '');
                            return (
                              <tr key={o.id} className="hover:bg-stone-50">
                                <td className="py-2.5 px-3 font-mono font-bold text-stone-950">#{o.id}</td>
                                <td className="py-2.5 px-3">
                                  <p className="font-bold text-stone-950">{o.clientName}</p>
                                  <p className="font-mono text-[11px] text-stone-500">{o.clientPhone}</p>
                                </td>
                                <td className="py-2.5 px-3 max-w-[150px]">
                                  <p className="truncate text-stone-800">{o.shippingAddress}</p>
                                  <p className="text-[10px] text-stone-500">{o.shippingOption}</p>
                                </td>
                                <td className="py-2.5 px-3 max-w-[180px]">
                                  <p className="truncate text-[11px]">
                                    {o.items.map((i) => `${i.quantity}x ${i.name} (${i.size})`).join(', ')}
                                  </p>
                                </td>
                                <td className="py-2.5 px-3 font-mono font-bold text-stone-950">
                                  {formatCurrency(o.total)}
                                </td>
                                <td className="py-2.5 px-3">
                                  <select
                                    value={o.status}
                                    onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                                    className="p-1 border rounded text-[11px] bg-white"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="tailoring">In Tailoring</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                  </select>
                                </td>
                                <td className="py-2.5 px-3 text-right">
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${o.clientName}, this is AURA Atelier regarding your order #${o.id}.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded font-semibold text-[11px]"
                                  >
                                    <MessageCircle className="w-3 h-3 text-emerald-600" />
                                    <span>Chat</span>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: PROMO BANNER */}
              {activeAdminTab === 'banner' && (
                <div className="space-y-4 max-w-xl text-xs">
                  <div className="pb-3 border-b border-stone-200">
                    <h3 className="text-base font-serif font-bold text-stone-950">Promotional Alert Banner</h3>
                    <p className="text-stone-500">Highlight new lookbook drops or seasonal shipping offers.</p>
                  </div>

                  <div className="space-y-4 bg-stone-50 p-5 rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold text-stone-900">Enable Promo Banner</label>
                      <input
                        type="checkbox"
                        checked={config.promoBanner.enabled}
                        onChange={(e) =>
                          updateConfig({ promoBanner: { ...config.promoBanner, enabled: e.target.checked } })
                        }
                        className="w-4 h-4 rounded text-stone-950 focus:ring-0"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1 font-medium">Banner Announcement Text</label>
                      <input
                        type="text"
                        value={config.promoBanner.text}
                        onChange={(e) =>
                          updateConfig({ promoBanner: { ...config.promoBanner, text: e.target.value } })
                        }
                        className="w-full p-2 bg-white border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-950"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-600 mb-1 font-medium">Badge Label</label>
                        <input
                          type="text"
                          value={config.promoBanner.badgeText || ''}
                          onChange={(e) =>
                            updateConfig({ promoBanner: { ...config.promoBanner, badgeText: e.target.value } })
                          }
                          className="w-full p-2 bg-white border border-stone-200 rounded text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1 font-medium">Link Callout</label>
                        <input
                          type="text"
                          value={config.promoBanner.linkText || ''}
                          onChange={(e) =>
                            updateConfig({ promoBanner: { ...config.promoBanner, linkText: e.target.value } })
                          }
                          className="w-full p-2 bg-white border border-stone-200 rounded text-stone-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: BOUTIQUE SETTINGS & WHATSAPP */}
              {activeAdminTab === 'settings' && (
                <div className="space-y-6 max-w-xl text-xs">
                  <div className="pb-3 border-b border-stone-200">
                    <h3 className="text-base font-serif font-bold text-stone-950">Atelier WhatsApp & Settings</h3>
                    <p className="text-stone-500">Configure brand information, contact details, and courier rates.</p>
                  </div>

                  <div className="space-y-4 bg-stone-50 p-5 rounded-xl border border-stone-200">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Brand Name</label>
                      <input
                        type="text"
                        value={config.brandName}
                        onChange={(e) => updateConfig({ brandName: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-200 rounded font-serif font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">WhatsApp Concierge Phone *</label>
                      <input
                        type="text"
                        value={config.whatsappNumber}
                        onChange={(e) => updateConfig({ whatsappNumber: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-200 rounded font-mono font-bold"
                      />
                      <p className="text-[10px] text-stone-400 mt-1">
                        International format with country code (e.g. 2348030795206)
                      </p>
                    </div>

                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Atelier Showroom Address</label>
                      <input
                        type="text"
                        value={config.atelierAddress}
                        onChange={(e) => updateConfig({ atelierAddress: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-200 rounded"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">
                          Lagos Courier Fee ({config.currencySymbol})
                        </label>
                        <input
                          type="number"
                          value={config.baseShippingFee}
                          onChange={(e) => updateConfig({ baseShippingFee: Number(e.target.value) })}
                          className="w-full p-2 bg-white border border-stone-200 rounded font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">
                          Free Shipping Over ({config.currencySymbol})
                        </label>
                        <input
                          type="number"
                          value={config.freeShippingThreshold}
                          onChange={(e) => updateConfig({ freeShippingThreshold: Number(e.target.value) })}
                          className="w-full p-2 bg-white border border-stone-200 rounded font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Backup and Reset */}
                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                    <button
                      onClick={() => {
                        const blob = new Blob([exportData()], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `aura-atelier-backup-${Date.now()}.json`;
                        a.click();
                      }}
                      className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg flex items-center gap-1.5 font-medium"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Backup</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm('Reset boutique to factory lookbook defaults? All custom edits will be restored.')) {
                          resetToDefaults();
                        }
                      }}
                      className="px-3.5 py-2 text-rose-700 hover:bg-rose-50 rounded-lg font-medium"
                    >
                      Reset to Defaults
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}

        {/* MODAL: ADD NEW GARMENT */}
        {isAddingGarment && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 max-w-lg w-full space-y-4 text-xs my-auto">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h3 className="font-serif font-bold text-base text-stone-950">Add New Luxury Piece</h3>
                <button onClick={() => setIsAddingGarment(false)} className="text-stone-400 hover:text-stone-950">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveNew} className="space-y-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Garment Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ivory Silk Evening Slip"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Tagline / Fabric Summary</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Belgian linen with delicate raw hem"
                    value={newTagline}
                    onChange={(e) => setNewTagline(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Price ({config.currencySymbol}) *</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded capitalize"
                    >
                      <option value="dresses">Dresses</option>
                      <option value="linens">Belgian Linens</option>
                      <option value="trousers">Tailored Trousers</option>
                      <option value="coats">Outerwear & Coats</option>
                      <option value="silks">Silks & Tops</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Fabric Composition</label>
                  <input
                    type="text"
                    value={newFabric}
                    onChange={(e) => setNewFabric(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded"
                  />
                </div>

                {/* Photo Selection: Upload or Preset Library */}
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Garment Photograph</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={newImage}
                        alt="Preview"
                        className="w-14 h-18 rounded-lg object-cover border border-stone-200 bg-stone-100"
                      />
                      <div className="space-y-1">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, false)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded text-stone-800 text-xs font-medium flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Custom File</span>
                        </button>
                      </div>
                    </div>

                    {/* Presets */}
                    <div>
                      <span className="text-[10px] text-stone-400 font-semibold uppercase block mb-1">
                        Or select from luxury library:
                      </span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {FASHION_PRESET_IMAGES.map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => setNewImage(preset.url)}
                            className={`p-1 text-[10px] rounded border text-left truncate transition-colors ${
                              newImage === preset.url
                                ? 'bg-stone-950 text-white border-stone-950 font-bold'
                                : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsAddingGarment(false)}
                    className="px-4 py-2 text-stone-500 hover:text-stone-950"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-stone-950 hover:bg-stone-800 text-white rounded-lg font-bold"
                  >
                    Save Garment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT GARMENT */}
        {editingGarment && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 max-w-lg w-full space-y-4 text-xs my-auto">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h3 className="font-serif font-bold text-base text-stone-950">Edit Garment: {editingGarment.name}</h3>
                <button onClick={() => setEditingGarment(null)} className="text-stone-400 hover:text-stone-950">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={editingGarment.name}
                    onChange={(e) => setEditingGarment({ ...editingGarment, name: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editingGarment.tagline}
                    onChange={(e) => setEditingGarment({ ...editingGarment, tagline: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Price ({config.currencySymbol})</label>
                    <input
                      type="number"
                      required
                      value={editingGarment.price}
                      onChange={(e) => setEditingGarment({ ...editingGarment, price: Number(e.target.value) })}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Fabric</label>
                    <input
                      type="text"
                      value={editingGarment.fabric}
                      onChange={(e) => setEditingGarment({ ...editingGarment, fabric: e.target.value })}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded"
                    />
                  </div>
                </div>

                {/* Photo Selector */}
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Garment Photograph</label>
                  <div className="flex items-center gap-3">
                    <img
                      src={editingGarment.image}
                      alt="Preview"
                      className="w-14 h-18 rounded-lg object-cover border border-stone-200 bg-stone-100"
                    />
                    <div className="space-y-1">
                      <input
                        type="file"
                        ref={editFileInputRef}
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => editFileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded text-stone-800 text-xs font-medium flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-1.5">
                    {FASHION_PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setEditingGarment({ ...editingGarment, image: preset.url })}
                        className={`p-1 text-[10px] rounded border text-left truncate transition-colors ${
                          editingGarment.image === preset.url
                            ? 'bg-stone-950 text-white border-stone-950 font-bold'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setEditingGarment(null)}
                    className="px-4 py-2 text-stone-500 hover:text-stone-950"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-stone-950 hover:bg-stone-800 text-white rounded-lg font-bold"
                  >
                    Save Changes
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
