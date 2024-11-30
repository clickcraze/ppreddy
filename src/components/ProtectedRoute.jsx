import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate()

    useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn')

      if (!isLoggedIn) {
        navigate('/login')
      }
    }, [navigate])
    
  return (
    <>{children}</>
  )
}

export default ProtectedRoute