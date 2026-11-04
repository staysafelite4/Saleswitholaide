import React, { useState, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductAvailability, KegOption, ReviewItem, FAQItem } from '../../types';
import {
  PRODUCT_CLASSIC_IMAGE,
  PRODUCT_GINGER_IMAGE,
  PRODUCT_PINEAPPLE_IMAGE,
  HERO_IMAGE_PATH
} from '../../data/initialData';
import {
  X,
  Lock,
  Unlock,
  DollarSign,
  Package,
  Megaphone,
  Palette,
  FileText,
  ClipboardList,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Check,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  AlertTriangle,
  Download,
  Eye,
  Sliders,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    activeAdminTab,
    setActiveAdminTab,
    siteConfig,
    updateSiteConfig,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    toggleProductAvailability,
    updateProductPrice,
    orders,
    updateOrderStatus,
    formatCurrency,
    resetToDefaults,
    exportSiteData,
    importSiteData
  } = useStore();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // New product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdTagline, setNewProdTagline] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(2500);
  const [newProdComparePrice, setNewProdComparePrice] = useState<number | undefined>(undefined);
  const [newProdSize, setNewProdSize] = useState('500ml Bottle');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('bottles');
  const [newProdImage, setNewProdImage] = useState(PRODUCT_CLASSIC_IMAGE);
  const [newProdAvailability, setNewProdAvailability] = useState<ProductAvailability>('in_stock');
  const [newProdSpice, setNewProdSpice] = useState<Product['spiceLevel']>('Medium');
  const [newProdSweetness, setNewProdSweetness] = useState('Raw Honey & Dates');
  const [newProdIngredients, setNewProdIngredients] = useState('Hibiscus, Ginger, Cloves');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminOpen) return null;

  // PIN Authentication
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'zobo2025' || pinInput === 'admin123' || pinInput === 'admin') {
      setIsAdminAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN code. Hint: use zobo2025');
    }
  };

  const handleUseDemoPin = () => {
    setIsAdminAuthenticated(true);
    setPinError('');
  };

  // Handle local image file upload (converts to base64 Data URL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'product' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('File size exceeds 4MB. Please select a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        if (target === 'product') {
          if (editingProduct) {
            setEditingProduct({ ...editingProduct, image: base64Url });
          } else {
            setNewProdImage(base64Url);
          }
        } else if (target === 'logo') {
          updateSiteConfig({ brandIcon: base64Url });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    addProduct({
      name: newProdName,
      tagline: newProdTagline || 'Handcrafted Hibiscus Tonic',
      description: newProdDesc || 'Artisanal Nigerian zobo brewed fresh with natural spices.',
      price: Number(newProdPrice) || 2500,
      compareAtPrice: newProdComparePrice ? Number(newProdComparePrice) : undefined,
      size: newProdSize,
      volume: newProdSize,
      category: newProdCategory,
      image: newProdImage,
      availability: newProdAvailability,
      spiceLevel: newProdSpice,
      sweetness: newProdSweetness,
      ingredients: newProdIngredients.split(',').map(s => s.trim()).filter(Boolean),
      featured: false
    });

    setIsAddingProduct(false);
    // Reset form
    setNewProdName('');
    setNewProdTagline('');
    setNewProdDesc('');
    setNewProdPrice(2500);
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden text-stone-900 my-auto">
        {/* Top Bar */}
        <div className="px-6 py-4 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#720026] text-white flex items-center justify-center shadow-xs">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-serif font-bold text-stone-900">
                  {siteConfig.brandName} Control Center
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                  LIVE CMS
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Update site name, images, pricing, availability, and banners in real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={() => setIsAdminAuthenticated(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                title="Lock admin session"
              >
                Lock
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate: PIN Screen */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-14 h-14 bg-rose-100 text-[#720026] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Admin Authentication
              </h3>
              <p className="text-xs text-stone-500">
                Enter your security PIN code to access live pricing and store content.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Enter PIN (e.g. zobo2025)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-mono px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#720026]"
                autoFocus
              />

              {pinError && (
                <p className="text-xs text-rose-600 font-medium">{pinError}</p>
              )}

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#720026] hover:bg-[#58001c] rounded-lg transition-colors cursor-pointer"
                >
                  Unlock Dashboard
                </button>

                <button
                  type="button"
                  onClick={handleUseDemoPin}
                  className="w-full py-2 px-4 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  Quick Unlock (Demo: zobo2025)
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Main Authenticated CMS Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-56 bg-stone-50 border-r border-stone-200 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveAdminTab('pricing')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeAdminTab === 'pricing'
                    ? 'bg-[#720026] text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <DollarSign className="w-4 h-4 shrink-0" />
                <span>Pricing & Inventory</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('banner')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeAdminTab === 'banner'
                    ? 'bg-[#720026] text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Megaphone className="w-4 h-4 shrink-0" />
                <span>Promo Banner</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('branding')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeAdminTab === 'branding'
                    ? 'bg-[#720026] text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Palette className="w-4 h-4 shrink-0" />
                <span>Branding & WhatsApp</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('pages')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeAdminTab === 'pages'
                    ? 'bg-[#720026] text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>Pages & Stories</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('orders')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeAdminTab === 'orders'
                    ? 'bg-[#720026] text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <ClipboardList className="w-4 h-4 shrink-0" />
                <span>Orders Log ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('backup')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeAdminTab === 'backup'
                    ? 'bg-[#720026] text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Export & Backup</span>
              </button>

              <div className="pt-4 mt-auto hidden md:block border-t border-stone-200 text-[11px] text-stone-500 px-3">
                <p className="font-semibold text-stone-700">Real-Time Sync</p>
                <p className="mt-0.5">Every keystroke immediately persists to the live store view.</p>
              </div>
            </aside>

            {/* Main Tab Content View */}
            <main className="flex-1 p-6 overflow-y-auto bg-white">
              {/* TAB 1: PRICING & INVENTORY */}
              {activeAdminTab === 'pricing' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-stone-900">
                        Product Catalog & Real-Time Pricing
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Adjust prices, availability, bottle sizes, and upload custom drink imagery.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingProduct(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#720026] hover:bg-[#58001c] rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Drink</span>
                    </button>
                  </div>

                  {/* Products Table with Inline Price & Availability Controls */}
                  <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                        <tr>
                          <th className="py-3 px-4">Item</th>
                          <th className="py-3 px-3">Size/Category</th>
                          <th className="py-3 px-3">Price ({siteConfig.currencySymbol})</th>
                          <th className="py-3 px-3">Compare At</th>
                          <th className="py-3 px-3">Availability</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-stone-700">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                                />
                                <div className="min-w-0">
                                  <p className="font-serif font-bold text-stone-900 truncate max-w-[200px]">
                                    {p.name}
                                  </p>
                                  <p className="text-[11px] text-stone-500 truncate max-w-[200px]">
                                    {p.spiceLevel} · {p.sweetness}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="py-3 px-3 font-mono text-[11px] whitespace-nowrap">
                              {p.size}
                            </td>

                            <td className="py-3 px-3">
                              {/* Real-time inline price editor */}
                              <div className="relative w-24">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400 font-mono">
                                  {siteConfig.currencySymbol}
                                </span>
                                <input
                                  type="number"
                                  value={p.price}
                                  onChange={(e) => updateProductPrice(p.id, Number(e.target.value), p.compareAtPrice)}
                                  className="w-full pl-6 pr-2 py-1 bg-white border border-stone-300 rounded focus:border-[#720026] text-stone-900 font-mono font-bold tabular-nums text-xs"
                                />
                              </div>
                            </td>

                            <td className="py-3 px-3">
                              {/* Inline compare-at discount price */}
                              <div className="relative w-24">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400 font-mono">
                                  {siteConfig.currencySymbol}
                                </span>
                                <input
                                  type="number"
                                  placeholder="None"
                                  value={p.compareAtPrice || ''}
                                  onChange={(e) =>
                                    updateProductPrice(
                                      p.id,
                                      p.price,
                                      e.target.value ? Number(e.target.value) : undefined
                                    )
                                  }
                                  className="w-full pl-6 pr-2 py-1 bg-white border border-stone-200 rounded focus:border-[#720026] text-stone-500 font-mono tabular-nums text-xs"
                                />
                              </div>
                            </td>

                            <td className="py-3 px-3">
                              {/* Instant availability toggle */}
                              <select
                                value={p.availability}
                                onChange={(e) => toggleProductAvailability(p.id, e.target.value as ProductAvailability)}
                                className={`text-xs font-medium py-1 px-2 rounded border focus:outline-none cursor-pointer ${
                                  p.availability === 'in_stock'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : p.availability === 'low_stock'
                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                    : p.availability === 'brewing_fresh'
                                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                                    : 'bg-rose-50 text-rose-800 border-rose-200'
                                }`}
                              >
                                <option value="in_stock">In Stock</option>
                                <option value="low_stock">Low Stock</option>
                                <option value="brewing_fresh">Brewing Fresh</option>
                                <option value="out_of_stock">Sold Out</option>
                              </select>
                            </td>

                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => setEditingProduct(p)}
                                  className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors cursor-pointer"
                                  title="Edit full product details & image"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete "${p.name}" from store catalog?`)) {
                                      deleteProduct(p.id);
                                    }
                                  }}
                                  className="p-1.5 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                                  title="Delete product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: PROMOTIONAL BANNER */}
              {activeAdminTab === 'banner' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="pb-4 border-b border-stone-200">
                    <h3 className="text-lg font-serif font-bold text-stone-900">
                      Promotional Announcement Banner
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Configure your top alert bar for flash discounts, weekend free courier promos, or new flavor drops.
                    </p>
                  </div>

                  {/* Live Banner Preview Inside Admin */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Live Real-Time Preview
                    </span>
                    <div
                      className={`p-3 rounded-lg text-xs font-medium flex items-center justify-between ${
                        siteConfig.promoBanner.bgColor === 'crimson'
                          ? 'bg-[#58001c] text-rose-50'
                          : siteConfig.promoBanner.bgColor === 'amber'
                          ? 'bg-[#854d0e] text-amber-50'
                          : siteConfig.promoBanner.bgColor === 'emerald'
                          ? 'bg-[#064e3b] text-emerald-50'
                          : 'bg-[#18181b] text-zinc-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        {siteConfig.promoBanner.badgeText && (
                          <span className="font-bold uppercase text-[10px]">
                            {siteConfig.promoBanner.badgeText} ·
                          </span>
                        )}
                        <span>{siteConfig.promoBanner.text}</span>
                        {siteConfig.promoBanner.linkText && (
                          <span className="underline underline-offset-2 ml-1 cursor-pointer">
                            {siteConfig.promoBanner.linkText} →
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] opacity-75">Preview</span>
                    </div>
                  </div>

                  {/* Banner Controls */}
                  <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4 text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-semibold text-stone-900 text-sm">
                          Enable Announcement Banner
                        </label>
                        <p className="text-stone-500 text-[11px]">
                          Controls whether the top banner is rendered on the storefront.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={siteConfig.promoBanner.enabled}
                        onChange={(e) =>
                          updateSiteConfig({
                            promoBanner: { ...siteConfig.promoBanner, enabled: e.target.checked }
                          })
                        }
                        className="w-5 h-5 text-[#720026] rounded border-stone-300 focus:ring-0 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Banner Headline Message
                      </label>
                      <input
                        type="text"
                        value={siteConfig.promoBanner.text}
                        onChange={(e) =>
                          updateSiteConfig({
                            promoBanner: { ...siteConfig.promoBanner, text: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-700 font-medium mb-1">
                          Badge Label (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Weekend Special, New Batch"
                          value={siteConfig.promoBanner.badgeText || ''}
                          onChange={(e) =>
                            updateSiteConfig({
                              promoBanner: { ...siteConfig.promoBanner, badgeText: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-700 font-medium mb-1">
                          Action Button Label (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Order 6-Pack Now"
                          value={siteConfig.promoBanner.linkText || ''}
                          onChange={(e) =>
                            updateSiteConfig({
                              promoBanner: { ...siteConfig.promoBanner, linkText: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-700 font-medium mb-1">
                          Link Anchor / URL
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. #menu or #kegs"
                          value={siteConfig.promoBanner.linkUrl || ''}
                          onChange={(e) =>
                            updateSiteConfig({
                              promoBanner: { ...siteConfig.promoBanner, linkUrl: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-700 font-medium mb-1">
                          Banner Color Theme
                        </label>
                        <select
                          value={siteConfig.promoBanner.bgColor}
                          onChange={(e) =>
                            updateSiteConfig({
                              promoBanner: {
                                ...siteConfig.promoBanner,
                                bgColor: e.target.value as any
                              }
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                        >
                          <option value="crimson">Velvet Crimson</option>
                          <option value="amber">Warm Amber Gold</option>
                          <option value="emerald">Botanical Emerald</option>
                          <option value="charcoal">Obsidian Charcoal</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: BRANDING, SITE NAME, ICON & WHATSAPP */}
              {activeAdminTab === 'branding' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="pb-4 border-b border-stone-200">
                    <h3 className="text-lg font-serif font-bold text-stone-900">
                      Branding, Site Name, Icon & WhatsApp Configuration
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Configure your store identity, WhatsApp checkout recipient, currency, and delivery parameters.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-5 text-xs">
                    {/* Brand Name & Tagline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">
                          Site & Brand Name
                        </label>
                        <input
                          type="text"
                          value={siteConfig.brandName}
                          onChange={(e) => updateSiteConfig({ brandName: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 font-serif font-bold focus:outline-none focus:border-[#720026]"
                        />
                        <span className="text-[10px] text-stone-400 mt-1 block">
                          Updates the header wordmark, title, footer, and WhatsApp receipts.
                        </span>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">
                          Brand Slogan / Tagline
                        </label>
                        <input
                          type="text"
                          value={siteConfig.tagline}
                          onChange={(e) => updateSiteConfig({ tagline: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                        />
                      </div>
                    </div>

                    {/* Brand Icon / Logo Upload */}
                    <div className="pt-3 border-t border-stone-200">
                      <label className="block text-stone-700 font-semibold mb-2">
                        Site Logo / Brand Icon
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl border border-stone-300 bg-white flex items-center justify-center overflow-hidden shrink-0">
                          {siteConfig.brandIcon.startsWith('data:') || siteConfig.brandIcon.startsWith('http') ? (
                            <img src={siteConfig.brandIcon} alt="Brand Logo" className="w-full h-full object-cover" />
                          ) : (
                            <Sparkles className="w-6 h-6 text-[#720026]" />
                          )}
                        </div>

                        <div className="space-y-1.5 flex-1">
                          <input
                            type="file"
                            ref={logoInputRef}
                            accept="image/*"
                            onChange={(e) => handleImageFileUpload(e, 'logo')}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => logoInputRef.current?.click()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Custom Logo / Icon</span>
                          </button>
                          <p className="text-[11px] text-stone-500">
                            PNG, JPG or SVG up to 4MB. Converted to immediate local image.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Business Number */}
                    <div className="pt-3 border-t border-stone-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-stone-700 font-semibold mb-1">
                            WhatsApp Phone Number (with Country Code)
                          </label>
                          <div className="relative">
                            <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={siteConfig.whatsappNumber}
                              onChange={(e) => updateSiteConfig({ whatsappNumber: e.target.value })}
                              placeholder="2348030795206"
                              className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 font-mono focus:outline-none focus:border-emerald-600"
                            />
                          </div>
                          <span className="text-[10px] text-stone-400 mt-1 block">
                            Customer orders will open WhatsApp to this exact phone.
                          </span>
                        </div>

                        <div>
                          <label className="block text-stone-700 font-semibold mb-1">
                            Test Live WhatsApp Link
                          </label>
                          <a
                            href={`https://wa.me/${(siteConfig.whatsappNumber || '').replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors"
                          >
                            <span>Open Chat with +{siteConfig.whatsappNumber}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Currency & Delivery Policy */}
                    <div className="pt-3 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">
                          Currency Symbol
                        </label>
                        <select
                          value={siteConfig.currencySymbol}
                          onChange={(e) => updateSiteConfig({ currencySymbol: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 font-mono font-bold focus:outline-none focus:border-[#720026]"
                        >
                          <option value="₦">₦ (Nigerian Naira - NGN)</option>
                          <option value="$">$ (US Dollar - USD)</option>
                          <option value="£">£ (British Pound - GBP)</option>
                          <option value="€">€ (Euro - EUR)</option>
                          <option value="GH₵">GH₵ (Ghanaian Cedi - GHS)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">
                          Base Courier Delivery Fee
                        </label>
                        <input
                          type="number"
                          value={siteConfig.deliveryBaseFee}
                          onChange={(e) => updateSiteConfig({ deliveryBaseFee: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 font-mono focus:outline-none focus:border-[#720026]"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">
                          Free Delivery Threshold
                        </label>
                        <input
                          type="number"
                          value={siteConfig.freeDeliveryThreshold}
                          onChange={(e) => updateSiteConfig({ freeDeliveryThreshold: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 font-mono focus:outline-none focus:border-[#720026]"
                        />
                      </div>
                    </div>

                    {/* Kitchen Contact & Location */}
                    <div className="pt-3 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-700 font-medium mb-1">
                          Kitchen / Store Location Address
                        </label>
                        <input
                          type="text"
                          value={siteConfig.kitchenAddress}
                          onChange={(e) => updateSiteConfig({ kitchenAddress: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-700 font-medium mb-1">
                          Customer Support Email
                        </label>
                        <input
                          type="email"
                          value={siteConfig.contactEmail}
                          onChange={(e) => updateSiteConfig({ contactEmail: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PAGES & CONTENT */}
              {activeAdminTab === 'pages' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="pb-4 border-b border-stone-200">
                    <h3 className="text-lg font-serif font-bold text-stone-900">
                      Pages, Story & Testimonials Content
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Customize your brand story, wholesale party kegs, and verified customer testimonials.
                    </p>
                  </div>

                  {/* Story Editor */}
                  <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4 text-xs">
                    <h4 className="font-serif font-bold text-sm text-stone-900">
                      Our Heritage & Story Section
                    </h4>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Section Headline
                      </label>
                      <input
                        type="text"
                        value={siteConfig.story?.title || ''}
                        onChange={(e) =>
                          updateSiteConfig({
                            story: { ...siteConfig.story, title: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Full Story Body Prose
                      </label>
                      <textarea
                        rows={3}
                        value={siteConfig.story?.bodyText || ''}
                        onChange={(e) =>
                          updateSiteConfig({
                            story: { ...siteConfig.story, bodyText: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Master Brewer Quote
                      </label>
                      <input
                        type="text"
                        value={siteConfig.story?.quote || ''}
                        onChange={(e) =>
                          updateSiteConfig({
                            story: { ...siteConfig.story, quote: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-[#720026]"
                      />
                    </div>
                  </div>

                  {/* Wholesale Kegs Pricing Editor */}
                  <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4 text-xs">
                    <h4 className="font-serif font-bold text-sm text-stone-900">
                      Party Keg Packages & Pricing
                    </h4>
                    <div className="space-y-3">
                      {(siteConfig.wholesale?.kegs || []).map((keg, index) => (
                        <div key={keg.id} className="bg-white p-3 rounded-lg border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                          <div>
                            <span className="font-bold text-stone-800">{keg.size}</span>
                            <p className="text-[11px] text-stone-500">{keg.serves}</p>
                          </div>
                          <div>
                            <label className="text-[10px] text-stone-400 block">Package Price ({siteConfig.currencySymbol})</label>
                            <input
                              type="number"
                              value={keg.price}
                              onChange={(e) => {
                                const newKegs = [...siteConfig.wholesale.kegs];
                                newKegs[index] = { ...newKegs[index], price: Number(e.target.value) };
                                updateSiteConfig({
                                  wholesale: { ...siteConfig.wholesale, kegs: newKegs }
                                });
                              }}
                              className="w-full px-2 py-1 bg-stone-50 border border-stone-200 rounded font-mono font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-stone-400 block">Description Note</label>
                            <input
                              type="text"
                              value={keg.description}
                              onChange={(e) => {
                                const newKegs = [...siteConfig.wholesale.kegs];
                                newKegs[index] = { ...newKegs[index], description: e.target.value };
                                updateSiteConfig({
                                  wholesale: { ...siteConfig.wholesale, kegs: newKegs }
                                });
                              }}
                              className="w-full px-2 py-1 bg-stone-50 border border-stone-200 rounded text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ORDERS LOG */}
              {activeAdminTab === 'orders' && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-stone-200 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-stone-900">
                        WhatsApp Customer Orders Log
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Track orders submitted through your website checkout and re-engage customers directly.
                      </p>
                    </div>

                    <span className="text-xs font-mono font-bold bg-stone-100 px-3 py-1 rounded-lg text-stone-700">
                      Total Orders: {orders.length}
                    </span>
                  </div>

                  {orders.length === 0 ? (
                    <div className="py-16 text-center text-stone-400">
                      <ClipboardList className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p className="text-xs">No orders recorded yet. Place a test order from the bag!</p>
                    </div>
                  ) : (
                    <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                          <tr>
                            <th className="py-3 px-4">Order ID & Date</th>
                            <th className="py-3 px-3">Customer</th>
                            <th className="py-3 px-3">Delivery Address</th>
                            <th className="py-3 px-3">Items</th>
                            <th className="py-3 px-3">Total Amount</th>
                            <th className="py-3 px-3">Status</th>
                            <th className="py-3 px-4 text-right">WhatsApp</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-700">
                          {orders.map((order) => {
                            const cleanCustPhone = order.customerPhone.replace(/\D/g, '');
                            return (
                              <tr key={order.id} className="hover:bg-stone-50/80">
                                <td className="py-3 px-4">
                                  <span className="font-mono font-bold text-stone-900">#{order.id}</span>
                                  <p className="text-[11px] text-stone-400">{order.timestamp}</p>
                                </td>

                                <td className="py-3 px-3">
                                  <p className="font-semibold text-stone-900">{order.customerName}</p>
                                  <p className="text-[11px] text-stone-500">{order.customerPhone}</p>
                                </td>

                                <td className="py-3 px-3 max-w-[200px] truncate text-[11px] text-stone-600">
                                  {order.deliveryAddress}
                                </td>

                                <td className="py-3 px-3 text-[11px]">
                                  {order.items.map((it, idx) => (
                                    <div key={idx} className="truncate max-w-[180px]">
                                      {it.quantity}x {it.name}
                                    </div>
                                  ))}
                                </td>

                                <td className="py-3 px-3 font-mono font-bold text-[#720026] tabular-nums">
                                  {formatCurrency(order.totalAmount)}
                                </td>

                                <td className="py-3 px-3">
                                  <select
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                    className="text-[11px] font-semibold py-1 px-2 rounded border bg-stone-50 text-stone-800 cursor-pointer"
                                  >
                                    <option value="pending_whatsapp">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="dispatched">Dispatched</option>
                                    <option value="delivered">Delivered</option>
                                  </select>
                                </td>

                                <td className="py-3 px-4 text-right">
                                  {cleanCustPhone ? (
                                    <a
                                      href={`https://wa.me/${cleanCustPhone}?text=${encodeURIComponent(
                                        `Hello ${order.customerName}, this is ${siteConfig.brandName} regarding your order #${order.id}.`
                                      )}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold text-xs"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                      <span>Chat</span>
                                    </a>
                                  ) : (
                                    <span className="text-stone-300">—</span>
                                  )}
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

              {/* TAB 6: BACKUP & RESTORE */}
              {activeAdminTab === 'backup' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="pb-4 border-b border-stone-200">
                    <h3 className="text-lg font-serif font-bold text-stone-900">
                      Backup, Export & Factory Reset
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Save your configuration JSON file or restore default factory data.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4 text-xs">
                    <div>
                      <h4 className="font-bold text-stone-800 text-sm mb-1">Export Store Data</h4>
                      <p className="text-stone-500 mb-3">
                        Download your customized prices, images, and WhatsApp settings as a JSON file.
                      </p>
                      <button
                        onClick={() => {
                          const json = exportSiteData();
                          const blob = new Blob([json], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `zobo_store_backup_${Date.now()}.json`;
                          a.click();
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Store Backup JSON</span>
                      </button>
                    </div>

                    <div className="pt-4 border-t border-stone-200">
                      <h4 className="font-bold text-stone-800 text-sm mb-1">Import Configuration</h4>
                      <p className="text-stone-500 mb-2">
                        Paste a previously exported JSON backup to restore settings.
                      </p>
                      <textarea
                        rows={3}
                        placeholder="Paste JSON string here..."
                        value={importText}
                        onChange={(e) => setImportText(e.target.value)}
                        className="w-full p-2.5 bg-white border border-stone-200 rounded-lg font-mono text-[11px] mb-2"
                      />
                      <button
                        onClick={() => {
                          if (!importText.trim()) return;
                          const res = importSiteData(importText);
                          if (res.success) {
                            setImportStatus('Configuration successfully restored!');
                            setImportText('');
                          } else {
                            setImportStatus(`Error: ${res.error}`);
                          }
                        }}
                        className="px-4 py-1.5 bg-stone-700 text-white rounded-lg hover:bg-stone-800 cursor-pointer"
                      >
                        Import Backup
                      </button>
                      {importStatus && (
                        <p className="mt-2 text-xs font-semibold text-stone-800">{importStatus}</p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-stone-200">
                      <h4 className="font-bold text-rose-800 text-sm mb-1">Factory Reset</h4>
                      <p className="text-stone-500 mb-3">
                        Restores all sample hibiscus drinks, photography, and default prices.
                      </p>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to reset all store content to factory defaults?')) {
                            resetToDefaults();
                            alert('Store reset to defaults successfully.');
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-800 border border-rose-200 font-semibold rounded-lg hover:bg-rose-100 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset to Default Zobo Store</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}

        {/* Modal: Add New Product */}
        {isAddingProduct && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="text-base font-serif font-bold text-stone-900">
                  Add New Zobo Drink / Bundle
                </h3>
                <button
                  onClick={() => setIsAddingProduct(false)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveNewProduct} className="space-y-4">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Drink Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Spiced Date & Clove Elixir"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Price ({siteConfig.currencySymbol}) *</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Bottle Size / Volume</label>
                    <input
                      type="text"
                      placeholder="e.g. 500ml Bottle"
                      value={newProdSize}
                      onChange={(e) => setNewProdSize(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Short Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. Slow simmered with Kano hibiscus calyces"
                    value={newProdTagline}
                    onChange={(e) => setNewProdTagline(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Product Image</label>
                  <div className="flex items-center gap-3">
                    <img
                      src={newProdImage}
                      alt="Preview"
                      className="w-14 h-14 rounded-lg object-cover border border-stone-200 bg-stone-100"
                    />
                    <div className="space-y-2 flex-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, 'product')}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Image File</span>
                      </button>

                      {/* Or choose from preset zobo photography */}
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => setNewProdImage(PRODUCT_CLASSIC_IMAGE)}
                          className="text-[10px] px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded"
                        >
                          Preset Classic
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewProdImage(PRODUCT_GINGER_IMAGE)}
                          className="text-[10px] px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded"
                        >
                          Preset Ginger
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewProdImage(PRODUCT_PINEAPPLE_IMAGE)}
                          className="text-[10px] px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded"
                        >
                          Preset Pineapple
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Category</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                    >
                      <option value="bottles">Fresh Bottles</option>
                      <option value="bundles">Wellness Bundles</option>
                      <option value="kegs">Party Kegs</option>
                      <option value="specials">Seasonal Special</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Availability</label>
                    <select
                      value={newProdAvailability}
                      onChange={(e) => setNewProdAvailability(e.target.value as any)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                    >
                      <option value="in_stock">In Stock</option>
                      <option value="low_stock">Low Stock</option>
                      <option value="brewing_fresh">Brewing Fresh</option>
                      <option value="out_of_stock">Sold Out</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#720026] hover:bg-[#58001c] rounded-lg shadow-xs"
                  >
                    Save & Publish Drink
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit Existing Product */}
        {editingProduct && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="text-base font-serif font-bold text-stone-900">
                  Edit Drink: {editingProduct.name}
                </h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEditProduct} className="space-y-4">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Drink Name</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-serif font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Price ({siteConfig.currencySymbol})</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Compare At Price</label>
                    <input
                      type="number"
                      value={editingProduct.compareAtPrice || ''}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          compareAtPrice: e.target.value ? Number(e.target.value) : undefined
                        })
                      }
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editingProduct.tagline}
                    onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Product Image</label>
                  <div className="flex items-center gap-3">
                    <img
                      src={editingProduct.image}
                      alt={editingProduct.name}
                      className="w-16 h-16 rounded-lg object-cover border border-stone-200 bg-stone-100"
                    />
                    <div className="space-y-1.5 flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, 'product')}
                        className="text-xs"
                      />
                      <input
                        type="text"
                        value={editingProduct.image}
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        placeholder="Or enter image URL path"
                        className="w-full px-2 py-1 bg-stone-50 border border-stone-200 rounded text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Bottle Size</label>
                    <input
                      type="text"
                      value={editingProduct.size}
                      onChange={(e) => setEditingProduct({ ...editingProduct, size: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Availability</label>
                    <select
                      value={editingProduct.availability}
                      onChange={(e) => setEditingProduct({ ...editingProduct, availability: e.target.value as any })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-medium"
                    >
                      <option value="in_stock">In Stock</option>
                      <option value="low_stock">Low Stock</option>
                      <option value="brewing_fresh">Brewing Fresh</option>
                      <option value="out_of_stock">Sold Out</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#720026] hover:bg-[#58001c] rounded-lg shadow-xs"
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
