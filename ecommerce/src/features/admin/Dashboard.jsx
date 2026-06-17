import React from 'react';
import { ShoppingCart, Package, DollarSign, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '$24,560.00', icon: DollarSign, color: 'bg-green-500', trend: '+12.5%' },
    { label: 'Total Orders', value: '1,234', icon: ShoppingCart, color: 'bg-blue-500', trend: '+8.2%' },
    { label: 'Active Products', value: '48', icon: Package, color: 'bg-purple-500', trend: '0%' },
    { label: 'Customers', value: '892', icon: Users, color: 'bg-orange-500', trend: '+15.3%' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-green-600 text-sm font-bold flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 py-2 border-b last:border-0">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="grow">
                  <p className="text-sm font-medium text-gray-900">New order #ORD-123{i} placed</p>
                  <p className="text-xs text-gray-400">2 minutes ago</p>
                </div>
                <span className="text-sm font-bold text-gray-900">$129.00</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Sales Analytics</h3>
          <p className="text-gray-500 text-sm mt-2 max-w-xs">
            Detailed charts and graphs will appear here once you have more transaction data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
