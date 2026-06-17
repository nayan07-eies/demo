import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StorefrontLayout } from './components/layout/StorefrontLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { AuthGuard } from './components/auth/AuthGuard';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Lazy load components
const Catalog = lazy(() => import('./features/storefront/Catalog'));
const ProductDetail = lazy(() => import('./features/storefront/ProductDetail'));
const Cart = lazy(() => import('./features/cart/Cart'));
const Login = lazy(() => import('./features/auth/Login'));
const Dashboard = lazy(() => import('./features/admin/Dashboard'));
const AdminProducts = lazy(() => import('./features/admin/AdminProducts'));

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Storefront Routes */}
              <Route element={<StorefrontLayout />}>
                <Route path="/" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
              </Route>

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AuthGuard>
                    <AdminLayout />
                  </AuthGuard>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<div>Orders Management (TBD)</div>} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
