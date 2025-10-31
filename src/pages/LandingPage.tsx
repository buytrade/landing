import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ProblemsSection from '../components/ProblemsSection'
import Features from '../components/Features'
import Footer from '../components/Footer'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProblemsSection />
      <Features />
      <Footer />
    </div>
  )
}

export default LandingPage