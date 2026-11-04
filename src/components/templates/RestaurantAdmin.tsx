import React, { useState, useRef } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Dish, DishAvailability, TableReservation, TakeoutOrder } from '../../types/restaurant';
import {
  RESTAURANT_HERO_IMAGE,
  AFRICAN_EGUSI_IMAGE,
  AFRICAN_JOLLOF_IMAGE,
  AFRICAN_SEAFOOD_IMAGE,
  RESTAURANT_SUYA_IMAGE,
  RESTAURANT_FISH_IMAGE,
  RESTAURANT_DRINK_IMAGE,
  AFRICAN_DISH_PRESETS
} from '../../data/initialRestaurantData';
import {
  X,
  Lock,
  DollarSign,
  Utensils,
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
  Flame,
  Clock,
  Phone,
  Image as ImageIcon
} from 'lucide-react';

export const RestaurantAdmin: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuth,
    setIsAdminAuth,
    activeAdminTab,
    setActiveAdminTab,
    config,
    updateConfig,
    dishes,
    updateDish,
    addDish,
    deleteDish,
    toggleDishAvailability,
    updateDishPrice,
    reservations,
    updateReservationStatus,
    orders,
    updateOrderStatus,
    formatCurrency,
    resetToDefaults,
    exportData,
    importData
  } = useRestaurant();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [isAddingDish, setIsAddingDish] = useState(false);

  // New Dish Form
  const [newDishName, setNewDishName] = useState('');
  const [newDishNative, setNewDishNative] = useState('');
  const [newDishTagline, setNewDishTagline] = useState('');
  const [newDishDesc, setNewDishDesc] = useState('');
  const [newDishPrice, setNewDishPrice] = useState(6500);
  const [newDishCategory, setNewDishCategory] = useState<Dish['category']>('soups_swallows');
  const [newDishImage, setNewDishImage] = useState(AFRICAN_EGUSI_IMAGE);
  const [newDishSpice, setNewDishSpice] = useState<Dish['spiceLevel']>('Medium');
  const [newDishPrep, setNewDishPrep] = useState('20 min');
  const [newDishServes, setNewDishServes] = useState('1-2 Persons');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'savanna2025' || pinInput === 'admin123' || pinInput === 'admin') {
      setIsAdminAuth(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Hint: use savanna2025');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (isEdit && editingDish) {
          setEditingDish({ ...editingDish, image: base64 });
        } else {
          setNewDishImage(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNewDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName.trim()) return;

    addDish({
      name: newDishName,
      nativeName: newDishNative || undefined,
      tagline: newDishTagline || 'Authentic African Delicacy',
      description: newDishDesc || 'Prepared fresh over hardwood firewood with native spices.',
      price: Number(newDishPrice) || 6000,
      category: newDishCategory,
      image: newDishImage,
      availability: 'ready_to_cook',
      spiceLevel: newDishSpice,
      prepTime: newDishPrep,
      serves: newDishServes,
      swallowOptions: newDishCategory === 'soups_swallows' ? ['Steaming Pounded Yam', 'Soft Fluffy Amala', 'Yellow Garri Eba', 'Semovita'] : undefined,
      proteinOptions: ['Goat Meat & Honeycomb Shaki', 'Assorted Beef & Kpomo', 'Smoked Dried Fish'],
      sideOptions: ['Sweet Fried Dodo', 'Extra Soup Bowl'],
      featured: false
    });

    setIsAddingDish(false);
    setNewDishName('');
    setNewDishNative('');
    setNewDishDesc('');
    setNewDishPrice(6500);
  };

  const handleSaveEditDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDish) return;
    updateDish(editingDish.id, editingDish);
    setEditingDish(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden text-stone-100 my-auto">
        {/* Top Header */}
        <div className="px-6 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <Flame className="w-4 h-4 fill-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-serif font-bold text-white">
                  {config.restaurantName} — Kitchen CMS
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40">
                  LIVE AFRICAN KITCHEN ADMIN
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Update African dish pricing, stock availability, photos, live takeout orders, and table bookings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuth && (
              <button
                onClick={() => setIsAdminAuth(false)}
                className="px-3 py-1.5 text-xs text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Lock CMS
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN Screen */}
        {!isAdminAuth ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-14 h-14 bg-stone-800 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-stone-700">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">Kitchen Portal Security</h3>
              <p className="text-xs text-stone-400 mt-1">Enter your manager PIN to access live kitchen orders.</p>
            </div>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Enter PIN (e.g. savanna2025)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-mono px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                autoFocus
              />
              {pinError && <p className="text-xs text-rose-400 font-medium">{pinError}</p>}
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
                >
                  Unlock Kitchen Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminAuth(true);
                    setPinError('');
                  }}
                  className="w-full py-2 px-4 text-xs font-medium text-stone-400 hover:text-white bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  Quick Unlock Demo (savanna2025)
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Main CMS Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Tabs */}
            <aside className="w-full md:w-56 bg-stone-950 border-r border-stone-800 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0 text-xs font-medium">
              <button
                onClick={() => setActiveAdminTab('pricing')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeAdminTab === 'pricing'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>African Menu & Pricing</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('orders')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeAdminTab === 'orders'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span>Takeout Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('reservations')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeAdminTab === 'reservations'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Table Bookings ({reservations.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('banner')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeAdminTab === 'banner'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <Megaphone className="w-4 h-4" />
                <span>Bukka Promo Banner</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('settings')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeAdminTab === 'settings'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Kitchen & WhatsApp</span>
              </button>
            </aside>

            {/* Main Panel */}
            <main className="flex-1 p-6 overflow-y-auto bg-stone-900">
              {/* TAB 1: MENU & PRICING */}
              {activeAdminTab === 'pricing' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">African Dishes & Live Pricing</h3>
                      <p className="text-xs text-stone-400">
                        Adjust dish prices, change availability (Ready / Sold Out), and update food photos.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddingDish(true)}
                      className="px-4 py-2 bg-amber-500 text-stone-950 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New African Dish</span>
                    </button>
                  </div>

                  <div className="border border-stone-800 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-stone-950 border-b border-stone-800 text-stone-400 font-semibold">
                        <tr>
                          <th className="py-3 px-4">Dish & Native Name</th>
                          <th className="py-3 px-3">Category</th>
                          <th className="py-3 px-3">Price ({config.currencySymbol})</th>
                          <th className="py-3 px-3">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800 text-stone-300">
                        {dishes.map((dish) => (
                          <tr key={dish.id} className="hover:bg-stone-850 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={dish.image}
                                  alt={dish.name}
                                  className="w-12 h-10 rounded-lg object-cover bg-stone-950 border border-stone-800 shrink-0"
                                />
                                <div>
                                  <p className="font-serif font-bold text-white">{dish.name}</p>
                                  {dish.nativeName && (
                                    <span className="text-[10px] text-amber-400 font-mono">
                                      {dish.nativeName}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 capitalize font-mono text-[11px] text-stone-400">
                              {dish.category.replace('_', ' ')}
                            </td>
                            <td className="py-3 px-3">
                              <input
                                type="number"
                                value={dish.price}
                                onChange={(e) => updateDishPrice(dish.id, Number(e.target.value))}
                                className="w-24 px-2 py-1 bg-stone-950 border border-stone-700 rounded font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-500"
                              />
                            </td>
                            <td className="py-3 px-3">
                              <select
                                value={dish.availability}
                                onChange={(e) => toggleDishAvailability(dish.id, e.target.value as any)}
                                className="text-xs p-1 rounded border bg-stone-950 border-stone-700 text-stone-200"
                              >
                                <option value="ready_to_cook">Ready to Cook</option>
                                <option value="low_prep">Low Prep Left</option>
                                <option value="chef_special">Chef Special</option>
                                <option value="sold_out_today">Sold Out Today</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => setEditingDish(dish)}
                                className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded mr-1 cursor-pointer"
                                title="Edit Dish"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${dish.name}" from African menu?`)) deleteDish(dish.id);
                                }}
                                className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-rose-950/30 rounded cursor-pointer"
                                title="Delete Dish"
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

              {/* TAB 2: TAKEOUT ORDERS */}
              {activeAdminTab === 'orders' && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <div>
                      <h3 className="text-base font-serif font-bold text-white">
                        Live African Takeout Orders ({orders.length})
                      </h3>
                      <p className="text-stone-400">
                        Monitor food orders dispatched via WhatsApp, cook queues, and courier statuses.
                      </p>
                    </div>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-12 text-stone-500">
                      <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p>No takeout orders placed yet.</p>
                    </div>
                  ) : (
                    <div className="border border-stone-800 rounded-xl overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-stone-950 text-stone-400 font-semibold border-b border-stone-800">
                          <tr>
                            <th className="py-2.5 px-3">Order ID</th>
                            <th className="py-2.5 px-3">Customer</th>
                            <th className="py-2.5 px-3">Zone / Address</th>
                            <th className="py-2.5 px-3">Dishes & Swallow</th>
                            <th className="py-2.5 px-3">Total</th>
                            <th className="py-2.5 px-3">Kitchen Status</th>
                            <th className="py-2.5 px-3 text-right">WhatsApp</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800 text-stone-300">
                          {orders.map((o) => {
                            const cleanPhone = (o.customerPhone || '').replace(/\D/g, '');
                            return (
                              <tr key={o.id} className="hover:bg-stone-850">
                                <td className="py-2.5 px-3 font-mono font-bold text-amber-400">#{o.id}</td>
                                <td className="py-2.5 px-3">
                                  <p className="font-bold text-white">{o.customerName}</p>
                                  <p className="font-mono text-[11px] text-stone-400">{o.customerPhone}</p>
                                </td>
                                <td className="py-2.5 px-3 max-w-[150px]">
                                  <p className="truncate text-stone-200">{o.deliveryAddress}</p>
                                  <p className="text-[10px] text-amber-400">{o.deliveryZone}</p>
                                </td>
                                <td className="py-2.5 px-3 max-w-[180px]">
                                  <p className="truncate text-[11px]">
                                    {o.items.map((i) => `${i.quantity}x ${i.name}${i.swallow ? ` (${i.swallow})` : ''}`).join(', ')}
                                  </p>
                                </td>
                                <td className="py-2.5 px-3 font-mono font-bold text-amber-400">
                                  {formatCurrency(o.total)}
                                </td>
                                <td className="py-2.5 px-3">
                                  <select
                                    value={o.status}
                                    onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                                    className="p-1 border rounded text-[11px] bg-stone-950 border-stone-700 text-white"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="cooking">Cooking in Pot</option>
                                    <option value="out_for_delivery">Out with Courier</option>
                                    <option value="completed">Completed / Delivered</option>
                                  </select>
                                </td>
                                <td className="py-2.5 px-3 text-right">
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${o.customerName}, this is ${config.restaurantName} regarding your hot takeout order #${o.id}.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-800/40 rounded font-semibold text-[11px]"
                                  >
                                    <MessageCircle className="w-3 h-3" />
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

              {/* TAB 3: TABLE RESERVATIONS */}
              {activeAdminTab === 'reservations' && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <div>
                      <h3 className="text-base font-serif font-bold text-white">
                        Bukka Dining Reservations ({reservations.length})
                      </h3>
                      <p className="text-stone-400">Manage VIP Bukka booths and table seating requests.</p>
                    </div>
                  </div>

                  {reservations.length === 0 ? (
                    <div className="text-center py-12 text-stone-500">
                      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p>No table reservations logged yet.</p>
                    </div>
                  ) : (
                    <div className="border border-stone-800 rounded-xl overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-stone-950 text-stone-400 font-semibold border-b border-stone-800">
                          <tr>
                            <th className="py-2.5 px-3">Res ID</th>
                            <th className="py-2.5 px-3">Guest</th>
                            <th className="py-2.5 px-3">Date & Time</th>
                            <th className="py-2.5 px-3">Party & Area</th>
                            <th className="py-2.5 px-3">Pre-orders</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3 text-right">WhatsApp</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800 text-stone-300">
                          {reservations.map((r) => {
                            const cleanPhone = (r.guestPhone || '').replace(/\D/g, '');
                            return (
                              <tr key={r.id} className="hover:bg-stone-850">
                                <td className="py-2.5 px-3 font-mono font-bold text-amber-400">#{r.id}</td>
                                <td className="py-2.5 px-3">
                                  <p className="font-bold text-white">{r.guestName}</p>
                                  <p className="font-mono text-[11px] text-stone-400">{r.guestPhone}</p>
                                </td>
                                <td className="py-2.5 px-3">
                                  <p className="font-semibold text-white">{r.date}</p>
                                  <p className="text-[11px] text-stone-400">{r.time}</p>
                                </td>
                                <td className="py-2.5 px-3">
                                  <p className="font-bold text-white">{r.partySize}</p>
                                  <p className="text-[10px] text-amber-400">{r.seatingArea}</p>
                                </td>
                                <td className="py-2.5 px-3 max-w-[150px] truncate">
                                  {r.notes || 'None'}
                                </td>
                                <td className="py-2.5 px-3">
                                  <select
                                    value={r.status}
                                    onChange={(e) => updateReservationStatus(r.id, e.target.value as any)}
                                    className="p-1 border rounded text-[11px] bg-stone-950 border-stone-700 text-white"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="seated">Seated</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                </td>
                                <td className="py-2.5 px-3 text-right">
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${r.guestName}, this is ${config.restaurantName} regarding your table reservation #${r.id}.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-800/40 rounded font-semibold text-[11px]"
                                  >
                                    <MessageCircle className="w-3 h-3" />
                                    <span>Confirm</span>
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
                  <div className="pb-3 border-b border-stone-800">
                    <h3 className="text-base font-serif font-bold text-white">Promotional Alert Banner</h3>
                    <p className="text-stone-400">Broadcast weekly African food specials or discount offers.</p>
                  </div>

                  <div className="space-y-4 bg-stone-950 p-5 rounded-xl border border-stone-800">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold text-white">Enable Promo Banner</label>
                      <input
                        type="checkbox"
                        checked={config.promoBanner.enabled}
                        onChange={(e) =>
                          updateConfig({ promoBanner: { ...config.promoBanner, enabled: e.target.checked } })
                        }
                        className="w-4 h-4 rounded text-amber-500 focus:ring-0"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1 font-medium">Banner Announcement Text</label>
                      <input
                        type="text"
                        value={config.promoBanner.text}
                        onChange={(e) =>
                          updateConfig({ promoBanner: { ...config.promoBanner, text: e.target.value } })
                        }
                        className="w-full p-2 bg-stone-900 border border-stone-700 rounded text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-400 mb-1 font-medium">Badge Label</label>
                        <input
                          type="text"
                          value={config.promoBanner.badgeText || ''}
                          onChange={(e) =>
                            updateConfig({ promoBanner: { ...config.promoBanner, badgeText: e.target.value } })
                          }
                          className="w-full p-2 bg-stone-900 border border-stone-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-400 mb-1 font-medium">Link Callout</label>
                        <input
                          type="text"
                          value={config.promoBanner.linkText || ''}
                          onChange={(e) =>
                            updateConfig({ promoBanner: { ...config.promoBanner, linkText: e.target.value } })
                          }
                          className="w-full p-2 bg-stone-900 border border-stone-700 rounded text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: KITCHEN SETTINGS */}
              {activeAdminTab === 'settings' && (
                <div className="space-y-6 max-w-xl text-xs">
                  <div className="pb-3 border-b border-stone-800">
                    <h3 className="text-base font-serif font-bold text-white">Kitchen WhatsApp & Settings</h3>
                    <p className="text-stone-400">Configure phone number, dispatch address, and delivery rates.</p>
                  </div>

                  <div className="space-y-4 bg-stone-950 p-5 rounded-xl border border-stone-800">
                    <div>
                      <label className="block text-stone-300 font-semibold mb-1">Restaurant Name</label>
                      <input
                        type="text"
                        value={config.restaurantName}
                        onChange={(e) => updateConfig({ restaurantName: e.target.value })}
                        className="w-full p-2 bg-stone-900 border border-stone-700 rounded text-white font-serif font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-300 font-semibold mb-1">Kitchen WhatsApp Number *</label>
                      <input
                        type="text"
                        value={config.whatsappNumber}
                        onChange={(e) => updateConfig({ whatsappNumber: e.target.value })}
                        className="w-full p-2 bg-stone-900 border border-stone-700 rounded text-amber-400 font-mono font-bold"
                      />
                      <p className="text-[10px] text-stone-500 mt-1">
                        Use country code format (e.g. 2348030795206)
                      </p>
                    </div>

                    <div>
                      <label className="block text-stone-300 font-semibold mb-1">Kitchen Physical Address</label>
                      <input
                        type="text"
                        value={config.kitchenAddress}
                        onChange={(e) => updateConfig({ kitchenAddress: e.target.value })}
                        className="w-full p-2 bg-stone-900 border border-stone-700 rounded text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Base Courier Fee ({config.currencySymbol})
                        </label>
                        <input
                          type="number"
                          value={config.baseDeliveryFee}
                          onChange={(e) => updateConfig({ baseDeliveryFee: Number(e.target.value) })}
                          className="w-full p-2 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Free Delivery Over ({config.currencySymbol})
                        </label>
                        <input
                          type="number"
                          value={config.freeDeliveryThreshold}
                          onChange={(e) => updateConfig({ freeDeliveryThreshold: Number(e.target.value) })}
                          className="w-full p-2 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Backup / Export */}
                  <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        const blob = new Blob([exportData()], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `savanna-african-kitchen-backup-${Date.now()}.json`;
                        a.click();
                      }}
                      className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg flex items-center gap-1.5 font-medium cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Backup</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm('Reset kitchen menu to default African dishes? All custom edits will be restored.')) {
                          resetToDefaults();
                        }
                      }}
                      className="px-3.5 py-2 text-rose-400 hover:bg-rose-950/30 rounded-lg font-medium cursor-pointer"
                    >
                      Reset to Defaults
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}

        {/* MODAL: ADD NEW AFRICAN DISH */}
        {isAddingDish && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 max-w-lg w-full space-y-4 text-xs my-auto">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <h3 className="font-serif font-bold text-base text-white">Add New African Culinary Dish</h3>
                <button onClick={() => setIsAddingDish(false)} className="text-stone-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveNewDish} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Dish Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Afang Soup & Goat Meat"
                      value={newDishName}
                      onChange={(e) => setNewDishName(e.target.value)}
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Native Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ofe Afang"
                      value={newDishNative}
                      onChange={(e) => setNewDishNative(e.target.value)}
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-amber-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Tagline / Key Ingredients</label>
                  <input
                    type="text"
                    placeholder="e.g. Ukazi leaves, waterleaf, periwinkles & stockfish"
                    value={newDishTagline}
                    onChange={(e) => setNewDishTagline(e.target.value)}
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Price ({config.currencySymbol}) *</label>
                    <input
                      type="number"
                      required
                      value={newDishPrice}
                      onChange={(e) => setNewDishPrice(Number(e.target.value))}
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded font-mono font-bold text-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Category</label>
                    <select
                      value={newDishCategory}
                      onChange={(e) => setNewDishCategory(e.target.value as any)}
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-white capitalize"
                    >
                      <option value="soups_swallows">Native Soups & Swallows</option>
                      <option value="jollof_rice">Firewood Jollof & Ofada</option>
                      <option value="grills_suya">Kano Suya & Grills</option>
                      <option value="seafood">Fisherman Seafood</option>
                      <option value="party_coolers">5L Party Coolers</option>
                      <option value="drinks">Native Drinks & Palm Wine</option>
                    </select>
                  </div>
                </div>

                {/* Photo: Upload or African Dish Preset */}
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Dish Photograph</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={newDishImage}
                        alt="Preview"
                        className="w-14 h-12 rounded-lg object-cover border border-stone-800 bg-stone-950"
                      />
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
                        className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-400 uppercase block mb-1">
                        Or select authentic African dish preset:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {AFRICAN_DISH_PRESETS.map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => setNewDishImage(preset.url)}
                            className={`p-1.5 text-[11px] rounded border text-left truncate transition-colors cursor-pointer ${
                              newDishImage === preset.url
                                ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                                : 'bg-stone-950 hover:bg-stone-800 border-stone-800 text-stone-300'
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-stone-800">
                  <button
                    type="button"
                    onClick={() => setIsAddingDish(false)}
                    className="px-4 py-2 text-stone-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg font-bold cursor-pointer"
                  >
                    Save Dish to Menu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT AFRICAN DISH */}
        {editingDish && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 max-w-lg w-full space-y-4 text-xs my-auto">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <h3 className="font-serif font-bold text-base text-white">Edit Dish: {editingDish.name}</h3>
                <button onClick={() => setEditingDish(null)} className="text-stone-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEditDish} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={editingDish.name}
                      onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Native Name</label>
                    <input
                      type="text"
                      value={editingDish.nativeName || ''}
                      onChange={(e) => setEditingDish({ ...editingDish, nativeName: e.target.value })}
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-amber-400 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Price ({config.currencySymbol})</label>
                    <input
                      type="number"
                      required
                      value={editingDish.price}
                      onChange={(e) => setEditingDish({ ...editingDish, price: Number(e.target.value) })}
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded font-mono font-bold text-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Spice Level</label>
                    <select
                      value={editingDish.spiceLevel}
                      onChange={(e) => setEditingDish({ ...editingDish, spiceLevel: e.target.value as any })}
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-white"
                    >
                      <option value="Mild">Mild</option>
                      <option value="Medium">Medium</option>
                      <option value="Fiery Hot (Naija Standard)">Fiery Hot (Naija Standard)</option>
                    </select>
                  </div>
                </div>

                {/* Photo Selector */}
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Dish Photograph</label>
                  <div className="flex items-center gap-3">
                    <img
                      src={editingDish.image}
                      alt="Preview"
                      className="w-14 h-12 rounded-lg object-cover border border-stone-800 bg-stone-950"
                    />
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
                      className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      Upload New File
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {AFRICAN_DISH_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setEditingDish({ ...editingDish, image: preset.url })}
                        className={`p-1.5 text-[11px] rounded border text-left truncate transition-colors cursor-pointer ${
                          editingDish.image === preset.url
                            ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                            : 'bg-stone-950 hover:bg-stone-800 border-stone-800 text-stone-300'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-stone-800">
                  <button
                    type="button"
                    onClick={() => setEditingDish(null)}
                    className="px-4 py-2 text-stone-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg font-bold cursor-pointer"
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
