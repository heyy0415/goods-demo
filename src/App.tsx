import { useCallback, useMemo, useRef, useState } from 'react'
import { CATEGORIES, CURRENCIES, FREE_SHIPPING_USD, PRODUCTS, type Category, type Currency, type Product } from './data'
import { ShopProvider, useShop } from './store'
import { ProductCard } from './components/ProductCard'
import { ProductModal } from './components/ProductModal'
import { CartDrawer } from './components/CartDrawer'
import { Icon } from './components/ui'

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'

// Bands are defined in USD; labels are rendered in the shopper's currency.
const PRICE_BANDS = [
  { min: 0, max: Infinity },
  { min: 0, max: 50 },
  { min: 50, max: 150 },
  { min: 150, max: 500 },
  { min: 500, max: Infinity },
]

const bandLabel = (i: number, format: (n: number) => string) => {
  const { min, max } = PRICE_BANDS[i]
  if (i === 0) return 'Any price'
  if (min === 0) return `Under ${format(max).replace(/[.,]00$/, '')}`
  if (max === Infinity) return `${format(min).replace(/[.,]00$/, '')}+`
  return `${format(min).replace(/[.,]00$/, '')} – ${format(max).replace(/[.,]00$/, '')}`
}

function Shop() {
  const { cartCount, cartOpen, setCartOpen, currency, setCurrency, format, wishlist, toast } = useShop()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [sort, setSort] = useState<Sort>('featured')
  const [band, setBand] = useState(0)
  const [onSale, setOnSale] = useState(false)
  const [savedOnly, setSavedOnly] = useState(false)
  const [active, setActive] = useState<Product | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const { min, max } = PRICE_BANDS[band]
    const list = PRODUCTS.filter(p =>
      (category === 'All' || p.category === category) &&
      (!q || `${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase().includes(q)) &&
      p.price >= min && p.price < max &&
      (!onSale || !!p.compareAt) &&
      (!savedOnly || wishlist.includes(p.id)),
    )
    const off = (p: Product) => (p.compareAt ? 1 - p.price / p.compareAt : 0)
    switch (sort) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price)
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
      case 'discount': return [...list].sort((a, b) => off(b) - off(a))
      default: return list
    }
  }, [query, category, sort, band, onSale, savedOnly, wishlist])

  const filtersActive = query || category !== 'All' || band !== 0 || onSale || savedOnly
  const resetFilters = () => {
    setQuery(''); setCategory('All'); setBand(0); setOnSale(false); setSavedOnly(false)
  }
  const scrollToGrid = () => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const pickCategory = (c: Category | 'All') => { setCategory(c); scrollToGrid() }
  const closeModal = useCallback(() => setActive(null), [])

  return (
    <>
      <div className="announce">
        Free worldwide shipping on orders over {format(FREE_SHIPPING_USD)} · 30-day free returns
      </div>

      <header className="header">
        <div className="container header-inner">
          <a className="logo" href="#" onClick={e => { e.preventDefault(); resetFilters(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            Harbor<span>&amp;</span>Co
          </a>
          <label className="search">
            <Icon name="search" size={20} />
            <input
              type="search"
              placeholder="Search products, brands…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && scrollToGrid()}
              aria-label="Search products"
            />
            {query && <button className="clear" onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" size={16} /></button>}
          </label>
          <div className="header-actions">
            <select
              className="currency"
              value={currency}
              onChange={e => setCurrency(e.target.value as Currency)}
              aria-label="Currency"
            >
              {(Object.keys(CURRENCIES) as Currency[]).map(c => (
                <option key={c} value={c}>{CURRENCIES[c].symbol} {c}</option>
              ))}
            </select>
            <button
              className={`icon-btn ${savedOnly ? 'is-on' : ''}`}
              onClick={() => { setSavedOnly(s => !s); scrollToGrid() }}
              aria-label="Show wishlist"
              aria-pressed={savedOnly}
            >
              <Icon name={savedOnly ? 'heartFill' : 'heart'} />
              {wishlist.length > 0 && <span className="count count-alt">{wishlist.length}</span>}
            </button>
            <button className="icon-btn" onClick={() => setCartOpen(true)} aria-label={`Open bag, ${cartCount} items`}>
              <Icon name="bag" />
              {cartCount > 0 && <span className="count" key={cartCount}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <main>
        {!filtersActive && (
          <section className="hero">
            <div className="container hero-inner">
              <div className="hero-copy">
                <span className="eyebrow">Autumn Edit 2026</span>
                <h1>Thoughtfully made essentials, delivered worldwide.</h1>
                <p>Up to 30% off selected styles. Shop in your currency with duties shown before you pay.</p>
                <div className="hero-cta">
                  <button className="btn btn-primary" onClick={() => { setOnSale(true); scrollToGrid() }}>Shop the sale</button>
                  <button className="btn btn-ghost light" onClick={() => { setSort('rating'); scrollToGrid() }}>Top rated</button>
                </div>
              </div>
              <div className="hero-cats">
                {CATEGORIES.map(c => {
                  const sample = PRODUCTS.find(p => p.category === c)!
                  return (
                    <button key={c} className="hero-cat" onClick={() => pickCategory(c)}>
                      <img src={sample.image} alt="" loading="lazy" />
                      <span>{c}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        <section className="container catalog" ref={gridRef}>
          <div className="chips" role="tablist" aria-label="Categories">
            {(['All', ...CATEGORIES] as const).map(c => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                className={`chip ${category === c ? 'is-active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="toolbar">
            <div className="toolbar-left">
              <span className="result-count">
                {results.length} {results.length === 1 ? 'product' : 'products'}
                {query && <> for “<strong>{query}</strong>”</>}
              </span>
              {filtersActive && <button className="link" onClick={resetFilters}>Clear all</button>}
            </div>
            <div className="toolbar-right">
              <label className={`toggle ${onSale ? 'is-on' : ''}`}>
                <input type="checkbox" checked={onSale} onChange={e => setOnSale(e.target.checked)} />
                On sale
              </label>
              <select value={band} onChange={e => setBand(Number(e.target.value))} aria-label="Price range">
                {PRICE_BANDS.map((_, i) => <option key={i} value={i}>{bandLabel(i, format)}</option>)}
              </select>
              <select value={sort} onChange={e => setSort(e.target.value as Sort)} aria-label="Sort by">
                <option value="featured">Featured</option>
                <option value="rating">Top rated</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="discount">Biggest discount</option>
              </select>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid">
              {results.map(p => <ProductCard key={p.id} product={p} onOpen={setActive} />)}
            </div>
          ) : (
            <div className="empty">
              <div className="empty-icon"><Icon name={savedOnly ? 'heart' : 'search'} size={40} /></div>
              <h3>{savedOnly && wishlist.length === 0 ? 'Your wishlist is empty' : 'No products match your search'}</h3>
              <p className="muted">
                {savedOnly && wishlist.length === 0 ? 'Tap the heart on any product to save it for later.' : 'Try a different keyword or remove some filters.'}
              </p>
              <button className="btn btn-primary" onClick={resetFilters}>Browse all products</button>
            </div>
          )}
        </section>

        <section className="trust container">
          <div><Icon name="truck" /><strong>Worldwide delivery</strong><span>Tracked shipping to 120+ countries</span></div>
          <div><Icon name="return" /><strong>Free returns</strong><span>30 days, no questions asked</span></div>
          <div><Icon name="shield" /><strong>Secure payment</strong><span>Cards, PayPal & Apple Pay</span></div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">© 2026 Harbor&amp;Co · Demo store — product data and checkout are simulated.</div>
      </footer>

      {active && <ProductModal product={active} onClose={closeModal} onOpen={setActive} />}
      <CartDrawer />

      <div className={`toast ${toast && !cartOpen ? 'is-shown' : ''}`} role="status" aria-live="polite">
        {toast && (
          <>
            <Icon name="check" size={18} />
            <span>{toast}</span>
            <button onClick={() => setCartOpen(true)}>View bag</button>
          </>
        )}
      </div>
    </>
  )
}

export default function App() {
  return (
    <ShopProvider>
      <Shop />
    </ShopProvider>
  )
}
