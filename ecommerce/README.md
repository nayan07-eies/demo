# NexusGear E-Commerce Prototype

NexusGear is a high-performance, front-end e-commerce prototype built with a custom "Cyber-Industrial" aesthetic. It demonstrates modern React architecture, complex global state management, and strict Role-Based Access Control (RBAC).

![NexusGear Interface](public/favicon.svg)

## 🚀 Key Features

### 🛍️ Storefront (User Experience)
*   **Dynamic Catalog:** Browse products with real-time search, category filtering, and bidirectional price sorting.
*   **Procurement Buffer (Cart):** Robust cart system with stock validation (prevents over-ordering), quantity controls, and dynamic pricing calculations.
*   **Saved Gear (Wishlist):** Persisted wishlist functionality with live notification badges in the navigation header.
*   **Distraction-Free Auth Flow:** A streamlined layout that hides shopping elements during the Login and Sign-Up processes.

### 🛡️ Security & Identity
*   **Role-Based Access Control (RBAC):** Strict routing separation. 
    *   `customer` accounts cannot access the terminal dashboard.
    *   `admin` accounts are redirected away from the storefront catalog to the management terminal.
*   **Authentication Persistence:** User data and sessions are persisted locally. Inputs are sanitized (trimmed and lowercased) to prevent common login errors.

### 🎛️ Terminal (Admin Experience)
*   **Analytics Dashboard:** High-level metrics tracking revenue, total orders, and active customers.
*   **Inventory Management:** A dedicated data table to track product names, categories, pricing, and exact stock levels (with dynamic color-coded warnings for low stock).

### 🎨 Design System
*   **Nexus Aesthetic:** A highly modern, frosted-glass design system with custom glowing scrollbars, animated hover states, and smooth CSS transitions.
*   **Custom Dark Mode Engine:** A toggleable, global dark theme powered by Tailwind v4's CSS variables. It utilizes a custom color palette:
    *   Background: `#1F2326`
    *   Primary Text: `#E0E0E0`
    *   Accent/CTA: `#FF6B35`

## 🛠️ Technology Stack

*   **Framework:** React 18
*   **Build Tool:** Vite (for rapid HMR and optimized production builds)
*   **Routing:** React Router v6
*   **Styling:** Tailwind CSS v4 + PostCSS
*   **Icons:** Lucide React
*   **Testing:** Vitest + React Testing Library
*   **Linting:** ESLint

## 📦 Project Structure

```text
src/
├── components/
│   ├── auth/          # Authentication Guards & Routing Logic
│   └── layout/        # Storefront & Admin Layout Wrappers
├── context/           # Global State (Auth, Cart, Wishlist, Theme)
├── features/          # Feature-based Component Modules
│   ├── admin/         # Terminal Dashboard & Inventory
│   ├── auth/          # Login & SignUp Forms
│   ├── cart/          # Cart Interface
│   ├── storefront/    # Catalog & Product Details
│   └── wishlist/      # Saved Items Interface
└── services/
    ├── api.js         # Mock API Service (localStorage)
    └── mockData.js    # Initial Product Database
```

## 💻 Local Setup & Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```

3. **Run Automated Tests:**
   ```bash
   npm run test
   ```

4. **Build for Production:**
   ```bash
   npm run build
   ```

## 🔑 Demo Accounts

The application uses a simulated backend that persists data to `localStorage`. You can create your own account via the Sign Up page, or use the following pre-configured credentials:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `admin123` |
| **User** | `user@example.com` | `user123` |

---
*Developed as a high-fidelity front-end architecture prototype.*
