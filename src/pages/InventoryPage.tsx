import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ExternalLink,
  X,
  Sparkles,
  Upload,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, ProductStatus } from '../types';
import { Link } from 'react-router-dom';

export const InventoryPage: React.FC = () => {
  const { 
    currentStore, 
    currentStoreProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateProductStatus 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toastText, setToastText] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formHindiName, setFormHindiName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formCost, setFormCost] = useState('');
  const [formUnit, setFormUnit] = useState('plate');
  const [formCategory, setFormCategory] = useState('Main Course');
  const [formStock, setFormStock] = useState('25');
  const [formIsVeg, setFormIsVeg] = useState(true);
  const [formImageUrl, setFormImageUrl] = useState('https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80');

  const filteredProducts = currentStoreProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.hindiName && p.hindiName.includes(searchQuery));
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormHindiName('');
    setFormDesc('');
    setFormPrice('150');
    setFormCost('60');
    setFormUnit('plate');
    setFormCategory('Signature Dishes');
    setFormStock('20');
    setFormIsVeg(true);
    setFormImageUrl('https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80');
    setIsAddModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormHindiName(product.hindiName || '');
    setFormDesc(product.description);
    setFormPrice(String(product.price));
    setFormCost(String(product.costToProduce || 50));
    setFormUnit(product.unit);
    setFormCategory(product.category);
    setFormStock(String(product.stockQuantity));
    setFormIsVeg(product.isVeg);
    setFormImageUrl(product.imageUrl);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        hindiName: formHindiName,
        description: formDesc,
        price: Number(formPrice),
        costToProduce: Number(formCost),
        unit: formUnit,
        category: formCategory,
        stockQuantity: Number(formStock),
        isVeg: formIsVeg,
        imageUrl: formImageUrl,
      });
      setToastText(`Updated "${formName}" successfully!`);
    } else {
      addProduct({
        storeId: currentStore.id,
        name: formName,
        hindiName: formHindiName,
        description: formDesc,
        price: Number(formPrice),
        costToProduce: Number(formCost),
        unit: formUnit,
        category: formCategory,
        stockQuantity: Number(formStock),
        isVeg: formIsVeg,
        imageUrl: formImageUrl,
        status: 'available',
        rating: 5.0,
        tags: ['Freshly Added']
      });
      setToastText(`Added "${formName}" to storefront!`);
    }

    setIsAddModalOpen(false);
    setTimeout(() => setToastText(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from your catalog?`)) {
      deleteProduct(id);
      setToastText(`Removed "${name}" from inventory.`);
      setTimeout(() => setToastText(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toastText && (
        <div className="fixed top-20 right-6 z-50 bg-forest-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-gold-400 animate-fade-in text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-gold-300" />
          <span>{toastText}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest-50 text-forest-800 rounded-full text-xs font-bold border border-forest-200 mb-2">
            <Package className="w-3.5 h-3.5 text-forest-700" />
            <span>Live Stock & Product Manager</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-forest-950">
            Menu & Inventory Control
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Toggle item availability with 1-click. Changes reflect immediately on your customer QR storefront.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/store/${currentStore.id}`}
            target="_blank"
            className="px-4 py-2.5 bg-sand-100 hover:bg-sand-200 text-forest-950 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-sand-300 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Menu</span>
          </Link>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4 text-gold-300" />
            <span>+ Add New Item</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-sand-200 shadow-soft flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search items by English or Hindi name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-sand-50 rounded-xl border border-sand-200 text-xs sm:text-sm focus:outline-none focus:border-forest-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-charcoal-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-sand-50 rounded-xl border border-sand-200 text-xs font-semibold text-charcoal-800 focus:outline-none"
          >
            <option value="all">All Statuses ({currentStoreProducts.length})</option>
            <option value="available">Available Only</option>
            <option value="sold_out">Sold Out Only</option>
            <option value="tomorrow_only">Tomorrow Only</option>
          </select>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-sand-50/70 border-b border-sand-200 text-charcoal-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-5">Product Details</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Selling Price</th>
                <th className="py-3.5 px-5">Cost & Margin</th>
                <th className="py-3.5 px-5">Stock Qty</th>
                <th className="py-3.5 px-5">Availability Status (Live)</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {filteredProducts.map(product => {
                const profit = product.costToProduce ? product.price - product.costToProduce : null;
                const margin = product.costToProduce ? Math.round((profit! / product.price) * 100) : null;

                return (
                  <tr key={product.id} className="hover:bg-sand-50/50 transition">
                    
                    {/* Image and Name */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-sand-300 shrink-0" 
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${product.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
                            <div className="font-bold text-xs text-charcoal-900 truncate">
                              {product.name}
                            </div>
                          </div>
                          {product.hindiName && (
                            <div className="text-[11px] text-forest-800 font-medium">
                              {product.hindiName}
                            </div>
                          )}
                          <div className="text-[10px] text-charcoal-400 truncate max-w-xs">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-5 text-charcoal-700 font-medium">
                      <span className="px-2 py-0.5 bg-sand-100 rounded-md text-[11px]">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-5">
                      <span className="font-bold text-sm text-forest-900">₹{product.price}</span>
                      <span className="text-[10px] text-charcoal-400 block">/ {product.unit}</span>
                    </td>

                    {/* Cost & Margin */}
                    <td className="py-3.5 px-5">
                      {profit !== null ? (
                        <div>
                          <span className="text-emerald-700 font-bold">+{margin}%</span>
                          <span className="text-[10px] text-charcoal-400 block">₹{profit} profit/unit</span>
                        </div>
                      ) : (
                        <span className="text-charcoal-400">-</span>
                      )}
                    </td>

                    {/* Stock Quantity */}
                    <td className="py-3.5 px-5 font-bold text-charcoal-800">
                      {product.stockQuantity} {product.unit}s
                    </td>

                    {/* Status Toggle Switcher */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateProductStatus(product.id, 'available')}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                            product.status === 'available'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-sand-100 text-charcoal-600 hover:bg-sand-200'
                          }`}
                        >
                          Available
                        </button>

                        <button
                          onClick={() => updateProductStatus(product.id, 'sold_out')}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                            product.status === 'sold_out'
                              ? 'bg-red-600 text-white shadow-xs'
                              : 'bg-sand-100 text-charcoal-600 hover:bg-sand-200'
                          }`}
                        >
                          Sold Out
                        </button>

                        <button
                          onClick={() => updateProductStatus(product.id, 'tomorrow_only')}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                            product.status === 'tomorrow_only'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-sand-100 text-charcoal-600 hover:bg-sand-200'
                          }`}
                        >
                          Tomorrow
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 text-charcoal-500 hover:text-forest-800 hover:bg-sand-100 rounded-lg transition"
                        title="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 text-charcoal-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-sand-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-sand-200 mb-4">
              <h3 className="font-bold text-lg text-forest-950">
                {editingProduct ? 'Edit Menu Product' : 'Add New Dish or Product'}
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-700 hover:bg-sand-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-charcoal-800 block mb-1">Item Name (English)*</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Special Dal Makhani Thali"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 font-semibold focus:outline-none focus:border-forest-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-charcoal-800 block mb-1">Hindi Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. दाल मखनी थाली"
                    value={formHindiName}
                    onChange={(e) => setFormHindiName(e.target.value)}
                    className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 font-semibold focus:outline-none focus:border-forest-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-charcoal-800 block mb-1">Description / Key Ingredients</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Slow-cooked overnight in pure desi ghee, served with basmati rice..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-charcoal-800 block mb-1">Selling Price (₹)*</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 font-bold text-forest-900 focus:outline-none focus:border-forest-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-charcoal-800 block mb-1">Cost to Make (₹)</label>
                  <input
                    type="number"
                    value={formCost}
                    onChange={(e) => setFormCost(e.target.value)}
                    className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-charcoal-800 block mb-1">Unit</label>
                  <input
                    type="text"
                    placeholder="plate, kg, jar"
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-charcoal-800 block mb-1">Category</label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-charcoal-800 block mb-1">Daily Stock Quantity</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-charcoal-800 block mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600 font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isVegCheck"
                  checked={formIsVeg}
                  onChange={(e) => setFormIsVeg(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-forest-500"
                />
                <label htmlFor="isVegCheck" className="font-semibold text-charcoal-800 cursor-pointer">
                  Pure Vegetarian Item
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-sand-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-sand-300 font-semibold text-charcoal-600 hover:bg-sand-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl font-bold shadow-md transition"
                >
                  {editingProduct ? 'Update Product' : 'Add to Catalog'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
