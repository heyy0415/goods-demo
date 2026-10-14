import { useEffect, useState } from 'react'
import { FREE_SHIPPING_USD, PRODUCTS } from '../data'
import { useShop } from '../store'
import { Icon, ProductImage } from './ui'

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, format, setQty, removeLine, subtotalUsd, cartCount, clearCart } = useShop()
  const [ordered, setOrdered] = useState<string | null>(null)

  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setCartOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [cartOpen, setCartOpen])

  const remaining = Math.max(0, FREE_SHIPPING_USD - subtotalUsd)
  const progress = Math.min(100, (subtotalUsd / FREE_SHIPPING_USD) * 100)
  const shipping = subtotalUsd === 0 || remaining === 0 ? 0 : 9.95

  const checkout = () => {
    setOrdered(`#${Math.floor(100000 + Math.random() * 900000)}`)
    clearCart()
  }

  const close = () => {
    setCartOpen(false)
    setOrdered(null)
  }

  return (
    <>
      <div className={`scrim ${cartOpen ? 'is-open' : ''}`} onClick={close} />
      <aside className={`drawer ${cartOpen ? 'is-open' : ''}`} aria-hidden={!cartOpen} aria-label="Shopping bag">
        <header className="drawer-head">
          <h2>Your bag {cartCount > 0 && <span className="muted">({cartCount})</span>}</h2>
          <button className="icon-btn" onClick={close} aria-label="Close bag"><Icon name="close" /></button>
        </header>

        {ordered ? (
          <div className="empty">
            <div className="success-mark"><Icon name="check" size={36} /></div>
            <h3>Thank you for your order!</h3>
            <p className="muted">Order {ordered} is confirmed. A confirmation email is on its way (demo — no payment was taken).</p>
            <button className="btn btn-primary" onClick={close}>Continue shopping</button>
          </div>
        ) : cart.length === 0 ? (
          <div className="empty">
            <div className="empty-icon"><Icon name="bag" size={40} /></div>
            <h3>Your bag is empty</h3>
            <p className="muted">Discover our bestsellers and find something you love.</p>
            <button className="btn btn-primary" onClick={close}>Start shopping</button>
          </div>
        ) : (
          <>
            <div className="ship-progress">
              <p>
                {remaining > 0
                  ? <>You're <strong>{format(remaining)}</strong> away from free shipping</>
                  : <><Icon name="truck" size={16} /> You've unlocked <strong>free shipping!</strong></>}
              </p>
              <div className="bar"><div style={{ width: `${progress}%` }} /></div>
            </div>

            <ul className="lines">
              {cart.map(line => {
                const p = PRODUCTS.find(x => x.id === line.productId)
                if (!p) return null
                return (
                  <li key={line.key} className="line">
                    <ProductImage src={p.image} alt={p.name} className="line-img" />
                    <div className="line-info">
                      <div className="line-top">
                        <div>
                          <div className="line-name">{p.name}</div>
                          {line.option && <div className="muted small">{p.options?.name}: {line.option}</div>}
                        </div>
                        <button className="icon-btn sm" onClick={() => removeLine(line.key)} aria-label={`Remove ${p.name}`}>
                          <Icon name="trash" size={18} />
                        </button>
                      </div>
                      <div className="line-bottom">
                        <div className="qty sm">
                          <button onClick={() => line.qty === 1 ? removeLine(line.key) : setQty(line.key, line.qty - 1)} aria-label="Decrease quantity"><Icon name="minus" size={14} /></button>
                          <span>{line.qty}</span>
                          <button onClick={() => setQty(line.key, line.qty + 1)} disabled={line.qty >= p.stock} aria-label="Increase quantity"><Icon name="plus" size={14} /></button>
                        </div>
                        <strong>{format(p.price * line.qty)}</strong>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <footer className="drawer-foot">
              <div className="sum-row"><span>Subtotal</span><span>{format(subtotalUsd)}</span></div>
              <div className="sum-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : format(shipping)}</span></div>
              <div className="sum-row muted small"><span>Taxes & duties</span><span>Calculated at checkout</span></div>
              <div className="sum-row total"><span>Total</span><span>{format(subtotalUsd + shipping)}</span></div>
              <button className="btn btn-primary full" onClick={checkout}>Checkout securely</button>
              <div className="pay-methods" aria-label="Accepted payment methods">
                {['VISA', 'Mastercard', 'AMEX', 'PayPal', 'Apple Pay'].map(m => <span key={m}>{m}</span>)}
              </div>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}
