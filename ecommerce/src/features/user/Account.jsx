import { useAuth } from '../../context/AuthContext';
import { User as UserIcon, Mail, Package, ShieldCheck, LogOut } from 'lucide-react';

const Account = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-5xl mx-auto text-slate-600 dark:text-slate-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">User Profile</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Manage your account and view order history.</p>
        </div>
        <button 
          onClick={logout}
          className="inline-flex items-center space-x-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-cyan-900/5 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-950 rounded-full flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-800 shadow-inner">
              <UserIcon className="w-12 h-12 text-cyan-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{user?.name}</h2>
            <div className="flex items-center justify-center gap-2 mt-2 mb-6">
              <Mail className="w-4 h-4 text-slate-400" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">{user?.email}</p>
            </div>
            <span className="px-4 py-1.5 bg-cyan-50 text-cyan-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-cyan-100">
              {user?.role} Account
            </span>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-black uppercase tracking-widest text-cyan-600 mb-6">Recent Orders</h3>
          
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center py-16">
            <Package className="w-16 h-16 text-slate-200 mb-4" />
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No active orders</h4>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">You haven't placed any orders yet. Visit the catalog to initialize a new procurement.</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
               <ShieldCheck className="w-8 h-8 text-cyan-500 mb-3" />
               <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Account Protected</span>
               <p className="text-xs text-slate-400 mt-2">2FA is enabled on this device.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
               <UserIcon className="w-8 h-8 text-cyan-500 mb-3" />
               <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Edit Details</span>
               <p className="text-xs text-slate-400 mt-2">Update your billing information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;