import React from 'react'
import EmailSignup from './EmailSignup'

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50  bg-opacity-95 backdrop-blur-sm">
      <div className="w-4/5 sm:w-1/2 mx-auto">
        <div className="flex justify-between items-center header">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-white text-lg sm:text-xl font-bold">BUY</span>
            <span className="text-teal-400 text-lg sm:text-xl font-bold">TRADE</span>
          </div>
          
          {/* Join Waitlist (modal) */}
          <EmailSignup variant="button" />
        </div>
      </div>
    </header>
  )
}

export default Header