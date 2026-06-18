import { useState } from 'react';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();

  // If already authenticated, redirect to appropriate dashboard
  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/account" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.login(email, password);
      login(response.user); // Save the user object
      
      // Determine redirection based on role
      const redirectPath = response.user.role === 'admin' 
        ? (location.state?.from?.pathname || '/admin')
        : '/account';
        
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 px-4">
      <div className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-cyan-900/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-cyan-100 shadow-md shadow-cyan-900/5">
              <Lock className="w-10 h-10 text-cyan-500" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Access Node</h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-3 leading-relaxed">Secure Terminal Authentication</p>
          </div>

          {error && (
            <div className="bg-pink-50 border border-pink-200 text-pink-600 p-4 rounded-2xl flex items-center gap-3 mb-8 shadow-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-xs font-bold uppercase tracking-wider">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 ml-1">Identity Protocol</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nexus.gear"
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-slate-900 dark:text-white font-bold shadow-inner"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 ml-1">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-slate-900 dark:text-white font-bold shadow-inner"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-cyan-500 hover:text-slate-900 dark:hover:text-white transition-all duration-300 disabled:opacity-50 shadow-lg shadow-slate-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-[0.98]"
            >
              {loading ? 'Authenticating...' : 'Establish Link'}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Demo Credentials
            </p>
            <p className="text-center text-xs font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 shadow-inner">
              admin@example.com / admin123
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Don't have an account? <Link to="/signup" className="text-cyan-600 hover:text-slate-900 dark:hover:text-white transition-colors">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
