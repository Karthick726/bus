import React from 'react'
import HomeCarsoual from './HomeCarsoual/HomeCarsoual'
import Header from '../../Common/Layout/Header/Header'
import Footer from '../../Common/Layout/Footer/Footer'
import BookingSteps from '../About/BookingSteps/BookingSteps'
import PackageDetails from './PackageDetails/PackageDetails'
import Services from '../About/Service/Services'
import AboutCompany from '../About/AboutCompany/AboutCompany'
import Homefeatures from './Homefeatures/Homefeatures'
import HeroSection from './HeroSection/HeroSection'
import OfferPopup from './Popup/Popup'

const Home = () => {
  return (
    <div>
      <Header/>
      <OfferPopup/>
      <HomeCarsoual/>
      <div className='adjust-home'>
        <PackageDetails/>
      </div>
      <AboutCompany/>
      <Homefeatures/>
      <div>
    <Services/>
   <HeroSection/>
      <BookingSteps/>
      </div>
  
    
   <Footer/>
   
   
    </div>
  )
}

export default Home
