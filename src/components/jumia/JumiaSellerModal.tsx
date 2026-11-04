import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Package, 
  ShoppingBag, 
  Check, 
  Trash2, 
  Edit3, 
  DollarSign, 
  Zap, 
  Flame, 
  Store
} from 'lucide-react';
import { JumiaProduct, OrderRecord } from '../../types/jumia';
import { JUMIA_CATEGORIES, JUMIA_BRANDS } from '../../data/jumiaProducts';

interface JumiaSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: JumiaProduct[];
  onAddProduct: (product: JumiaProduct) => void;
  onUpdateProduct: (product: JumiaProduct) => void;
  onDeleteProduct: (productId: string) => void;
  orders: OrderRecord[];
}

export const JumiaSellerModal: React.FC<JumiaSellerModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'add' | 'orders'>('inventory');

  // New product form
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('Master Chef');
  const [newCategory, setNewCategory] = useState<JumiaProduct['category']>('Cookware & Pots');
  const [newPrice, setNewPrice] = useState('18500');
  const [newOldPrice, setNewOldPrice] = useState('28000');
  const [newStock, setNewStock] = useState('20');
  const [newIsExpress, setNewIsExpress] = useState(true);
  const [newIsFlash, setNewIsFlash] = useState(false);
  const [newImage, setNewImage] = useState('/src/assets/images/jumia_cookware_set_1793198721213.jpg');
  const [newDesc, setNewDesc] = useState('Premium kitchenware with durable construction and non-stick performance.');

  if (!isOpen) return null;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const price = Number(newPrice) || 10000;
    const oldPrice = Number(newOldPrice) || price * 1.3;
    const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

    const newProd: JumiaProduct = {
      id: `jp-custom-${Date.now()}`,
      name: newName,
      brand: newBrand,
      category: newCategory,
      price,
      oldPrice,
      discountPercent: discount,
      rating: 5.0,
      reviewCount: 1,
      image: newImage,
      gallery: [newImage],
      inStock: true,
      stockCount: Number(newStock) || 10,
      soldCount: 0,
      isFlashSale: newIsFlash,
      isExpress: newIsExpress,
      isOfficialStore: true,
      badge: 'NEW',
      description: newDesc,
      keyFeatures: [
        'Premium high-grade construction',
        'Easy to clean and maintain',
        'Built for modern Nigerian kitchens'
      ],
      boxContents: '1x Complete Item in Box, Warranty Card, Manual',
      specifications: {
        'Brand': newBrand,
        'Category': newCategory,
        'Warranty': '1 Year'
      },
      reviews: []
    };

    onAddProduct(newProd);
    setNewName('');
    setActiveTab('inventory');
  };

  const presetImages = [
    { label: 'Cookware Set', url: '/src/assets/images/jumia_cookware_set_1793198721213.jpg' },
    { label: 'Heavy Blender', url: '/src/assets/images/jumia_heavy_blender_1793198721640.jpg' },
    { label: 'Air Fryer', url: '/src/assets/images/jumia_air_fryer_1793198740159.jpg' },
    { label: 'Yam Pounder', url: '/src/assets/images/jumia_yam_pounder_1793198754143.jpg' },
    { label: 'Dish Rack', url: '/src/assets/images/jumia_dish_rack_1793198739810.jpg' },
    { label: 'Food Flask', url: '/src/assets/images/jumia_food_flask_1793198755457.jpg' },
    { label: 'Silicone Utensils', url: '/src/assets/images/jumia_silicone_utensils_1793198824120.jpg' },
    { label: 'Chef Knives', url: '/src/assets/images/jumia_knife_set_1793198823750.jpg' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-auto max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="bg-[#1f1f1f] text-white p-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#F68B1E] flex items-center justify-center font-bold text-white">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">JUMIA SELLER CENTER</h3>
              <p className="text-[11px] text-stone-400">Kitchen Store Vendor Dashboard & Real-Time CMS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-2 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-2.5 flex items-center gap-1.5 transition-colors ${
              activeTab === 'inventory'
                ? 'border-b-2 border-[#F68B1E] text-[#F68B1E]'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`pb-2.5 flex items-center gap-1.5 transition-colors ${
              activeTab === 'add'
                ? 'border-b-2 border-[#F68B1E] text-[#F68B1E]'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Utensil</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2.5 flex items-center gap-1.5 transition-colors ${
              activeTab === 'orders'
                ? 'border-b-2 border-[#F68B1E] text-[#F68B1E]'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-xs">
          {/* TAB 1: Inventory Table */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-stone-500">
                  Update your kitchen stock, prices, Flash Sale status, and Express badges in real time.
                </p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="px-3 py-1.5 bg-[#F68B1E] text-white rounded font-bold hover:bg-[#e07a16] flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>New Product</span>
                </button>
              </div>

              <div className="border border-stone-200 rounded-lg overflow-x-auto divide-y divide-stone-200">
                {products.map((prod) => (
                  <div key={prod.id} className="p-3 flex items-center justify-between gap-4 hover:bg-stone-50">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 object-contain bg-white rounded border border-stone-200 p-0.5 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-stone-900 truncate">{prod.name}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                        <span className="font-semibold text-stone-700">{prod.brand}</span>
                        <span>•</span>
                        <span>{prod.category}</span>
                        <span>•</span>
                        <span className={prod.inStock ? 'text-emerald-600 font-bold' : 'text-rose-500'}>
                          {prod.inStock ? `${prod.stockCount} in stock` : 'Out of stock'}
                        </span>
                      </div>
                    </div>

                    {/* Price and Badges */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="font-black text-stone-900">${prod.price.toLocaleString()}</div>
                        <div className="text-[10px] text-stone-400 line-through">${prod.oldPrice.toLocaleString()}</div>
                      </div>

                      {/* Flash Sale Toggle */}
                      <button
                        onClick={() => onUpdateProduct({ ...prod, isFlashSale: !prod.isFlashSale })}
                        className={`p-1.5 rounded text-[11px] font-bold border transition-colors ${
                          prod.isFlashSale
                            ? 'bg-rose-50 border-rose-300 text-rose-600'
                            : 'bg-stone-100 border-stone-200 text-stone-400 hover:text-stone-700'
                        }`}
                        title="Toggle Flash Sale"
                      >
                        <Flame className="w-3.5 h-3.5" />
                      </button>

                      {/* Express Toggle */}
                      <button
                        onClick={() => onUpdateProduct({ ...prod, isExpress: !prod.isExpress })}
                        className={`p-1.5 rounded text-[11px] font-bold border transition-colors ${
                          prod.isExpress
                            ? 'bg-amber-50 border-amber-300 text-[#F68B1E]'
                            : 'bg-stone-100 border-stone-200 text-stone-400 hover:text-stone-700'
                        }`}
                        title="Toggle Express"
                      >
                        <Zap className="w-3.5 h-3.5" />
                      </button>

                      {/* Stock Toggle */}
                      <button
                        onClick={() => onUpdateProduct({ ...prod, inStock: !prod.inStock })}
                        className={`px-2 py-1 rounded text-[10px] font-bold ${
                          prod.inStock
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {prod.inStock ? 'Available' : 'Sold Out'}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDeleteProduct(prod.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Add Product Form */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateProduct} className="space-y-4 max-w-2xl">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Chef 12-Piece Die-Cast Non-Stick Granite Pot Set"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#F68B1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Brand Name *</label>
                  <select
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#F68B1E] bg-white"
                  >
                    {JUMIA_BRANDS.filter(b => b !== 'All Brands').map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as JumiaProduct['category'])}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#F68B1E] bg-white"
                  >
                    {JUMIA_CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Selling Price (₦) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#F68B1E]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Original Price (₦)</label>
                  <input
                    type="number"
                    value={newOldPrice}
                    onChange={(e) => setNewOldPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#F68B1E]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#F68B1E]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1.5">Select Product Image</label>
                <div className="grid grid-cols-4 gap-2">
                  {presetImages.map((img) => (
                    <div
                      key={img.label}
                      onClick={() => setNewImage(img.url)}
                      className={`p-2 border rounded-md cursor-pointer text-center transition-all ${
                        newImage === img.url ? 'border-[#F68B1E] bg-amber-50 ring-2 ring-amber-300' : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-12 h-12 object-contain mx-auto" />
                      <p className="text-[10px] font-semibold text-stone-700 mt-1 truncate">{img.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsExpress}
                    onChange={(e) => setNewIsExpress(e.target.checked)}
                    className="rounded text-[#F68B1E] focus:ring-[#F68B1E]"
                  />
                  <span className="font-semibold text-stone-700">Jumia Express 24H Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsFlash}
                    onChange={(e) => setNewIsFlash(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span className="font-semibold text-rose-600">Feature in Flash Sales</span>
                </label>
              </div>

              <div className="pt-3 border-t border-stone-200">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#F68B1E] hover:bg-[#e07a16] text-white font-extrabold uppercase rounded shadow"
                >
                  Publish Utensil to Store
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Customer Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-stone-500">
                  <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                  <p className="font-bold text-stone-700">No customer orders yet</p>
                  <p className="text-xs text-stone-400 mt-1">
                    Orders placed through checkout or WhatsApp will appear here in real-time.
                  </p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.orderId} className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm font-mono">{ord.orderId}</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                          {ord.status}
                        </span>
                      </div>
                      <span className="text-stone-400 text-xs">{ord.date}</span>
                    </div>

                    <div className="text-xs text-stone-600 grid grid-cols-2 gap-2 pt-1 border-t border-stone-200">
                      <div>
                        <p><strong className="text-stone-800">Customer:</strong> {ord.customerName}</p>
                        <p><strong className="text-stone-800">Phone:</strong> {ord.phoneNumber}</p>
                        <p><strong className="text-stone-800">Address:</strong> {ord.deliveryAddress}, {ord.lga}, {ord.state}</p>
                      </div>
                      <div>
                        <p><strong className="text-stone-800">Payment:</strong> {ord.paymentMethod.replace(/_/g, ' ')}</p>
                        <p><strong className="text-stone-800">Total:</strong> <span className="font-bold text-[#F68B1E]">${ord.total.toLocaleString()} CAD</span></p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-200">
                      <p className="font-bold text-stone-700 text-[11px] mb-1">Items:</p>
                      <div className="flex flex-wrap gap-2">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="bg-white px-2 py-1 rounded border border-stone-200 text-[11px] flex items-center gap-1.5">
                            <img src={it.image} alt={it.productName} className="w-5 h-5 object-contain" />
                            <span>{it.quantity}x {it.productName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
