import React, { useState, useRef, useEffect } from 'react'
import EmailSignup from './EmailSignup'
import card7 from '../assets/card7.png'
import card8 from '../assets/card8.png'
import card9 from '../assets/card9.png'
import card10 from '../assets/card10.png'

const Features: React.FC = () => {
  const cards = [card7, card8, card9, card10]

  // Reusable scroll row similar to ProblemsSection
  const ScrollRow: React.FC<{ items: string[]; alts?: string[] }> = ({ items, alts = [] }) => {
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
      const targetPage = Math.max(0, Math.min(pages - 1, page + dir))
      el.scrollTo({ left: targetPage * vw, behavior: 'smooth' })
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
                  alt={alts[i] ?? `feature-${i}`}
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
                  alt={alts[i] ?? `feature-${i}`}
                  className="w-full h-auto rounded-2xl shadow-lg max-w-[90%] sm:max-w-[420px] md:max-w-[320px] lg:max-w-[360px]"
                />
              </div>
            ))}
          </div>
        </div>

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

        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: pages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const el = ref.current
                if (!el) return
                el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' })
                setPage(idx)
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
     <section className="py-20 bg-[linear-gradient(to_bottom_right,_#1f0c36_0%,_#6d00f1_100%)] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center text-white mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for<br />
            Smarter Trading
          </h2>
        </div>

        {/* Features Slider (ScrollRow) */}
        <ScrollRow
          items={cards}
          alts={['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']}
        />

        {/* Bottom Section */}
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Future of Trading
          </h2>
          <p className="text-lg text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Be the first to experience BuyTrade, the secure social trading app built for smart traders, signal providers, and smart investors.
          </p>
          
          {/* Email Signup */}
          <div className="flex flex-row gap-4 max-w-md mx-auto mb-8 form-border">
            <EmailSignup />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features