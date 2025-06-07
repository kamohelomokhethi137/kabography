import React from 'react'
import Typewriter from '../components/Typewriter'
function Gallery() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <Typewriter />
      <p className="mt-4 text-lg">We are currently under construction. Stay tuned!</p>
    </div>
  )
}

export default Gallery