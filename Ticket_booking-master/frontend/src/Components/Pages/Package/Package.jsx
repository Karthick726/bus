import React from 'react'
import Header from '../../Common/Layout/Header/Header'
import PageTop from '../../Common/PageTop/PageTop'
import Footer from '../../Common/Layout/Footer/Footer'
import PackageDetails from './PackageDetails/PackageDetails'


const Package = () => {
  return (
    <div>
      <Header/>
      <PageTop title={"Package"}/>
       <PackageDetails/>
      <Footer/>
    </div>
  )
}

export default Package
