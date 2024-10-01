import React from 'react'
import HeaderBar from "../components/header/HeaderBar"
import LogoutBtn from '../components/header/LogoutBtn'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderBar/>
    </>
  )
}

export default Home