import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, AlertCircle } from 'lucide-react';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white rounded-xl h-80 shadow-sm border"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-red-900 mb-2">Oops! Something went wrong</h3>
        <p className="text-red-600 mb-6">{error}</p>
        <button
          onClick={() => loadProducts()}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-2 flex items-center gap-3">
          <span className="w-8 h-1 bg-cyan-500 rounded-full"></span> New Drops
        </h1>
        <p className="text-slate-500 font-medium ml-11">Next-gen aesthetics for the modern world.</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 items-stretch">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)] transition-all duration-500">
            <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden relative bg-slate-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md border border-slate-100 text-[10px] font-black uppercase tracking-widest text-cyan-600 rounded-full shadow-sm">
                  {product.category}
                </span>
              </div>
            </Link>
            
            <div className="p-8 flex flex-col grow">
              <div className="mb-8">
                <Link to={`/product/${product.id}`}>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-cyan-500 transition-colors line-clamp-1">{product.name}</h2>
                </Link>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="text-[9px] font-black text-pink-600 uppercase tracking-widest border border-pink-200 bg-pink-50 px-2 py-0.5 rounded-full">Low Stock</span>
                  )}
                </div>
                <p className="mt-4 text-slate-500 text-sm line-clamp-2 leading-relaxed font-medium">{product.description}</p>
              </div>
              
              <div className="mt-auto">
                <button
                  onClick={() => addItem(product)}
                  disabled={product.stock <= 0}
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 ${
                    product.stock > 0 
                      ? 'bg-slate-900 text-white hover:bg-cyan-500 hover:text-slate-950 shadow-md hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{product.stock > 0 ? 'Initialize' : 'Offline'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
