import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext'; 

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  // 1. Pull in 'user' so we know WHO is saving data
  const { isAuthenticated, user } = useAuth();
  const { addToast } = useToast();

  // Start empty. We will load the data dynamically.
  const [items, setItems] = useState([]);

  // 2. LOAD DATA: When a user logs in, fetch THEIR specific cart
  useEffect(() => {
    if (isAuthenticated && user) {
      // Use their unique ID (or email as a fallback) to find their stuff
      const storageKey = `cart_${user.id || user._id || user.email}`;
      const savedCart = localStorage.getItem(storageKey);
      setItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      // If logged out, immediately clear the screen
      setItems([]); 
    }
  }, [isAuthenticated, user]);

  // 3. SAVE DATA: Whenever the cart changes, save it to THEIR specific file
  useEffect(() => {
    if (isAuthenticated && user) {
      const storageKey = `cart_${user.id || user._id || user.email}`;
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, isAuthenticated, user]);

  const addItem = (product) => {
    const existing = items.find(item => item.id === product.id);
    
    if (existing) {
      if (existing.quantity >= product.stock) {
        addToast(`Only ${product.stock} units available`, 'error');
        return; 
      }
      addToast('Added another unit to storage', 'success');
    } else {
      addToast('Item secured in storage', 'success');
    }

    setItems(prev => {
      const isExist = prev.find(item => item.id === product.id);
      if (isExist) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (productId) => {
    setItems(prev => prev.filter(item => item.id !== productId));
    addToast('Item removed from storage', 'info');
  };
  
  const updateQuantity = (productId, quantity) => {
    setItems(prev => prev.map(item => {
      if (item.id === productId) {
        const stock = item.stock || 0;
        return { ...item, quantity: Math.min(Math.max(1, quantity), stock) };
      }
      return item;
    }));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must be used within a CartProvider');
  return context;
};