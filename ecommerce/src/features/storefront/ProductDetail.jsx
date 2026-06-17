import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  const loadProduct = async (signal) => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProductById(id);
      if (signal && !signal.isMounted) return;
      if (data) {
        setProduct(data);
      } else {
        navigate('/');
      }
    } catch (err) {
      if (signal && !signal.isMounted) return;
      setError(err instanceof Error ? err.message : 'Failed to load product details.');
    } finally {
      if (!signal || signal.isMounted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const signal = { isMounted: true };
    loadProduct(signal);
    return () => {
      signal.isMounted = false;
    };
  }, [id, navigate]);

  if (loading) {
    return <div className="animate-pulse flex flex-col md:flex-row gap-12">
      <div className="md:w-1/2 aspect-square bg-gray-200 rounded-2xl"></div>
      <div className="md:w-1/2 space-y-4">
        <div className="h-8 bg-gray-200 w-3/4"></div>
        <div className="h-4 bg-gray-200 w-1/4"></div>
        <div className="h-32 bg-gray-200 w-full"></div>
      </div>
    </div>;
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100 max-w-2xl mx-auto">
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button
          onClick={() => loadProduct()}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto text-slate-600">
      <Link to="/" className="inline-flex items-center text-slate-400 hover:text-cyan-500 mb-12 transition-colors font-bold uppercase tracking-widest text-xs">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Return to Nexus
      </Link>

      <div className="grid grid-cols-12 gap-12 lg:gap-24">
        {/* Image Section */}
        <div className="col-span-12 lg:col-span-7">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-white border border-slate-200 shadow-2xl shadow-cyan-900/5 relative group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-cyan-50 text-cyan-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 border border-cyan-100">
              {product.category}
            </span>
            <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase leading-[1.1]">{product.name}</h1>
            <div className="flex items-center gap-4 mb-10">
              <p className="text-4xl font-black text-slate-900">${product.price.toFixed(2)}</p>
              {product.stock > 0 ? (
                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-green-200">Operational</span>
              ) : (
                <span className="px-3 py-1 bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-pink-200">Offline</span>
              )}
            </div>

            <div className="prose prose-lg text-slate-500 font-medium mb-12 leading-relaxed max-w-none">
              <p>{product.description}</p>
            </div>

            <div className="mb-16">
              <button
                onClick={() => addItem(product)}
                disabled={product.stock <= 0}
                className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center space-x-3 transition-all duration-300 shadow-xl ${
                  product.stock > 0 
                    ? 'bg-slate-900 text-white hover:bg-cyan-500 hover:text-slate-950 shadow-slate-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-[0.98]' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.stock > 0 ? 'Initialize Procurement' : 'Currently Unavailable'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:gap-8 py-10 border-t border-slate-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                <Truck className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-tight">Node<br/>Transfer</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                <ShieldCheck className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-tight">Secure<br/>Protocol</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                <RefreshCcw className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-tight">Data<br/>Reversal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
