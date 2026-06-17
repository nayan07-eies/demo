import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border shadow-sm">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto text-slate-600">
      <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-12 flex items-center gap-3">
        <span className="w-8 h-1 bg-cyan-500 rounded-full"></span> Active Storage <span className="text-slate-400 text-xl ml-4">[{items.length}]</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="group bg-white p-6 rounded-2xl border border-slate-200 grid grid-cols-[120px_1fr_auto] items-center gap-8 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-900/5 transition-all">
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90" />
              </div>
              
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                  <p className="text-cyan-600 text-[10px] font-black uppercase tracking-widest mt-1">{item.category}</p>
                </div>
                
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:text-cyan-600 text-slate-500 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-slate-900 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="p-2 hover:text-cyan-600 text-slate-500 disabled:opacity-30 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="flex items-center gap-2 text-slate-400 hover:text-pink-600 transition-colors font-bold uppercase tracking-widest text-[10px]">
                    <Trash2 className="w-4 h-4" />
                    <span>Purge</span>
                  </button>
                </div>
              </div>

              <div className="text-right flex flex-col justify-center h-full">
                <p className="text-2xl font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-xs text-slate-400 font-bold mt-1">${item.price.toFixed(2)} / UNIT</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-32">
            <h2 className="text-lg font-black uppercase tracking-widest mb-8 text-cyan-600">Data Summary</h2>
            
            <div className="space-y-4 mb-8 text-slate-500 font-medium">
              <div className="flex justify-between items-center text-sm">
                <span>Subtotal</span>
                <span className="text-slate-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Network Routing</span>
                <span className="text-cyan-600 uppercase font-bold">Complimentary</span>
              </div>
              <div className="h-px bg-slate-100 my-6"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-black uppercase tracking-widest text-slate-900">Total</span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-cyan-500 hover:text-slate-900 shadow-md hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300">
              Execute Checkout
            </button>
            
            <p className="mt-8 text-center text-slate-400 text-[10px] font-black uppercase tracking-widest leading-relaxed">
              Global encrypted shipping<br/>on all domestic nodes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
