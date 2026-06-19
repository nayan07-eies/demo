import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StorefrontLayout } from './components/layout/StorefrontLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { AuthGuard } from './components/auth/AuthGuard';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// Lazy load components
const Catalog = lazy(() => import('./features/storefront/Catalog'));
const ProductDetail = lazy(() => import('./features/storefront/ProductDetail'));
const Cart = lazy(() => import('./features/cart/Cart'));
const Wishlist = lazy(() => import('./features/wishlist/Wishlist'));
const Login = lazy(() => import('./features/auth/Login'));
const SignUp = lazy(() => import('./features/auth/SignUp'));
const Account = lazy(() => import('./features/user/Account'));
const Dashboard = lazy(() => import('./features/admin/Dashboard'));
const AdminProducts = lazy(() => import('./features/admin/AdminProducts'));

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Suspense fallback={<Loading />}>
                <Routes>
                  {/* Storefront Routes - Admins are redirected away */}
                  <Route element={<StorefrontLayout />}>
                    <Route path="/" element={<AuthGuard restrictRole="admin"><Catalog /></AuthGuard>} />
                    <Route path="/product/:id" element={<AuthGuard restrictRole="admin"><ProductDetail /></AuthGuard>} />
                    <Route path="/cart" element={<AuthGuard restrictRole="admin"><Cart /></AuthGuard>} />
                    <Route path="/wishlist" element={<AuthGuard restrictRole="admin"><Wishlist /></AuthGuard>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/account" element={
                      <AuthGuard restrictRole="admin">
                        <Account />
                      </AuthGuard>
                    } />
                  </Route>

                  {/* Admin Routes - Only accessible by Admins */}
                  <Route
                    path="/admin"
                    element={
                      <AuthGuard requireRole="admin">
                        <AdminLayout />
                      </AuthGuard>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
            </WishlistProvider>
            </CartProvider>
            </AuthProvider>
            
            </ToastProvider>
            </ThemeProvider>
            );
            }

            export default App;
