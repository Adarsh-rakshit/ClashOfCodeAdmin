import React from 'react'
import ContestForm from "../components/allforms/ContestForm"
import HeaderBar from '../components/header/HeaderBar'
const Addcontest = () => {
  return (
    <div className=''>
      <HeaderBar/>
      <div className='mb-5 text-xl text-gray-100'>
          CONTEST FORM
      </div>
      <ContestForm/>
    </div>
  )
}

export default Addcontest