import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await api.getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(true);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black uppercase text-red-500 mb-4">Transmission Error</h2>
        <p className="text-slate-500">Order details could not be verified.</p>
      </div>
    );
  }

  if (!order) {
    return <div className="text-center py-20 animate-pulse text-slate-500 font-bold uppercase tracking-widest">Verifying Transaction...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full mb-8">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      
      <h1 className="text-4xl font-black uppercase tracking-widest text-slate-900 dark:text-white mb-4">Procurement Successful</h1>
      <p className="text-lg text-slate-500 mb-8">Your transaction has been securely logged into the network.</p>

      <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 mb-12 text-left shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 dark:border-slate-800 pb-6 mb-6 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Transaction ID</p>
            <p className="text-2xl font-black text-cyan-500 tracking-wider">{order.id}</p>
          </div>
          <div className="md:text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Status</p>
            <span className="inline-block px-3 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-cyan-100 dark:border-cyan-900/50">
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4" /> Routing Destination
            </h3>
            <p className="text-slate-900 dark:text-white font-medium">{order.shippingAddress.name}</p>
            <p className="text-slate-600 dark:text-slate-400">{order.shippingAddress.address}</p>
            <p className="text-slate-600 dark:text-slate-400">{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Ledger Summary</h3>
            <p className="text-slate-600 dark:text-slate-400">Total Items: {order.items.length}</p>
            <p className="text-slate-900 dark:text-white font-black text-xl mt-2">Total: ₹{order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-white transition-all">
        Return to Nexus Catalog <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default OrderSuccess;