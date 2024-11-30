import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import axios from 'axios';
import ENV from '../config.json';

const Header = () => {
    const [services, setServices] = useState([]);
    const [studios, setStudios] = useState([]);
    const [adminNav, setAdminNav] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [studiosOpen, setStudiosOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);

    const api = ENV.BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        const fetchServices = async () => {
            try {
                const response = await axios.get(api + 'services');
                setServices(response.data);
            } catch (error) {
                console.log("Error fetching services: " + error);
            }
        };

        const fetchStudios = async () => {
            try {
                const response = await axios.get(api + 'studios');
                setStudios(response.data);
            } catch (error) {
                console.log("Error fetching studios: " + error);
            }
        };

        fetchServices();
        fetchStudios();

        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            setAdminNav(true);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    const handleMouseEnter = (setOpen) => {
        if (!isMobile) {
            setOpen(true);
        }
    };

    const handleMouseLeave = (setOpen) => {
        if (!isMobile) {
            setOpen(false);
        }
    };

    return (
        <>
            <div className="scroll-watcher"></div>
            {adminNav && (
                <div className="bg-dark">
                    <div className="container-fluid py-0">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link className="nav-link text-white py-0" to="/admin">
                                    <i className="fa-solid fa-dashboard"></i> Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white py-0" to="/admin/blogs/add">
                                    <i className="fa-solid fa-blog"></i> Add blog
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white py-0" to="/admin/gallery/add">
                                    <i className="fa-solid fa-images"></i> Add Gallery
                                </Link>
                            </li>
                            <li className="nav-item ms-auto">
                                <a className="nav-link text-white py-0" href="#" onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top navbar-main py-0">
                <div className="container-fluid">
                    <a className="navbar-brand py-0" href="/">
                        <img src={logo} className='logo' alt="logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link text-uppercase fw-bolder py-3 px-4" to="/" activeclassname="active">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-uppercase fw-bolder py-3 px-4" to="/about" activeclassname="active">About</NavLink>
                            </li>
                            <li className="nav-item dropdown" onMouseEnter={() => handleMouseEnter(setServicesOpen)} onMouseLeave={() => handleMouseLeave(setServicesOpen)}>
                                <a className="nav-link text-uppercase fw-bolder py-3 px-4 dropdown-toggle" href="#" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded={servicesOpen ? "true" : "false"}>
                                    Services
                                </a>
                                <ul className={`dropdown-menu shadow-lg border-0 ${servicesOpen ? 'show' : ''}`} aria-labelledby="servicesDropdown">
                                    {services.map((item, index) => (
                                        <li key={index}><a className="dropdown-item" href={`/services/${item.slug}`} key={index}>{item.subtitle}</a></li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item dropdown" onMouseEnter={() => handleMouseEnter(setStudiosOpen)} onMouseLeave={() => handleMouseLeave(setStudiosOpen)}>
                                <a className="nav-link text-uppercase fw-bolder py-3 px-4 dropdown-toggle" href="#" id="studiosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded={studiosOpen ? "true" : "false"}>
                                    Studios
                                </a>
                                <ul className={`dropdown-menu shadow-lg border-0 ${studiosOpen ? 'show' : ''}`} aria-labelledby="studiosDropdown">
                                    {studios.map((item, index) => (
                                        <li key={index}><a className="dropdown-item" href={`/studios/${item.slug}`} key={index}>{item.subtitle}</a></li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item dropdown" onMouseEnter={() => handleMouseEnter(setGalleryOpen)} onMouseLeave={() => handleMouseLeave(setGalleryOpen)}>
                                <a className="nav-link text-uppercase fw-bolder py-3 px-4 dropdown-toggle" href="#" id="galleryDropdown" role="button" data-bs-toggle="dropdown" aria-expanded={galleryOpen ? "true" : "false"}>
                                    Gallery
                                </a>
                                <ul className={`dropdown-menu shadow-lg border-0 ${galleryOpen ? 'show' : ''}`} aria-labelledby="galleryDropdown">
                                    <li><NavLink className="dropdown-item" to="/gallery">Images Gallery</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/video">Videos Gallery</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-uppercase fw-bolder py-3 px-4" to="/blogs" activeclassname="active">Blogs</NavLink>
                            </li>
                            <li className="nav-item my-auto">
                                <NavLink className="btn btn-third rounded-pill px-5 text-uppercase fw-bolder" to="/contact">Contact Us</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
