import React from 'react'
import {useDispatch} from"react-redux"
import authService from "../../appwrite/Auth.js"
import {logout} from "../../store/authSlice.js"

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const logoutHandler = ()=>{
    authService.logout().then(()=>{
      dispatch(logout());
    });
  }
  return (
    <button 
      className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn