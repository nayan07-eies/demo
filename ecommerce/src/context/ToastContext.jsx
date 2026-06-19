import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border pointer-events-auto transition-all animate-in slide-in-from-bottom-5 fade-in duration-300 ${
              toast.type === 'success' 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-700 dark:border-white shadow-[0_0_20px_rgba(255,107,53,0.3)]' 
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-cyan-500" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-pink-500" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-500" />}
            <p className="text-xs font-black uppercase tracking-widest">{toast.message}</p>
            <button 
              onClick={() => removeToast(toast.id)} 
              className="ml-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors active:scale-90"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
