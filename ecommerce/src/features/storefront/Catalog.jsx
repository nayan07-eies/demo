import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { AlertCircle, Search, SlidersHorizontal, ArrowUpDown, ShoppingCart, Heart } from 'lucide-react';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
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
    loadProducts();
  }, [retryCount]);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'low-high') return a.price - b.price;
      if (sortBy === 'high-low') return b.price - a.price;
      return 0;
    });

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-40 bg-white dark:bg-slate-900 rounded-2xl animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white dark:bg-slate-900 rounded-xl h-96 shadow-sm border"></div>
          ))}
        </div>
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
          onClick={() => setRetryCount(prev => prev + 1)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase mb-2 flex items-center gap-3">
            <span className="w-8 h-1 bg-cyan-500 rounded-full"></span> New Drops
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium ml-11">Next-gen aesthetics for the modern world.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 lg:w-2/3">
          <div className="relative grow group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium"
            />
          </div>
          <div className="relative group min-w-[200px]">
            <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium appearance-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex items-center gap-2 mr-4 text-slate-400">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-xs font-black uppercase tracking-widest">Filters</span>
        </div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 shadow-lg shadow-slate-200'
                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-900 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 items-stretch">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)] transition-all duration-500 relative">
            <button 
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 z-10 p-3 rounded-xl backdrop-blur-md transition-all duration-300 ${
                isInWishlist(product.id)
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-200'
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-pink-500 border border-slate-100 dark:border-slate-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>

            <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md border border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-cyan-600 rounded-full shadow-sm">
                  {product.category}
                </span>
              </div>
            </Link>
            
            <div className="p-8 flex flex-col grow">
              <div className="mb-8">
                <Link to={`/product/${product.id}`}>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-1">{product.name}</h2>
                </Link>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">₹{product.price.toFixed(2)}</span>
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="text-[9px] font-black text-pink-600 uppercase tracking-widest border border-pink-200 bg-pink-50 px-2 py-0.5 rounded-full">Low Stock</span>
                  )}
                </div>
                <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed font-medium">{product.description}</p>
              </div>
              
              <div className="mt-auto">
                <button
                  onClick={() => addItem(product)}
                  disabled={product.stock <= 0}
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 ${
                    product.stock > 0 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-500 dark:hover:bg-cyan-500 shadow-md hover:shadow-[0_0_20px_rgba(255,107,53,0.4)]' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{product.stock > 0 ? 'Initialize Procurement' : 'Offline'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No products found</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-6 text-cyan-500 font-bold uppercase tracking-widest text-xs hover:text-cyan-600 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;
