import type { Product } from '../data'
import { useShop } from '../store'
import { Icon, ProductImage, Stars } from './ui'

export function ProductCard({ product, onOpen }: { product: Product; onOpen: (p: Product) => void }) {
  const { format, addToCart, wishlist, toggleWish } = useShop()
  const wished = wishlist.includes(product.id)
  const discount = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0

  const quickAdd = () => {
    // Products with variants need a choice first — open details instead of guessing a size.
    if (product.options) onOpen(product)
    else addToCart(product)
  }

  return (
    <article className="card">
      <button className="card-media" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
        <ProductImage src={product.image} alt={product.name} />
        <div className="badges">
          {discount > 0 && <span className="badge badge-sale">-{discount}%</span>}
          {product.tags?.map(t => (
            <span key={t} className={`badge badge-${t.replace(' ', '-').toLowerCase()}`}>{t}</span>
          ))}
        </div>
      </button>
      <button
        className={`wish ${wished ? 'is-on' : ''}`}
        onClick={() => toggleWish(product.id)}
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={wished}
      >
        <Icon name={wished ? 'heartFill' : 'heart'} size={20} />
      </button>
      <div className="card-body">
        <span className="card-brand">{product.brand}</span>
        <button className="card-title" onClick={() => onOpen(product)}>{product.name}</button>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="card-foot">
          <div className="price">
            <span className={discount ? 'price-now sale' : 'price-now'}>{format(product.price)}</span>
            {product.compareAt && <s className="price-was">{format(product.compareAt)}</s>}
          </div>
          <button className="btn-add" onClick={quickAdd} aria-label={`Add ${product.name} to bag`}>
            <Icon name="plus" size={18} />
            <span>{product.options ? 'Choose' : 'Add'}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
