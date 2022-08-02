import React from 'react'
import { Navigate } from 'react-router-dom'
import AddProduct from './AddProduct/AddProduct'

const PrivateRoute = ({children}) => {
  return (
    <div>
        {localStorage.getItem("token")? children : <Navigate to = "/login" />}
    </div>
  )
}

export default PrivateRoute