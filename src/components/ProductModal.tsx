import { useEffect, useState } from 'react'
import { FREE_SHIPPING_USD, PRODUCTS, type Product } from '../data'
import { useShop } from '../store'
import { Icon, ProductImage, Stars } from './ui'

export function ProductModal({ product, onClose, onOpen }: { product: Product; onClose: () => void; onOpen: (p: Product) => void }) {
  const { format, addToCart, wishlist, toggleWish, setCartOpen } = useShop()
  const [option, setOption] = useState<string | undefined>(undefined)
  const [qty, setQty] = useState(1)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    setOption(undefined)
    setQty(1)
    setShowError(false)
  }, [product.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const wished = wishlist.includes(product.id)
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAdd = (thenCheckout = false) => {
    if (product.options && !option) {
      setShowError(true)
      return
    }
    addToCart(product, option, qty)
    onClose()
    if (thenCheckout) setCartOpen(true)
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={product.name} onClick={e => e.stopPropagation()}>
        <button className="icon-btn modal-close" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        <div className="modal-grid">
          <div className="modal-media">
            <ProductImage src={product.image} alt={product.name} />
          </div>
          <div className="modal-info">
            <span className="card-brand">{product.brand} · {product.category}</span>
            <h2>{product.name}</h2>
            <Stars rating={product.rating} reviews={product.reviews} />
            <div className="price price-lg">
              <span className={product.compareAt ? 'price-now sale' : 'price-now'}>{format(product.price)}</span>
              {product.compareAt && <s className="price-was">{format(product.compareAt)}</s>}
              {product.compareAt && <span className="save">You save {format(product.compareAt - product.price)}</span>}
            </div>
            <p className="desc">{product.description}</p>

            {product.options && (
              <div className="option-group">
                <div className="option-label">
                  {product.options.name}: <strong>{option ?? 'Select'}</strong>
                </div>
                <div className="option-list">
                  {product.options.values.map(v => (
                    <button
                      key={v}
                      className={`chip ${option === v ? 'is-active' : ''}`}
                      onClick={() => { setOption(v); setShowError(false) }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                {showError && <p className="error">Please select {product.options.name}.</p>}
              </div>
            )}

            <div className="stock">
              {product.stock <= 5
                ? <span className="stock-low">Only {product.stock} left — order soon</span>
                : <span className="stock-ok"><Icon name="check" size={16} /> In stock, ships in 1–2 business days</span>}
            </div>

            <div className="buy-row">
              <div className="qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity"><Icon name="minus" size={16} /></button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} aria-label="Increase quantity"><Icon name="plus" size={16} /></button>
              </div>
              <button className="btn btn-primary grow" onClick={() => handleAdd()}>Add to bag<span className="hide-sm"> · {format(product.price * qty)}</span></button>
              <button className={`icon-btn wish-lg ${wished ? 'is-on' : ''}`} onClick={() => toggleWish(product.id)} aria-label="Toggle wishlist">
                <Icon name={wished ? 'heartFill' : 'heart'} />
              </button>
            </div>
            <button className="btn btn-ghost full" onClick={() => handleAdd(true)}>Buy now</button>

            <ul className="perks">
              <li><Icon name="truck" size={18} /> Free worldwide shipping over {format(FREE_SHIPPING_USD)}</li>
              <li><Icon name="return" size={18} /> 30-day free returns</li>
              <li><Icon name="shield" size={18} /> Secure checkout · duties calculated at checkout</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <div className="related">
            <h3>You may also like</h3>
            <div className="related-row">
              {related.map(r => (
                <button key={r.id} className="related-item" onClick={() => onOpen(r)}>
                  <ProductImage src={r.image} alt={r.name} />
                  <span className="related-name">{r.name}</span>
                  <span className="related-price">{format(r.price)}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
