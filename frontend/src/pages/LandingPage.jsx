import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import HowItWorks from '../components/HowItWorks'
import Whychoose from '../components/WhyChoose'
import Footer from '../components/Footer'
import Blog from '../components/Blog/Blog'
import ReadyToBoost from '../components/ReadyToBoost'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-roboto">
      <Header/>
      <Hero/>
      <HowItWorks/>
      <Whychoose/>
      <ReadyToBoost/>
      <Blog/>
      <Footer />
    </div>
  )
}

export default LandingPage