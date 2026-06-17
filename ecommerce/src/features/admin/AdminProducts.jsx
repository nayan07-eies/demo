import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="bg-white p-12 rounded-3xl border shadow-sm text-center">
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button
          onClick={() => loadProducts()}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto text-slate-600">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Terminal Inventory</h1>
          <p className="text-slate-500 font-medium mt-2">Core database management and stock synchronization.</p>
        </div>
        <button className="inline-flex items-center space-x-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cyan-500 hover:text-slate-900 transition-all shadow-lg shadow-slate-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-[0.98]">
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row gap-6 bg-slate-50/50">
          <div className="relative grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all font-medium text-slate-900 text-sm shadow-inner"
            />
          </div>
          <button className="inline-flex items-center space-x-2 border border-slate-200 bg-white px-6 py-3 rounded-2xl hover:bg-slate-50 transition-colors font-bold uppercase tracking-widest text-[10px] text-slate-500">
            <Filter className="w-4 h-4" />
            <span>Query Filters</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-10 py-6">Identity</th>
                <th className="px-10 py-6">Sector</th>
                <th className="px-10 py-6">Value</th>
                <th className="px-10 py-6">System Status</th>
                <th className="px-10 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-10 py-12">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-100 w-48 rounded"></div>
                          <div className="h-3 bg-slate-50 w-24 rounded"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <img src={product.image} className="w-full h-full object-cover opacity-90" />
                        </div>
                        <span className="font-black text-slate-900 uppercase tracking-tight">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className="px-3 py-1 bg-cyan-50 text-cyan-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-cyan-100">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-10 py-6 font-black text-slate-900">${product.price.toFixed(2)}</td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500 ring-4 ring-green-100' : product.stock > 0 ? 'bg-orange-500 ring-4 ring-orange-100' : 'bg-pink-500 ring-4 ring-pink-100'}`}></div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-pink-600'}`}>
                          {product.stock} Units
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-3 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-3 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No entries match your query parameters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-slate-50/50 flex justify-between items-center border-t border-slate-100">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Database Sync: {filteredProducts.length} of {products.length} Entries</span>
          <div className="flex space-x-3">
            <button disabled className="px-6 py-2.5 border border-slate-200 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 disabled:opacity-50">Prev</button>
            <button disabled className="px-6 py-2.5 border border-slate-200 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
