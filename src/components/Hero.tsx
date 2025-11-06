import React from 'react'
import phoneImage from '../assets/phone.png'
import EmailSignup from './EmailSignup'
import heroBg from '../assets/hero-bt.png'

const Hero: React.FC = () => {
  return (
    <section
      className="min-h-screen relative overflow-hidden text-white"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundColor: '#1a0036',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Optional soft glow blur overlay for realism */}
      <div
        className="absolute inset-0 blur-3xl opacity-30"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.45))',
        }}
      ></div>

      {/* Background Pattern/Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="container mt-12 mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          <div className="space-y-8 max-w-4xl">
            {/* Tags */}
            <div className="vta w-4/5 sm:w-1/2 mx-auto">
              <div className="flex gap-1 sm:gap-2 justify-center px-1 py-1">
                <span className="bg-opacity-20 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                  Verified
                  <span className="mr-2">→</span>
                </span>
                <span className="bg-opacity-20 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                  Transparent
                  <span className="mr-2">→</span>
                </span>
                <span className="bg-opacity-20 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                  Automated
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Turn Trading Signals<br />
              into Real Profits.
            </h1>

            <p className="text-lg md:text-xl text-white text-opacity-90 max-w-2xl mx-auto">
              BuyTrade connects retail traders with verified trading service providers — signals, copy trading, mentorship, and tools — all in one secure AI-powered platform.
            </p>

            {/* Email Signup */}
            <div className="flex flex-row gap-4 max-w-md mx-auto form-border">
              <EmailSignup />
            </div>
          </div>

          {/* Phone Image */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={phoneImage}
                alt="BuyTrade Mobile App"
                className="w-80 h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
