import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-700 via-purple-600 to-teal-500 text-white py-16">
      <div className="container mx-auto px-4">
       
        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white border-opacity-20">
          <p className="text-white text-opacity-60 text-sm">
            © 2024 BuyTrade. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer