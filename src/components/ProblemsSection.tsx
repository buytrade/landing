import React from 'react'
import card1 from '../assets/card1.png'
import card2 from '../assets/card2.png'
import card3 from '../assets/card3.png'
import card4 from '../assets/card4.png'
import card5 from '../assets/card5.png'
import card6 from '../assets/card6.png'

const ProblemsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Solving real problems<br />
            traders face
          </h2>
        </div>

        {/* Problem Cards - Top Row */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="flex justify-center">
            <img 
              src={card1} 
              alt="Trading Problem 1"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
          
          <div className="flex justify-center">
            <img 
              src={card2} 
              alt="Trading Problem 2"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
          
          <div className="flex justify-center">
            <img 
              src={card3} 
              alt="Trading Problem 3"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Solutions Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Fixing the Flaws in<br />
            Social Trading
          </h2>
        </div>

        {/* Solution Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex justify-center">
            <img 
              src={card4} 
              alt="Solution 1 - Verified Providers"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>

          <div className="flex justify-center">
            <img 
              src={card5} 
              alt="Solution 2 - AI Signal Copier"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>

          <div className="flex justify-center">
            <img 
              src={card6} 
              alt="Solution 3 - Transparent Reviews"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemsSection