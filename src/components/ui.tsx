import { useState } from 'react'

type IconName = 'search' | 'bag' | 'heart' | 'heartFill' | 'close' | 'star' | 'plus' | 'minus' | 'truck' | 'return' | 'shield' | 'trash' | 'check'

const PATHS: Record<IconName, string> = {
  search: 'M11 4a7 7 0 1 0 4.9 12l4.4 4.4 1.4-1.4-4.4-4.4A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z',
  bag: 'M7 8V7a5 5 0 0 1 10 0v1h3l-1 13H5L4 8h3Zm2 0h6V7a3 3 0 0 0-6 0v1Zm-2.9 2 .7 9h10.4l.7-9H6.1Z',
  heart: 'M12 20s-7.5-4.4-9.3-9.2C1.6 7.6 3.7 4.5 7 4.5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.3 0 5.4 3.1 4.3 6.3C19.5 15.6 12 20 12 20Zm0-2.4c2.4-1.5 6.4-4.5 7.4-7.4.7-2-.6-3.7-2.4-3.7-1.3 0-2.2.8-3.8 2.7L12 10.6l-1.2-1.4C9.2 7.3 8.3 6.5 7 6.5c-1.8 0-3.1 1.7-2.4 3.7 1 2.9 5 5.9 7.4 7.4Z',
  heartFill: 'M12 20s-7.5-4.4-9.3-9.2C1.6 7.6 3.7 4.5 7 4.5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.3 0 5.4 3.1 4.3 6.3C19.5 15.6 12 20 12 20Z',
  close: 'M6.4 5 5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6 6.4 5Z',
  star: 'm12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9 2.9-6Z',
  plus: 'M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z',
  minus: 'M5 11h14v2H5z',
  truck: 'M2 5h13v3h4l3 4v5h-2a3 3 0 0 1-6 0H9a3 3 0 0 1-6 0H2V5Zm2 2v8.8A3 3 0 0 1 8.2 15H13V7H4Zm11 3v5.2a3 3 0 0 1 4.8.8h.2v-3.3L18 10h-3ZM6 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm11 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  return: 'M7.8 4 9.2 5.4 6.6 8H14a6 6 0 0 1 0 12H8v-2h6a4 4 0 0 0 0-8H6.6l2.6 2.6L7.8 14 2.8 9l5-5Z',
  shield: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1 13.4-3.7-3.7 1.4-1.4 2.3 2.3 4.9-4.9 1.4 1.4-6.3 6.3Z',
  trash: 'M9 3h6l1 2h4v2H4V5h4l1-2Zm-3 6h12l-1 12H7L6 9Zm2.2 2 .6 8h6.4l.6-8H8.2Z',
  check: 'm9 16.2-4.2-4.2-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z',
}

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  )
}

export function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <span className="stars" aria-label={`Rated ${rating} out of 5`}>
      <span className="stars-track">
        ★★★★★
        <span className="stars-fill" style={{ width: `${(rating / 5) * 100}%` }}>★★★★★</span>
      </span>
      <span className="stars-text">{rating.toFixed(1)}{reviews !== undefined && ` (${reviews.toLocaleString('en-US')})`}</span>
    </span>
  )
}

/** Image with a graceful branded placeholder if the remote image fails to load. */
export function ProductImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  if (failed) {
    return <div className={`img-fallback ${className ?? ''}`}><span>{alt.charAt(0)}</span></div>
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`${className ?? ''} ${loaded ? 'is-loaded' : ''}`}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  )
}
