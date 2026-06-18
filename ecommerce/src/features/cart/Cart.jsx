import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-cyan-900/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <ShoppingBag className="w-20 h-20 text-cyan-200 mx-auto mb-8" />
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Storage Empty</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-12 max-w-sm mx-auto uppercase tracking-widest text-[10px]">Your active procurement buffer is currently uninitialized.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cyan-500 hover:text-slate-900 dark:hover:text-white transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            <span>Initialize Catalog</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto text-slate-600 dark:text-slate-300">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase mb-12 flex items-center gap-3">
        <span className="w-8 h-1 bg-cyan-500 rounded-full"></span> Procurement Buffer
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600 mb-1 block">{item.category}</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.name}</h3>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-2 text-slate-400 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-4 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 bg-white dark:bg-slate-900 rounded-lg text-slate-600 dark:text-slate-300 shadow-sm hover:text-cyan-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-black text-slate-900 dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="p-1.5 bg-white dark:bg-slate-900 rounded-lg text-slate-600 dark:text-slate-300 shadow-sm hover:text-cyan-600 transition-colors disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs text-slate-400 font-bold mt-1">₹{item.price.toFixed(2)} / UNIT</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white sticky top-28 shadow-2xl shadow-cyan-900/20">
            <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-cyan-400">Order Summary</h3>
            <div className="space-y-6 mb-8 text-slate-300 font-medium">
              <div className="flex justify-between items-center pb-6 border-b border-slate-700/50">
                <span>Subtotal</span>
                <span className="text-white font-bold">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-slate-700/50">
                <span>Shipping</span>
                <span className="text-cyan-400 font-bold">Complimentary</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg">Total</span>
                <span className="text-4xl font-black text-white">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full py-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] active:scale-[0.98] flex items-center justify-center gap-3">
              <span>Execute Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="mt-8 text-center text-slate-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Encrypted Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
