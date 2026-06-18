import { describe, it, expect, beforeEach, vi } from 'vitest';
import { api } from './api';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
    clear: vi.fn(() => { store = {}; }),
    removeItem: vi.fn(key => { delete store[key]; }),
  };
})();

global.localStorage = localStorageMock;

describe('api service', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should login with demo admin credentials', async () => {
    const result = await api.login('admin@example.com', 'admin123');
    expect(result.user.role).toBe('admin');
    expect(result.user.email).toBe('admin@example.com');
  });

  it('should login with demo user credentials', async () => {
    const result = await api.login('user@example.com', 'user123');
    expect(result.user.role).toBe('customer');
  });

  it('should fail login with invalid credentials', async () => {
    await expect(api.login('wrong@example.com', 'wrong'))
      .rejects.toThrow('Invalid credentials. Check demo accounts.');
  });

  it('should register a new user and allow login', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    // Register
    const regResult = await api.register(newUser.name, newUser.email, newUser.password);
    expect(regResult.user.email).toBe(newUser.email);

    // Login
    const loginResult = await api.login(newUser.email, newUser.password);
    expect(loginResult.user.name).toBe(newUser.name);
  });

  it('should handle case-insensitive emails and whitespace during login', async () => {
    const newUser = {
      name: 'Test User',
      email: 'Case@Example.com',
      password: 'password123'
    };

    await api.register(newUser.name, newUser.email, newUser.password);

    // Login with different case and spaces
    const loginResult = await api.login('  case@example.com  ', newUser.password);
    expect(loginResult.user.email).toBe('case@example.com');
  });

  it('should prevent duplicate email registration', async () => {
    const user = {
      name: 'User 1',
      email: 'duplicate@example.com',
      password: 'password'
    };

    await api.register(user.name, user.email, user.password);
    
    await expect(api.register('User 2', user.email, 'otherpassword'))
      .rejects.toThrow('Email already registered');
  });
});
