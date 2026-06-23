import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { api } from '../../services/api';
import { ChevronLeft, ShieldCheck, CreditCard, MapPin, Loader2 } from 'lucide-react';

const Checkout = () => {
  const {items: cartItems, clearCart } = useCart(); // Assuming you have a way to get cart items
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvv: ''
  });

  // Calculate total (assuming item structure has price and quantity)
  const cartTotal = cartItems?.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0) || 0;

  // Redirect if cart is empty
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-black uppercase tracking-widest text-slate-900 dark:text-white mb-4">Cart Empty</h2>
        <p className="text-slate-500 mb-8">No items staged for procurement.</p>
        <Link to="/" className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-cyan-600 transition-colors">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const orderData = {
        items: cartItems,
        total: cartTotal,
        shippingAddress: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          zip: formData.zip
        }
        // Never save actual credit card data to localStorage in a real app!
      };

      const order = await api.placeOrder(orderData);
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error("Checkout failed:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/cart" className="inline-flex items-center text-slate-400 hover:text-cyan-500 mb-8 transition-colors font-bold uppercase tracking-widest text-xs">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Return to Cart
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form Area */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black uppercase tracking-widest text-slate-900 dark:text-white">Secure Checkout</h1>
            <div className="flex gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <span className={step === 1 ? 'text-cyan-500' : ''}>01 Node Details</span>
              <span>/</span>
              <span className={step === 2 ? 'text-cyan-500' : ''}>02 Encryption Protocol</span>
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleShippingSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-6 text-slate-900 dark:text-white">
                <MapPin className="w-6 h-6 text-cyan-500" />
                <h2 className="text-xl font-bold uppercase tracking-widest">Delivery Coordinates</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Recipient Designation</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500" placeholder="Full Name" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Sector Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500" placeholder="Street Address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">City Node</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500" placeholder="City" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Zone Code</label>
                    <input required type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500" placeholder="Zip / Postal" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full mt-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-white transition-all">
                Proceed to Payment
              </button>
            </form>
          ) : (
            <form onSubmit={handlePaymentSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
              {isProcessing && (
                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-white">
                  <Loader2 className="w-12 h-12 animate-spin text-cyan-500 mb-4" />
                  <p className="font-bold uppercase tracking-widest animate-pulse">Encrypting Transaction...</p>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6 text-slate-900 dark:text-white">
                <CreditCard className="w-6 h-6 text-cyan-500" />
                <h2 className="text-xl font-bold uppercase tracking-widest">Payment Protocol</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Card Sequence</label>
                  <input required type="text" name="cardNumber" maxLength="16" value={formData.cardNumber} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Valid Thru</label>
                    <input required type="text" name="expiry" maxLength="5" value={formData.expiry} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">CVC</label>
                    <input required type="text" name="cvv" maxLength="3" value={formData.cvv} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono" placeholder="123" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setStep(1)} disabled={isProcessing} className="px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  Back
                </button>
                <button type="submit" disabled={isProcessing} className="flex-1 py-4 bg-cyan-500 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-cyan-600 transition-all flex justify-center items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Authorize ₹{cartTotal.toFixed(2)}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6">Procurement Summary</h3>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {cartItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-800 last:border-0">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white">₹{(item.price * (item.quantity || 1)).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between text-slate-500 uppercase tracking-widest text-xs font-bold">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cyan-500 uppercase tracking-widest text-xs font-bold">
                <span>Network Fee (Shipping)</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-slate-900 dark:text-white uppercase tracking-widest text-xl font-black mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;