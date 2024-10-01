import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux'
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import AuthLayout from "./components/AuthLayout.jsx"
import Addcontest from "./pages/Addcontest.jsx"
import Deleteprev from "./pages/Deleteprev.jsx"
import Addorg from "./pages/Addorg.jsx"

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/login",
      element: (
        <AuthLayout authentication={false}>
          <Login/>
        </AuthLayout>
      )
    },
    {
      path: "/Addcontest",
      element: (
        <AuthLayout authentication={true}>
          <Addcontest/>
        </AuthLayout>
      )
    },
    {
      path: "/clean",
      element: (
        <AuthLayout authentication={true}>
          <Deleteprev/>
        </AuthLayout>
      )
    },
    {
      path: "/addorg",
      element: (
        <AuthLayout authentication={true}>
          <Addorg/>
        </AuthLayout>
      )
    },
  ]
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>  
  </React.StrictMode>,
)
