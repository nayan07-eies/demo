import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ShoppingCart, Store, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const StorefrontLayout = () => {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-600">
      {/* Frosted Glass Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-tr from-cyan-400 to-blue-600 p-2 rounded-xl group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300">
                <Store className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                NEXUS<span className="text-cyan-500">GEAR</span>
              </span>
            </Link>

            <nav className="flex items-center gap-6">
              <NavLink to="/" className={({ isActive }) => `text-sm font-bold uppercase tracking-wider transition-colors hover:text-cyan-500 ${isActive ? 'text-cyan-500' : 'text-slate-600'}`}>
                Catalog
              </NavLink>
              
              <div className="w-px h-6 bg-slate-200 mx-2"></div>
              
              <div className="flex items-center gap-4">
                <NavLink to="/cart" className={({ isActive }) => `relative p-2 rounded-full transition-all hover:bg-slate-100 ${isActive ? 'text-cyan-500' : 'text-slate-600'}`}>
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-cyan-500 text-white text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                      {totalItems}
                    </span>
                  )}
                </NavLink>
                <NavLink to="/admin" className="p-2 rounded-full text-slate-600 hover:text-cyan-500 hover:bg-slate-100 transition-all">
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

      <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-tr from-cyan-400 to-blue-600 p-2 rounded-xl">
                  <Store className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black text-slate-900 tracking-tight uppercase">NexusGear</span>
              </Link>
              <p className="text-slate-500 leading-relaxed max-w-sm mb-8">
                Providing high-performance gear with next-gen aesthetics. Engineered for excellence, designed for the future.
              </p>
            </div>
            
            <div className="md:col-span-2 md:col-start-7">
              <h4 className="text-cyan-500 font-black text-xs uppercase tracking-widest mb-8">Navigation</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-slate-600 hover:text-cyan-500 font-medium transition-colors">Catalog</Link></li>
                <li><Link to="/cart" className="text-slate-600 hover:text-cyan-500 font-medium transition-colors">Storage</Link></li>
                <li><Link to="/login" className="text-slate-600 hover:text-cyan-500 font-medium transition-colors">Terminal</Link></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-cyan-500 font-black text-xs uppercase tracking-widest mb-8">Support</h4>
              <ul className="space-y-4">
                <li><span className="text-slate-600 hover:text-cyan-500 font-medium cursor-pointer transition-colors">Protocol</span></li>
                <li><span className="text-slate-600 hover:text-cyan-500 font-medium cursor-pointer transition-colors">Security</span></li>
                <li><span className="text-slate-600 hover:text-cyan-500 font-medium cursor-pointer transition-colors">Contact</span></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-500">
            <p>&copy; 2026 NexusGear. All systems operational.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
