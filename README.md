# Shoppy - E-Commerce Web Application

A modern, responsive e-commerce application built with React, TypeScript, and Vite.

**Live Demo**: [https://shoppy-sembark.vercel.app](https://shoppy-sembark.vercel.app)

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (Formerly known as Framer Motion)
- **Data Fetching:** Axios
- **Icons:** Lucide React
- **Testing:** Playwright (E2E)

## 🚀 Setup & Installation

To get this project up and running locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/RikSin7/sembark-e-commerce.git
   cd sembark-e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

4. **Run End-to-End Tests**
   ```bash
   npx playwright test
   ```

## 📂 Project Structure

```text
src/
├── app
│   ├── layouts
│   │   └── MainLayout.tsx
│   └── routes
│       └── AppRoutes.tsx
├── assets
├── features
│   ├── cart
│   │   ├── components
│   │   │   └── CartItem.tsx
│   │   ├── context
│   │   │   └── CartContext.tsx
│   │   └── pages
│   │       └── CartPage.tsx
│   └── products
│       ├── api
│       │   └── productApi.ts
│       ├── components
│       │   ├── FilterDropdown.tsx
│       │   ├── ProductCard.tsx
│       │   └── SortDropdown.tsx
│       ├── hooks
│       │   └── useProducts.tsx
│       ├── pages
│       │   ├── ProductDetailsPage.tsx
│       │   └── ProductListPage.tsx
│       └── types.ts
├── shared
│   ├── api
│   │   ├── axiosInstance.ts
│   │   └── endpoint.ts
│   ├── components
│   │   ├── AddToCart.tsx
│   │   ├── BackButton.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Loader.tsx
│   │   └── PageTransition.tsx
│   ├── constants
│   │   ├── routes.ts
│   │   └── storageKeys.ts
│   └── utils
│       └── sortProducts.ts
├── App.tsx
├── index.css
└── main.tsx
```

## 🧠 Architectural Decisions & Trade-offs

Building a robust frontend on top of a public mock API required a few strategic decisions to ensure a smooth user experience:

- **Handling Multi-Select Filtering:** The mock API doesn't natively support querying multiple categories simultaneously. Rather than breaking the rules by filtering locally, I leveraged `Promise.all` to fire parallel network requests for each selected category. This keeps filtering on the server side while maintaining a snappy UI.
- **Client-Side Sorting:** Since the API lacks a sorting endpoint, I bridged the gap by fetching the filtered data first, and then managing the sorting mathematically on the client side.
- **URL as the Source of Truth:** Active filters and sort parameters are bound directly to React Router's `useSearchParams` instead of local state. This ensures URLs are shareable and respects the browser's back/forward navigation.

## 🤔 Assumptions Made

- **The Data Persistence Assumption:** I assumed users would hate losing their cart if they accidentally closed the tab. I engineered the `CartContext` to automatically hydrate and sync with the browser's `localStorage` for a persistent session.
- **The Item Multiplier Assumption:** Recognizing that users often buy multiple units of an item, I built the cart reducer to track quantity multipliers. This allows for clean scaling of subtotals rather than blindly duplicating rows in the cart.
- **The UI/UX Flow Assumption:** Forcing users to visit a product's details page just to add it to their cart introduces unnecessary friction. I implemented a "Quick Add" capability on the listing page to streamline the shopping experience.

## ✨ Additional Features & Polish

I added several quality-of-life features that align with modern enterprise patterns:

- **Global Reactive Cart Badge:** The header features a dynamic quantity badge that listens to the Context API and updates in real time across all routes without reloads.
- **Cart Quantity Controls:** Inside the Cart page, users have full mathematical controls (increment/decrement/remove) that instantly recalculate the order summary and subtotals.
- **Motion Micro-Interactions:** Included smooth page transitions and animated cart item removals to prevent harsh layout-snapping and improve perceived performance.
- **Automated E2E Testing:** Configured a Playwright testing suite (`tests/`) that spins up a headless browser to programmatically verify the critical path (Filtering -> Details Page -> Cart Calculation).

