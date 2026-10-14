# Harbor&Co — demo storefront

A React + TypeScript (Vite) shopping app for international shoppers. Product data is mocked; there is no backend, login or real payment.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
```

## Features
- **Browsing:** hero with category shortcuts, category chips, and a responsive product grid
- **Finding products:** live search (name, brand, category, description), On sale toggle, price bands, and sorting (top rated, price, biggest discount)
- **Product detail:** variant selection with validation, quantity, stock and urgency messaging, shipping/returns perks, related products. It is a modal on desktop and a bottom sheet on phones
- **Cart:** slide-in drawer, quantity steppers, free-shipping progress bar, order summary, and a simulated checkout with confirmation
- **For international shoppers:** USD / EUR / GBP / JPY with locale-aware formatting. Price filters and the free-shipping threshold follow the selected currency. Taxes and duties are flagged as calculated at checkout
- **Persistence:** cart, wishlist and currency are saved in localStorage
- **Quality:** keyboard support (Esc closes overlays, focus rings), ARIA labels, reduced-motion support, and a placeholder if an image fails to load

## Structure
- `src/data.ts`: mock catalog, currencies
- `src/store.tsx`: cart, wishlist, currency and toast state (React context)
- `src/App.tsx`: header, hero, filters and grid
- `src/components/`: ProductCard, ProductModal, CartDrawer, shared UI
