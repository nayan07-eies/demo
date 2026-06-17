import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) => 
    `flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-gray-300'}`;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <Link to="/" className="text-xl font-bold tracking-wider hover:text-blue-400 transition-colors">ADMIN PANEL</Link>
        </div>

        <nav className="grow p-4 space-y-2">
          <NavLink to="/admin" end className={navLinkClass}>
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/products" className={navLinkClass}>
            <Package className="w-5 h-5" />
            <span>Products</span>
          </NavLink>
          <NavLink to="/admin/orders" className={navLinkClass}>
            <ShoppingBag className="w-5 h-5" />
            <span>Orders</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 w-full text-left rounded-lg hover:bg-red-900/50 text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="grow overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};
