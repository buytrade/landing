import React from 'react'

const Contact: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Contact section will be customized based on your design
        </p>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
          Contact Us
        </button>
      </div>
    </section>
  )
}

export default Contact