import React, { useId, useState } from 'react'

type Props = {
  variant?: 'inline' | 'button'
  placeholder?: string
  className?: string
}

const validateEmail = (email: string) => {
  // simple regex, good enough for UI validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const EmailSignup: React.FC<Props> = ({ variant = 'inline', placeholder = 'Enter your email address', className = '' }) => {
  const id = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const API_BASE = (import.meta as any).env?.VITE_API_BASE ?? 'http://localhost:4000'
  if (typeof window !== 'undefined') {
    // debug to help diagnose missing env values in dev
    // eslint-disable-next-line no-console
    console.debug('EmailSignup: API_BASE', API_BASE, 'import.meta.env:', (import.meta as any).env)
  }
  function handleOpenModal(fromButton = false) {
    // if opening from header button we want modal input shown if no email yet
    setError(null)
    setShowModal(true)
    if (fromButton) {
      // keep email as-is (likely empty)
    }
  }

  function handleInlineSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    setError(null)
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    setShowModal(true)
  }

  function handleConfirm() {
    // call backend API
    ;(async () => {
      setError(null)
      if (!validateEmail(email)) {
        setError('Please enter a valid email address')
        return
      }
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/api/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
        const body = await res.json().catch(() => ({}))
        if (!res.ok) {
          setError(body?.error || 'Server error')
          return
        }
        // success (201 or 200)
        setSubmitted(true)
      } catch (err) {
        console.error('signup error', err)
        setError('Network error. Please try again.')
      } finally {
        setLoading(false)
      }
    })()
  }

  return (
    <div className={`email-signup ${className}`}>
      {variant === 'inline' ? (
        <form onSubmit={handleInlineSubmit} className="w-full">
          <div className="flex flex-row gap-3 items-center">
            <input
              id={`email-${id}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              aria-invalid={!!error}
              aria-describedby={error ? `email-error-${id}` : undefined}
              className={`border-none flex-1 px-4 py-3 rounded-lg bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none ${error ? 'ring-2 ring-red-400 bg-black/20' : 'focus:ring-2 focus:ring-transparent'}`}
            />
            <button
              onClick={handleInlineSubmit}
              type="submit"
              className={`bg-white text-purple-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center ${loading ? 'opacity-60 pointer-events-none' : 'hover:bg-opacity-90'}`}
              disabled={loading}
            >
              {/* text on sm+; icon on mobile */}
              <span className="hidden sm:inline mr-2">Join the waitlist</span>
              <svg className="sm:hidden w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M7 17L17 7" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 7h10v10" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {/* Render error full-width below input/button so it doesn't squeeze the row */}
          {error && (
            <div id={`email-error-${id}`} className="text-sm text-red-400 mt-2 text-center sm:text-left">
              {error}
            </div>
          )}
        </form>
      ) : (
        <>
          <button
            onClick={() => handleOpenModal(true)}
            className={`bg-teal-500 text-white px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center ${loading ? 'opacity-60 pointer-events-none' : 'hover:bg-opacity-90'}`}
            disabled={loading}
          >
            <span className="hidden sm:inline">Join the waitlist</span>
            <svg className="sm:hidden w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => { setShowModal(false); setSubmitted(false); }} />

          <div className="relative z-10 w-full max-w-xl rounded-xl bg-gradient-to-br from-gray-900 to-purple-900 p-6 text-white">
            {!submitted ? (
              <>
                <h3 className="text-xl font-semibold mb-4">Confirm your email</h3>

                <div className="mb-4">
                  <label htmlFor={`modal-email-${id}`} className="sr-only">Email</label>
                  <input
                    id={`modal-email-${id}`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-lg bg-black/30 placeholder-white placeholder-opacity-70 text-white focus:outline-none"
                  />
                  {error && <div className="text-sm text-red-400 mt-2 ml-4">{error}</div>}
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => { setShowModal(false); setSubmitted(false); }}
                    className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!validateEmail(email)) { setError('Please enter a valid email address'); return }
                      handleConfirm()
                    }}
                    className={`px-4 py-2 rounded-md bg-white text-purple-700 font-semibold ${loading ? 'opacity-60 pointer-events-none' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Confirm'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h4 className="text-lg font-semibold mb-2">You're on the list!</h4>
                <p className="text-sm text-white/80 mb-4">We'll notify <strong>{email}</strong> when BuyTrade launches.</p>
                <div className="flex justify-center">
                  <button
                    onClick={() => { setShowModal(false); setSubmitted(false); setEmail('') }}
                    className="px-4 py-2 rounded-md bg-white text-purple-700 font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default EmailSignup
