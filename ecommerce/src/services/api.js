import { PRODUCTS } from './mockData';

const LATENCY = 800;
const FAILURE_RATE = 0.1;

const simulateNetwork = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error('Failed to fetch data from the server. Please try again.'));
      } else {
        resolve(data);
      }
    }, LATENCY);
  });
};

export const api = {
  getProducts: async () => {
    return simulateNetwork([...PRODUCTS]);
  },

  getProductById: async (id) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return simulateNetwork(product);
  },

  getOrders: async () => {
    // Return empty list or some mock orders
    return simulateNetwork([]);
  },

  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'admin123') {
          resolve({ 
            token: 'mock-jwt-admin-123', 
            user: { name: 'System Admin', email, role: 'admin' } 
          });
        } else if (email === 'user@example.com' && password === 'user123') {
          resolve({ 
            token: 'mock-jwt-user-456', 
            user: { name: 'Demo Customer', email, role: 'customer' } 
          });
        } else {
          reject(new Error('Invalid credentials. Check demo accounts.'));
        }
      }, LATENCY);
    });
  },

  register: async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !password) {
          reject(new Error('All fields are required'));
        } else {
          resolve({
            token: `mock-jwt-new-${Date.now()}`,
            user: { name, email, role: 'customer' }
          });
        }
      }, LATENCY);
    });
  }
};
