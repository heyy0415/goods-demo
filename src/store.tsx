import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { CURRENCIES, PRODUCTS, type Currency, type Product } from './data'

export interface CartLine {
  key: string // productId + option
  productId: string
  option?: string
  qty: number
}

interface ShopState {
  cart: CartLine[]
  cartCount: number
  subtotalUsd: number
  addToCart: (p: Product, option?: string, qty?: number) => void
  setQty: (key: string, qty: number) => void
  removeLine: (key: string) => void
  clearCart: () => void
  wishlist: string[]
  toggleWish: (id: string) => void
  currency: Currency
  setCurrency: (c: Currency) => void
  format: (usd: number) => string
  cartOpen: boolean
  setCartOpen: (o: boolean) => void
  toast: string | null
}

const ShopContext = createContext<ShopState | null>(null)

function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue] as const
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = usePersisted<CartLine[]>('shop.cart', [])
  const [wishlist, setWishlist] = usePersisted<string[]>('shop.wishlist', [])
  const [currency, setCurrency] = usePersisted<Currency>('shop.currency', 'USD')
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const addToCart = useCallback((p: Product, option?: string, qty = 1) => {
    const key = option ? `${p.id}::${option}` : p.id
    setCart(prev => {
      const existing = prev.find(l => l.key === key)
      if (existing) {
        return prev.map(l => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, p.stock) } : l))
      }
      return [...prev, { key, productId: p.id, option, qty: Math.min(qty, p.stock) }]
    })
    setToast(`Added "${p.name}"${option ? ` (${option})` : ''} to your bag`)
  }, [setCart])

  const setQty = useCallback((key: string, qty: number) => {
    setCart(prev => prev.map(l => {
      if (l.key !== key) return l
      const stock = PRODUCTS.find(p => p.id === l.productId)?.stock ?? 99
      return { ...l, qty: Math.max(1, Math.min(qty, stock)) }
    }))
  }, [setCart])

  const removeLine = useCallback((key: string) => setCart(prev => prev.filter(l => l.key !== key)), [setCart])
  const clearCart = useCallback(() => setCart([]), [setCart])
  const toggleWish = useCallback((id: string) => {
    setWishlist(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
  }, [setWishlist])

  const format = useCallback((usd: number) => {
    const c = CURRENCIES[currency]
    return new Intl.NumberFormat(c.locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2,
    }).format(usd * c.rate)
  }, [currency])

  const { cartCount, subtotalUsd } = useMemo(() => {
    let count = 0
    let sub = 0
    for (const l of cart) {
      const p = PRODUCTS.find(x => x.id === l.productId)
      if (!p) continue
      count += l.qty
      sub += p.price * l.qty
    }
    return { cartCount: count, subtotalUsd: sub }
  }, [cart])

  const value: ShopState = {
    cart, cartCount, subtotalUsd, addToCart, setQty, removeLine, clearCart,
    wishlist, toggleWish, currency, setCurrency, format, cartOpen, setCartOpen, toast,
  }
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used inside ShopProvider')
  return ctx
}
