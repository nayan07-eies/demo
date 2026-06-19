import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

// ADD THIS LINE! (Make sure the path matches where your AuthContext is located)
import { useAuth } from './AuthContext'; 

const WishlistContext = createContext(undefined);

// ... rest of your code
export const WishlistProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { addToast } = useToast();

  const [wishlistItems, setWishlistItems] = useState([]);

  // LOAD DATA: Fetch their specific wishlist
  useEffect(() => {
    if (isAuthenticated && user) {
      const storageKey = `wishlist_${user.id || user._id || user.email}`;
      const savedList = localStorage.getItem(storageKey);
      setWishlistItems(savedList ? JSON.parse(savedList) : []);
    } else {
      setWishlistItems([]);
    }
  }, [isAuthenticated, user]);

  // SAVE DATA: Save to their specific file
  useEffect(() => {
    if (isAuthenticated && user) {
      const storageKey = `wishlist_${user.id || user._id || user.email}`;
      localStorage.setItem(storageKey, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isAuthenticated, user]);

  
  const toggleWishlist = (product) => {
    // 1. Check current state and trigger the toast OUTSIDE the state setter
    const isExist = wishlistItems.some((item) => item.id === product.id);
    
    if (isExist) {
      addToast('Removed from saved gear', 'info');
    } else {
      addToast('Added to saved gear', 'success');
    }

    // 2. Perform the state update purely (no side effects inside!)
    setWishlistItems((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};