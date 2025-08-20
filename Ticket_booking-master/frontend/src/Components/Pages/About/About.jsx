import React from 'react'
import Header from '../../Common/Layout/Header/Header'
import PageTop from '../../Common/PageTop/PageTop'
import Services from './Service/Services'
import BookingSteps from './BookingSteps/BookingSteps'
import Footer from '../../Common/Layout/Footer/Footer'
import AboutCompany from './AboutCompany/AboutCompany'
import { MdHPlusMobiledata } from 'react-icons/md'
import Homefeatures from '../Home/Homefeatures/Homefeatures'
import HeroSection from '../Home/HeroSection/HeroSection'

const About = () => {
  return (
    <div>
      <Header/>
      <PageTop  title={"About"}/>
      <AboutCompany/>
      <Homefeatures/>
      <Services/>
      <HeroSection/>
      <BookingSteps/>
      <Footer/>
    </div>
  )
}

export default About
