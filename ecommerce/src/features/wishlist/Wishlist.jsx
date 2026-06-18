import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

const Wishlist = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addItem } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-cyan-900/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <Heart className="w-20 h-20 text-pink-200 mx-auto mb-8" />
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Wishlist Empty</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-12 max-w-sm mx-auto uppercase tracking-widest text-[10px]">Your collection of future procurement is currently unpopulated.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cyan-500 hover:text-slate-900 dark:hover:text-white transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto text-slate-600 dark:text-slate-300">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase mb-12 flex items-center gap-3">
        <span className="w-8 h-1 bg-pink-500 rounded-full"></span> Saved Gear <span className="text-slate-400 text-xl ml-4">[{wishlistItems.length}]</span>
      </h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
        {wishlistItems.map((product) => (
          <div key={product.id} className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-pink-500/50 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.15)] transition-all duration-500">
            <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden relative bg-slate-100 dark:bg-slate-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute top-4 right-4">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product);
                  }}
                  className="p-3 bg-white/90 backdrop-blur-md border border-pink-100 rounded-full text-pink-500 shadow-sm hover:scale-110 active:scale-95 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </Link>
            
            <div className="p-8 flex flex-col grow">
              <div className="mb-8">
                <Link to={`/product/${product.id}`}>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-pink-500 transition-colors line-clamp-1">{product.name}</h2>
                </Link>
                <div className="mt-3">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">₹{product.price.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <button
                  onClick={() => addItem(product)}
                  disabled={product.stock <= 0}
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 ${
                    product.stock > 0 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-500 hover:text-slate-950 shadow-md hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{product.stock > 0 ? 'Move to Cart' : 'Offline'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
