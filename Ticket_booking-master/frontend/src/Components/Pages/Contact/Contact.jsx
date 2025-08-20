import React from 'react'
import Header from '../../Common/Layout/Header/Header'
import PageTop from '../../Common/PageTop/PageTop'
import Footer from '../../Common/Layout/Footer/Footer'
import ContactRef from "./ContactRef/ContactRef"
import ContactMap from './ContactMap/ContactMap'

const Contact = () => {
  return (
    <div>
        <Header/>
        <PageTop title={"Contact"}/>
      <ContactRef/>
      <ContactMap/>
        <Footer/>
    </div>
  )
}

export default Contact