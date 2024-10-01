import React from 'react'
import "./App.css"
import {Outlet} from "react-router-dom"
const App = () => {
  return (
    <>
      <div>
        <main>
          <Outlet/>
        </main>
      </div>
    </>
  )
}

export default App