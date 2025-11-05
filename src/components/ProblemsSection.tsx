import React, { useRef, useEffect, useState } from 'react'
import card1 from '../assets/card1.png'
import card2 from '../assets/card2.png'
import card3 from '../assets/card3.png'
import card4 from '../assets/card4.png'
import card5 from '../assets/card5.png'
import card6 from '../assets/card6.png'

const ProblemsSection: React.FC = () => {
  // Small reusable horizontal scroll row with nav buttons & indicators
  const ScrollRow: React.FC<{items: string[]; alts?: string[]}> = ({ items, alts = [] }) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const el = ref.current
      if (!el) return

      const update = () => {
        const p = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth))
        setPages(p)
        setPage(Math.min(p - 1, Math.round(el.scrollLeft / el.clientWidth)))
      }

      update()
      window.addEventListener('resize', update)
      el.addEventListener('scroll', update, { passive: true })
      return () => {
        window.removeEventListener('resize', update)
        el.removeEventListener('scroll', update)
      }
    }, [items])

    useEffect(() => {
      const onResize = () => setIsMobile(window.innerWidth < 640)
      onResize()
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }, [])

    const scrollBy = (dir: number) => {
      const el = ref.current
      if (!el) return
      const vw = el.clientWidth
      // Use the latest `page` state to avoid issues when smooth-scrolling is in progress
      const targetPage = Math.max(0, Math.min(pages - 1, page + dir))
      el.scrollTo({ left: targetPage * vw, behavior: 'smooth' })
      // Optimistically set page so buttons enable/disable immediately
      setPage(targetPage)
    }

    if (isMobile) {
      return (
        <div className="mb-6 -mx-4 px-4">
          <div className="grid grid-cols-1 gap-8 py-2">
            {items.map((src, i) => (
              <div key={i} className="flex justify-center">
                <img
                  src={src}
                  alt={alts[i] ?? `card-${i}`}
                  className="w-full h-auto rounded-2xl shadow-lg max-w-[90%]"
                />
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="relative mb-6">
        <div className="-mx-4 px-4">
          <div
            ref={ref}
            className="no-scrollbar grid grid-flow-col auto-cols-[100%] sm:auto-cols-[50%] md:auto-cols-[33.333%] gap-8 overflow-x-auto snap-x snap-mandatory py-2"
          >
            {items.map((src, i) => (
              <div key={i} className="snap-start flex justify-center">
                <img
                  src={src}
                  alt={alts[i] ?? `card-${i}`}
                  className="w-full h-auto rounded-2xl shadow-lg max-w-[90%] sm:max-w-[420px] md:max-w-[320px] lg:max-w-[360px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Left / Right nav buttons */}
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-opacity duration-200 hover:bg-white/20 focus:outline-none ${page === 0 ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-opacity duration-200 hover:bg-white/20 focus:outline-none ${page >= pages - 1 ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Page indicators (dots) */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: pages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const el = ref.current
                if (!el) return
                el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' })
              }}
              aria-label={`Go to page ${idx + 1}`}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${idx === page ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="py-20 bg-[linear-gradient(to_bottom_right,_#0f0f0f_0%,_#6d00f1_100%)] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Solving real problems<br />
            traders face
          </h2>
        </div>

        {/* Problem Cards - horizontal scroll (3-per-view) */}
        <ScrollRow
          items={[card1, card2, card3, card3]}
          alts={[
            'Trading Problem 1',
            'Trading Problem 2',
            'Trading Problem 3',
            'Trading Problem 4',
          ]}
        />

        {/* Solutions Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Fixing the Flaws in<br />
            Social Trading
          </h2>
        </div>

        {/* Solution Cards - horizontal scroll (3-per-view) */}
        <ScrollRow
          items={[card4, card5, card6, card6]}
          alts={[
            'Solution 1 - Verified Providers',
            'Solution 2 - AI Signal Copier',
            'Solution 3 - Transparent Reviews',
            'Solution 4 - More',
          ]}
        />
      </div>
    </section>
  )
}

export default ProblemsSection