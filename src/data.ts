export type Category = 'Electronics' | 'Fashion' | 'Shoes' | 'Beauty' | 'Home' | 'Accessories'

export interface Product {
  id: string
  name: string
  brand: string
  category: Category
  price: number // USD base price
  compareAt?: number
  rating: number
  reviews: number
  image: string
  description: string
  options?: { name: string; values: string[] }
  tags?: ('New' | 'Bestseller' | 'Low stock')[]
  stock: number
}

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`

export const CATEGORIES: Category[] = ['Electronics', 'Fashion', 'Shoes', 'Beauty', 'Home', 'Accessories']

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Aura Wireless Headphones', brand: 'Sonica', category: 'Electronics', price: 129, compareAt: 179, rating: 4.7, reviews: 2381, image: img('1505740420928-5e560c06d30e'), description: 'Active noise cancelling, 40-hour battery life and plush memory-foam ear cushions. Folds flat for travel.', options: { name: 'Color', values: ['Graphite', 'Sand', 'Ocean'] }, tags: ['Bestseller'], stock: 42 },
  { id: 'p2', name: 'Classic Minimal Watch', brand: 'Nordtime', category: 'Accessories', price: 89, rating: 4.5, reviews: 864, image: img('1523275335684-37898b6baf30'), description: 'Sapphire-coated glass, Japanese quartz movement and an interchangeable leather strap. Water resistant to 50m.', options: { name: 'Strap', values: ['Black', 'Tan', 'White'] }, stock: 18 },
  { id: 'p3', name: 'Velocity Running Sneaker', brand: 'Stride', category: 'Shoes', price: 110, compareAt: 140, rating: 4.6, reviews: 1520, image: img('1542291026-7eec264c27ff'), description: 'Responsive foam midsole with breathable engineered mesh upper. Built for daily miles.', options: { name: 'Size (US)', values: ['7', '8', '9', '10', '11', '12'] }, tags: ['Bestseller'], stock: 60 },
  { id: 'p4', name: 'Instant Film Camera', brand: 'Snapbox', category: 'Electronics', price: 99, rating: 4.4, reviews: 702, image: img('1526170375885-4d8ecf77b99f'), description: 'Point, shoot, and hold a real photo in seconds. Built-in flash and selfie mirror.', tags: ['New'], stock: 25 },
  { id: 'p5', name: 'Tortoise Shell Sunglasses', brand: 'Solace', category: 'Accessories', price: 59, compareAt: 79, rating: 4.3, reviews: 410, image: img('1572635196237-14b3f281503f'), description: 'Polarized UV400 lenses in a lightweight acetate frame. Includes a vegan leather case.', stock: 4, tags: ['Low stock'] },
  { id: 'p6', name: 'Urban Daypack 22L', brand: 'Trailform', category: 'Accessories', price: 75, rating: 4.8, reviews: 1933, image: img('1553062407-98eeb64c6a62'), description: 'Water-repellent shell, padded 16" laptop sleeve and hidden anti-theft pocket.', options: { name: 'Color', values: ['Charcoal', 'Olive', 'Navy'] }, tags: ['Bestseller'], stock: 80 },
  { id: 'p7', name: 'Studio Over-Ear Headphones', brand: 'Sonica', category: 'Electronics', price: 199, rating: 4.6, reviews: 988, image: img('1583394838336-acd977736f90'), description: 'Studio-grade drivers tuned for balanced, detailed sound. Detachable cable and USB-C fast charging.', stock: 15 },
  { id: 'p8', name: 'Smart Fitness Watch', brand: 'Pulse', category: 'Electronics', price: 149, compareAt: 199, rating: 4.4, reviews: 3120, image: img('1546868871-7041f2a55e12'), description: 'Heart-rate, sleep and SpO2 tracking with 7-day battery life and built-in GPS.', options: { name: 'Size', values: ['41mm', '45mm'] }, stock: 33 },
  { id: 'p9', name: 'Eau de Parfum — Amber Noir', brand: 'Maison Lune', category: 'Beauty', price: 95, rating: 4.7, reviews: 540, image: img('1594035910387-fea47794261f'), description: 'Warm notes of amber, vanilla and sandalwood. Long-lasting 50ml bottle.', tags: ['New'], stock: 20 },
  { id: 'p10', name: 'Glow Skincare Set', brand: 'Dew Lab', category: 'Beauty', price: 68, compareAt: 85, rating: 4.5, reviews: 1204, image: img('1556228578-8c89e6adf883'), description: 'Cleanser, serum and moisturizer trio with hyaluronic acid and niacinamide. Cruelty-free.', stock: 50 },
  { id: 'p11', name: 'Vitamin C Serum', brand: 'Dew Lab', category: 'Beauty', price: 34, rating: 4.6, reviews: 2760, image: img('1620916566398-39f1143ab7be'), description: '15% vitamin C brightening serum for a more even, radiant complexion.', tags: ['Bestseller'], stock: 120 },
  { id: 'p12', name: 'Essential Cotton Tee', brand: 'Common Thread', category: 'Fashion', price: 25, rating: 4.4, reviews: 3410, image: img('1521572163474-6864f9cf17ab'), description: '100% organic cotton, relaxed fit and pre-shrunk. The tee you will reach for every day.', options: { name: 'Size', values: ['XS', 'S', 'M', 'L', 'XL'] }, stock: 200 },
  { id: 'p13', name: 'Leather Biker Jacket', brand: 'Northline', category: 'Fashion', price: 249, compareAt: 329, rating: 4.8, reviews: 312, image: img('1551028719-00167b16eac5'), description: 'Full-grain lambskin leather with quilted lining and YKK hardware.', options: { name: 'Size', values: ['S', 'M', 'L', 'XL'] }, stock: 7 },
  { id: 'p14', name: 'Chunky Knit Sweater', brand: 'Common Thread', category: 'Fashion', price: 69, rating: 4.5, reviews: 645, image: img('1434389677669-e08b4cac3105'), description: 'Soft wool-blend knit with dropped shoulders. Cosy, oversized silhouette.', options: { name: 'Size', values: ['S', 'M', 'L'] }, tags: ['New'], stock: 40 },
  { id: 'p15', name: 'Retro Court Sneaker', brand: 'Stride', category: 'Shoes', price: 85, rating: 4.5, reviews: 1077, image: img('1600185365483-26d7a4cc7519'), description: 'Clean leather upper and cushioned cupsole — a timeless everyday sneaker.', options: { name: 'Size (US)', values: ['6', '7', '8', '9', '10', '11'] }, stock: 55 },
  { id: 'p16', name: 'Trail Hiker Boot', brand: 'Trailform', category: 'Shoes', price: 139, compareAt: 159, rating: 4.7, reviews: 488, image: img('1491553895911-0055eca6402d'), description: 'Waterproof membrane with grippy lugged outsole for any terrain.', options: { name: 'Size (US)', values: ['8', '9', '10', '11', '12'] }, stock: 22 },
  { id: 'p17', name: 'Ceramic Pour-Over Set', brand: 'Kinfolk Home', category: 'Home', price: 48, rating: 4.6, reviews: 391, image: img('1495474472287-4d71bcdd2085'), description: 'Hand-glazed ceramic dripper with matching carafe. Brews 2–4 cups.', stock: 30 },
  { id: 'p18', name: 'Stoneware Mug Duo', brand: 'Kinfolk Home', category: 'Home', price: 29, rating: 4.8, reviews: 920, image: img('1514228742587-6b1558fcca3d'), description: 'Set of two 350ml speckled stoneware mugs. Dishwasher and microwave safe.', tags: ['Bestseller'], stock: 90 },
  { id: 'p19', name: 'Oak Accent Stool', brand: 'Formwood', category: 'Home', price: 119, rating: 4.4, reviews: 156, image: img('1503602642458-232111445657'), description: 'Solid oak with a natural oil finish. Doubles as a side table or plant stand.', stock: 3, tags: ['Low stock'] },
  { id: 'p20', name: 'Velvet Lounge Sofa', brand: 'Formwood', category: 'Home', price: 899, compareAt: 1099, rating: 4.7, reviews: 204, image: img('1555041469-a586c61ea9bc'), description: 'Deep-seated three-seater in soft performance velvet. Free white-glove delivery.', options: { name: 'Color', values: ['Emerald', 'Blush', 'Slate'] }, stock: 9 },
  { id: 'p21', name: 'Ultrabook Pro 14"', brand: 'Arc', category: 'Electronics', price: 1199, compareAt: 1299, rating: 4.8, reviews: 1730, image: img('1517336714731-489689fd1ca8'), description: '14" Retina-class display, all-day battery and a featherweight aluminium chassis.', options: { name: 'Storage', values: ['512GB', '1TB'] }, stock: 12 },
  { id: 'p22', name: 'Signature Perfume — Rose', brand: 'Maison Lune', category: 'Beauty', price: 82, rating: 4.3, reviews: 287, image: img('1585386959984-a4155224a1ad'), description: 'Fresh Bulgarian rose with hints of pink pepper and musk. 50ml.', stock: 26 },
]

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1, locale: 'en-US' },
  EUR: { symbol: '€', rate: 0.92, locale: 'de-DE' },
  GBP: { symbol: '£', rate: 0.79, locale: 'en-GB' },
  JPY: { symbol: '¥', rate: 149, locale: 'ja-JP' },
} as const

export type Currency = keyof typeof CURRENCIES

export const FREE_SHIPPING_USD = 75
