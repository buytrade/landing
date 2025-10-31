import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-purple-700 via-purple-600 to-teal-500 bg-opacity-95 backdrop-blur-sm">
      <div className="w-4/5 sm:w-1/2 mx-auto">
        <div className="flex justify-between items-center header">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-white text-lg sm:text-xl font-bold">BUY</span>
            <span className="text-teal-400 text-lg sm:text-xl font-bold">TRADE</span>
          </div>
          
          {/* Join Waitlist Button */}
          <button className="bg-teal-500 text-white px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg transition-shadow cursor-pointer">
            Join the waitlist
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header