import { useState } from 'react';
import { ShoppingCart, ShoppingBag, ShieldAlert, Sparkles, AlertCircle, Trash2, Check, CreditCard } from 'lucide-react';
import { StoreItem } from '../types';
import { STORE_ITEMS } from '../data';

interface StoreSectionProps {
  creditBalance: number;
  setCreditBalance: (bal: number) => void;
  inventoryItemIds: string[];
  addInventoryItem: (id: string) => void;
}

export default function StoreSection({
  creditBalance,
  setCreditBalance,
  inventoryItemIds,
  addInventoryItem
}: StoreSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<{ item: StoreItem; count: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [purchaseHistoryMsg, setPurchaseHistoryMsg] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'skins', label: 'Cosmetic Skins' },
    { id: 'weapons', label: 'Weapon Wraps' },
    { id: 'passes', label: 'Access Passes' },
    { id: 'hardware', label: 'Hardware Gears' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? STORE_ITEMS
    : STORE_ITEMS.filter(item => item.category === selectedCategory);

  const addToCart = (item: StoreItem) => {
    setCart(prevCart => {
      const existing = prevCart.find(c => c.item.id === item.id);
      if (existing) {
        return prevCart.map(c => c.item.id === item.id ? { ...c, count: c.count + 1 } : c);
      }
      return [...prevCart, { item, count: 1 }];
    });
    setPurchaseHistoryMsg(null);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(c => c.item.id !== itemId));
  };

  // Convert string price to float amount
  const parsePrice = (priceStr: string) => {
    return parseFloat(priceStr.replace('$', '').replace(',', ''));
  };

  const getCartTotal = () => {
    return cart.reduce((acc, current) => {
      return acc + (parsePrice(current.item.price) * current.count);
    }, 0);
  };

  const handleCheckout = () => {
    const totalCost = getCartTotal();
    if (totalCost > creditBalance) {
      alert('INSUFFICIENT AETHER CREDITS PROTOCOL! Earn more XP points in Combat challenges or reset specs to gain credits.');
      return;
    }

    // Deduct and unlock items in inventory!
    setCreditBalance(creditBalance - totalCost);
    cart.forEach(c => {
      addInventoryItem(c.item.id);
    });
    
    setCart([]);
    setIsCartOpen(false);
    setPurchaseHistoryMsg(`SECURE LEDGER: Successfully acquired ${cart.length} modules! System loadout expanded.`);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-1">
      {/* Wallet balance display banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-[#0e0c18] border border-cyan-400/20 rounded-3xl p-6 shrink-0 relative overflow-hidden">
        {/* Decorative scanline background */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40"></div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_10%_10%,#3b82f6_0%,transparent_50%)]"></div>

        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-[#ededf0]">Neural Item Exchange</h2>
            <p className="text-[10px] text-slate-400">Trade digital weapon wraps, authorization credentials, and hardware cores</p>
          </div>
        </div>

        {/* Credit bank and toggle cart button */}
        <div className="flex gap-4 mt-4 sm:mt-0 items-center justify-end w-full sm:w-auto">
          <div className="bg-black/50 border border-white/5 rounded-2xl px-5 py-2.5 text-right font-mono">
            <p className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Credits Wallet Balance</p>
            <p className="text-lg font-black text-cyan-400 flex items-center gap-1.5 justify-end">
              <span className="text-xs text-cyan-500/50">A$</span> {creditBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="px-5 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors flex items-center gap-2 relative cursor-pointer font-bold text-xs uppercase"
          >
            <ShoppingCart className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Cart Modules</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] bg-purple-500 rounded-full font-black text-white flex items-center justify-center border-2 border-[#020204]">
                {cart.reduce((s, c) => s + c.count, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Categories navbar selectors */}
      <div className="flex gap-2 overflow-x-auto pb-1 shrink-0 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-all border shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-purple-500 border-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {purchaseHistoryMsg && (
        <div className="bg-emerald-950/10 border border-emerald-500/25 rounded-2xl p-4 text-xs font-mono text-emerald-400 flex items-center gap-2 shrink-0">
          <Check className="w-4 h-4 text-emerald-400 shadow-[0_0_10px_#10b981]" />
          <span>{purchaseHistoryMsg}</span>
        </div>
      )}

      {/* Items Grid Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isPurchased = inventoryItemIds.includes(item.id);
          
          return (
            <div
              key={item.id}
              className="bg-[#0b0b13] border border-white/5 rounded-[2rem] p-5 shadow-lg group hover:border-[#1e1e2f] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image thumbnail and tag overlay */}
              <div className="w-full h-36 rounded-2xl mb-4 bg-black/40 overflow-hidden relative border border-white/5">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                <span
                  style={{ color: item.rarityColor, borderColor: `${item.rarityColor}30`, backgroundColor: `${item.rarityColor}10` }}
                  className="absolute top-3 left-3 text-[8px] border font-black uppercase tracking-wider px-2 py-0.5 rounded"
                >
                  {item.rarity}
                </span>

                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 text-center">
                    <span className="text-rose-400 text-[10px] font-black uppercase tracking-widest border border-rose-500/30 px-3 py-1 bg-rose-950/30 rounded-full flex gap-1 items-center">
                      <AlertCircle className="w-3 h-3" /> DEPLETED BLOCK
                    </span>
                  </div>
                )}
              </div>

              {/* Specs & detail information hover section */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xs font-black text-slate-100 uppercase tracking-tight line-clamp-1">
                      {item.name}
                    </h3>
                    <span className="text-xs font-mono font-bold text-cyan-400 shrink-0">
                      {item.price}
                    </span>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 mt-1 lines-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Micro Specs detail layout */}
                  {item.stats && item.stats.length > 0 && (
                    <div className="mt-3.5 space-y-1.5 bg-black/40 rounded-xl p-2.5 border border-white/5">
                      {item.stats.map((stat, idx) => (
                        <div key={idx} className="flex justify-between text-[8px] font-mono leading-none">
                          <span className="text-slate-500">{stat.label}</span>
                          <span className="text-purple-300 font-bold">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add To Cart checkout controller */}
                <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[8px] uppercase font-mono tracking-widest text-slate-500">
                    Category: {item.category}
                  </span>

                  {isPurchased ? (
                    <span className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[8.5px] font-black uppercase rounded-lg flex items-center gap-1 font-mono shadow-[0_0_8px_rgba(16,185,129,0.1)]">
                      <Check className="w-3 h-3" /> Unlocked
                    </span>
                  ) : item.inStock ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1.5 bg-white text-black hover:bg-cyan-400 transition-all font-black uppercase text-[10px] rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      Buy Item
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-1.5 bg-white/5 text-slate-600 border border-transparent rounded-xl text-[10px] font-bold uppercase"
                    >
                      Depleted
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Cart checkout Slide / Overlay Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-[#020204]/90 backdrop-blur-sm flex justify-end z-50">
          <div className="w-full max-w-md bg-[#080811] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl relative">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-purple-400" />
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#eeeef2]">Checkout Assembly</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Cart Items List */}
              <div className="mt-6 space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-10">
                    <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs italic text-slate-500">Cart assembly database currently empty.</p>
                  </div>
                ) : (
                  cart.map(({ item, count }) => (
                    <div key={item.id} className="flex items-center gap-3.5 bg-black/40 border border-white/5 rounded-xl p-3 justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{item.name}</h4>
                          <p className="text-[10px] text-cyan-400 font-mono mt-0.5">{item.price} <span className="text-slate-500">x{count}</span></p>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 hover:bg-white/5 hover:text-rose-400 transition-colors text-slate-500 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Calculations and finalize order button */}
            <div className="pt-6 border-t border-white/5 space-y-4 font-mono">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Transaction Subtotal</span>
                  <span className="text-slate-300">A$ {getCartTotal().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Neural Network Gas Fees</span>
                  <span className="text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                  <span className="text-slate-400 font-bold uppercase">Grand Total</span>
                  <span className="text-cyan-400 font-black">A$ {getCartTotal().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              {cart.length > 0 ? (
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-cyan-400 hover:bg-cyan-500 text-[#020204] font-black uppercase text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                >
                  <CreditCard className="w-4 h-4" /> Authorize Secure Ledger Transfer
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-4 bg-white/5 text-slate-600 border border-transparent rounded-xl text-xs font-black uppercase text-center"
                >
                  Select Matrix Items First
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
