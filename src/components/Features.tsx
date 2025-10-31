import React, { useState } from 'react'
import card7 from '../assets/card7.png'
import card8 from '../assets/card8.png'
import card9 from '../assets/card9.png'
import card10 from '../assets/card10.png'

const Features: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const cards = [card7, card8, card9, card10]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cards.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-purple-700 via-purple-600 to-teal-500">
      <div className="container mx-auto px-4">
        <div className="text-center text-white mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for<br />
            Smarter Trading
          </h2>
        </div>

        {/* Features Slider */}
        <div className="relative mb-16 max-w-2xl mx-auto">
          {/* Slider Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {cards.map((card, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img 
                    src={card} 
                    alt={`Feature ${index + 1}`}
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 backdrop-blur-sm rounded-full p-3 text-white shadow-lg transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 backdrop-blur-sm rounded-full p-3 text-white shadow-lg transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-white' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Future of Trading
          </h2>
          <p className="text-lg text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Be the first to experience BuyTrade, the secure social trading app built for smart traders, signal providers, and smart investors.
          </p>
          
          {/* Email Signup */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8 form-border">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-opacity-20 border-none text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-transparent"
            />
            <button className="bg-white text-purple-700 px-6 py-3 rounded-4xl font-semibold hover:bg-opacity-90 transition-all duration-300">
              join the waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features