import React from 'react'
import yt from '../assets/logo-youtube.svg'
import fb from '../assets/logo-facebook.svg'
import ig from '../assets/logo-instagram.svg'
import tg from '../assets/logo-telegram.svg'
import tt from '../assets/logo-tiktok.svg'

const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-[linear-gradient(to_bottom_right,_#6d00f1_0%,_#6d00f1_100%)] text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4 mb-6">
          <a href="https://youtube.com/@buytradeapp?si=HIjqXNmht9GIRlKO" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
            <img src={yt} alt="YouTube" className="w-6 h-6" />
          </a>

          <a href="https://www.facebook.com/profile.php?id=61581503679841" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
            <img src={fb} alt="Facebook" className="w-6 h-6" />
          </a>

          <a href="https://www.instagram.com/buytradeapp?igsh=MXdwcXRlNXJubGVjbQ==" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
            <img src={ig} alt="Instagram" className="w-6 h-6" />
          </a>

          <a href="https://t.me/buytradeappforfreesignals" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
            <img src={tg} alt="Telegram" className="w-6 h-6" />
          </a>

          <a href="https://www.tiktok.com/@buytradeapp?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
            <img src={tt} alt="TikTok" className="w-6 h-6" />
          </a>
        </div>
       
        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white border-opacity-20">
          <p className="text-white text-opacity-60 text-sm">
            © 2025 BuyTrade. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer