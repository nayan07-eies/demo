import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Store, User, ShoppingCart, Heart, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';

export const StorefrontLayout = () => {
  const { isAuthenticated, user } = useAuth();
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-600 dark:text-slate-300">
      {/* Frosted Glass Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 dark:bg-slate-900/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-tr from-cyan-400 to-blue-600 p-2 rounded-xl group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300">
                <Store className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                NEXUS<span className="text-cyan-500">GEAR</span>
              </span>
            </Link>

            <nav className="flex items-center gap-6">
              <NavLink to="/" className={({ isActive }) => `text-sm font-bold uppercase tracking-wider transition-colors hover:text-cyan-500 ${isActive ? 'text-cyan-500' : 'text-slate-600 dark:text-slate-300'}`}>
                Catalog
              </NavLink>
              
              <div className="w-px h-6 bg-slate-200 mx-2"></div>
              
              <div className="flex items-center gap-4">
                {!isAuthPage && (
                  <>
                    <NavLink to="/wishlist" className={({ isActive }) => `relative p-2 rounded-full transition-all hover:bg-slate-100 dark:hover:bg-slate-800 ${isActive ? 'text-cyan-500' : 'text-slate-600 dark:text-slate-300'}`}>
                      <Heart className="w-5 h-5" />
                      {wishlistItems.length > 0 && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-cyan-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white">
                          {wishlistItems.length}
                        </span>
                      )}
                    </NavLink>
                    
                    <NavLink to="/cart" className={({ isActive }) => `relative p-2 rounded-full transition-all hover:bg-slate-100 dark:hover:bg-slate-800 ${isActive ? 'text-cyan-500' : 'text-slate-600 dark:text-slate-300'}`}>
                      <ShoppingCart className="w-5 h-5" />
                      {totalItems > 0 && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-cyan-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white">
                          {totalItems}
                        </span>
                      )}
                    </NavLink>
                  </>
                )}

                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-slate-600 dark:text-slate-300 dark:text-slate-300 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:bg-slate-800 transition-all"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <NavLink 
                  to={isAuthenticated ? (user?.role === 'admin' ? '/admin' : '/account') : '/login'} 
                  className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <User className="w-5 h-5" />
                </NavLink>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10 dark:bg-slate-900/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-tr from-cyan-400 to-blue-600 p-2 rounded-xl">
                  <Store className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">NexusGear</span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mb-8">
                Providing high-performance gear with next-gen aesthetics. Engineered for excellence, designed for the future.
              </p>
            </div>
            
            <div className="md:col-span-2 md:col-start-7">
              <h4 className="text-cyan-500 font-black text-xs uppercase tracking-widest mb-8">Navigation</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 font-medium transition-colors">Catalog</Link></li>
                {!isAuthPage && (
                  <>
                    <li><Link to="/wishlist" className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 font-medium transition-colors">Saved Gear</Link></li>
                    <li><Link to="/cart" className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 font-medium transition-colors">Storage</Link></li>
                  </>
                )}
                <li><Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 font-medium transition-colors">Terminal</Link></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-cyan-500 font-black text-xs uppercase tracking-widest mb-8">Support</h4>
              <ul className="space-y-4">
                <li><span className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 font-medium cursor-pointer transition-colors">Protocol</span></li>
                <li><span className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 font-medium cursor-pointer transition-colors">Security</span></li>
                <li><span className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 font-medium cursor-pointer transition-colors">Contact</span></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            <p>&copy; 2026 NexusGear. All systems operational.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
