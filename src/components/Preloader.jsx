import React from 'react'
import logo from '../assets/images/logo.png'

const Preloader = () => {
    return (
        <div className="preloader">
            <img src={logo} className='logo' alt="Logo" />
        </div>
    )
}

export default Preloader