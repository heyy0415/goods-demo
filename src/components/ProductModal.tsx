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
              <button className="btn btn-primary grow" onClick={() => handleAdd()}><svg t="1791969259723" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1730" width="18" height="18"><path d="M352.456912 832.032253c-35.434907 0-63.989249 28.554342-63.989249 63.989249 0 35.434907 28.554342 63.989249 63.989249 63.989249s63.989249-28.554342 63.989249-63.989249C416.446162 860.586595 387.891819 832.032253 352.456912 832.032253L352.456912 832.032253z" fill="#ffffff" p-id="1731"></path><path d="M800.55367 832.032253c-35.434907 0-63.989249 28.554342-63.989249 63.989249 0 35.434907 28.554342 63.989249 63.989249 63.989249s63.989249-28.554342 63.989249-63.989249C864.54292 860.586595 835.816563 832.032253 800.55367 832.032253L800.55367 832.032253z" fill="#ffffff" p-id="1732"></path><path d="M864.026877 800.037628 344.200235 800.037628c-46.099782 0-86.695112-36.466991-92.199563-83.082815l-54.356459-382.043339L166.853687 156.360826c-1.892155-15.653284-16.169326-28.382328-29.930455-28.382328L95.983874 127.978498c-17.717453 0-31.994625-14.277171-31.994625-31.994625s14.277171-31.994625 31.994625-31.994625l40.767344 0c46.615824 0 87.727196 36.466991 93.403662 83.082815l30.790526 177.86259L315.473879 708.698135c1.720141 14.793214 15.309256 27.350244 28.726356 27.350244l519.826642 0c17.717453 0 31.994625 14.277171 31.994625 31.994625S881.744331 800.037628 864.026877 800.037628z" fill="#ffffff" p-id="1733"></path><path d="M384.279523 672.05913c-16.685369 0-30.618512-12.729044-31.82261-29.586427-1.376113-17.545439 11.868974-33.026709 29.586427-34.230808l434.163615-31.994625c15.997312-0.172014 29.414413-12.55703 31.134554-26.834201l50.400134-288.295649c1.204099-10.664875-1.720141-22.533848-8.084663-29.758441-4.128339-4.644381-9.288762-7.052579-15.309256-7.052579L319.946246 224.3064c-17.717453 0-31.994625-14.277171-31.994625-31.994625S302.400806 159.973123 319.946246 159.973123l554.05745 0c24.426004 0 46.959852 10.148833 63.301193 28.554342 18.749538 21.157736 27.178229 50.744163 23.565933 81.706703l-50.400134 288.467663c-5.504452 44.895683-45.927768 81.362674-92.027549 81.362674l-431.755417 31.82261C385.82765 671.887116 384.967579 672.05913 384.279523 672.05913z" fill="#ffffff" p-id="1734"></path></svg><span className="hide-sm"> · {format(product.price * qty)}</span></button>
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
