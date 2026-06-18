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
        const normalizedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();

        // Check demo accounts first
        if (normalizedEmail === 'admin@example.com' && trimmedPassword === 'admin123') {
          resolve({ 
            token: 'mock-jwt-admin-123', 
            user: { name: 'System Admin', email: normalizedEmail, role: 'admin' } 
          });
        } else if (normalizedEmail === 'user@example.com' && trimmedPassword === 'user123') {
          resolve({ 
            token: 'mock-jwt-user-456', 
            user: { name: 'Demo Customer', email: normalizedEmail, role: 'customer' } 
          });
        } else {
          // Check localStorage for registered users
          const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
          const user = users.find(u => u.email.toLowerCase() === normalizedEmail && u.password === trimmedPassword);
          
          if (user) {
            resolve({
              token: `mock-jwt-${user.id}`,
              user: { name: user.name, email: user.email, role: user.role }
            });
          } else {
            reject(new Error('Invalid credentials. Check demo accounts.'));
          }
        }
      }, LATENCY);
    });
  },

  register: async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !password) {
          reject(new Error('All fields are required'));
          return;
        }

        const normalizedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();
        const trimmedName = name.trim();

        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        if (users.find(u => u.email.toLowerCase() === normalizedEmail)) {
          reject(new Error('Email already registered'));
          return;
        }

        const newUser = {
          id: Date.now(),
          name: trimmedName,
          email: normalizedEmail,
          password: trimmedPassword,
          role: 'customer'
        };

        users.push(newUser);
        localStorage.setItem('mock_users', JSON.stringify(users));

        resolve({
          token: `mock-jwt-new-${newUser.id}`,
          user: { name: trimmedName, email: normalizedEmail, role: 'customer' }
        });
      }, LATENCY);
    });
  }
};
