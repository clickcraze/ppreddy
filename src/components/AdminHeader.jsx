import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { Helmet } from 'react-helmet'

const AdminHeader = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };
  return (
    <>
      <Helmet>
        <title>Admin - Dashboard</title>
        <meta name='description' content='PP Reddy Rehab Care in Hyderabad' />
      </Helmet>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link className="navbar-brand col-md-2 text-center" to="/admin">
          <h2 className='text-light text-uppercase fw-bold mb-0'>Admin panel</h2>
        </Link>
        <ul className='navbar-nav ms-auto mb-2 mb-lg-0 px-3'>
          <li className="nav-item">
            <a className="nav-link text-light" href='#' onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </header>
    </>
  )
}

export default AdminHeader