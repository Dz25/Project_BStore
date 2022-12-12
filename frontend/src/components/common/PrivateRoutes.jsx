import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import DataContext from '../context/DataContext'

function PrivateRoutes() {
    const {user} = useContext(DataContext)
  return (
    
    user.isAdmin ? <Outlet/> : <Navigate to='/' />
  )
}

export default PrivateRoutes