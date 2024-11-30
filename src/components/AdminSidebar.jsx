import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
    const [toggleSidebar, settoggleSidebar] = useState(false)
    const toggleSidebarBtn = () => {
        if (toggleSidebar === false) {
            settoggleSidebar(true)
        } else {
            settoggleSidebar(false)
        }
    }
    return (
        <>
            <nav id="sidebarMenu" className={`${toggleSidebar === false ? 'col-md-2' : 'w-80px'} d-md-block sidebar bg-first p-0`}>
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/admin">
                                <span className="db-iconbox">
                                    <i className="fa-solid fa-dashboard"></i>
                                </span>
                                {toggleSidebar === false ? 'Dashboard' : ''}
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="db-iconbox">
                                    <i className="fa-solid fa-tags"></i>
                                </span>
                                {toggleSidebar === false ? 'Meta' : ''}
                            </a>
                            <ul className="dropdown-menu w-100">
                                <li><Link className="dropdown-item" to="/admin/metas/add">Add Meta</Link></li>
                                <li><Link className="dropdown-item" to="/admin/metas">Metas List</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="db-iconbox">
                                    <i className="fa-solid fa-blog"></i>
                                </span>
                                {toggleSidebar === false ? 'Blog' : ''}
                            </a>
                            <ul className="dropdown-menu w-100">
                                <li><Link className="dropdown-item" to="/admin/blogs/add">Add Blog</Link></li>
                                <li><Link className="dropdown-item" to="/admin/blogs">Blogs List</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="db-iconbox">
                                    <i className="fa-brands fa-servicestack"></i>
                                </span>
                                {toggleSidebar === false ? 'Services' : ''}
                            </a>
                            <ul className="dropdown-menu w-100">
                                <li><Link className="dropdown-item" to="/admin/services/add">Add Service</Link></li>
                                <li><Link className="dropdown-item" to="/admin/services">Services List</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="db-iconbox">
                                    <i className="fa-brands fa-servicestack"></i>
                                </span>
                                {toggleSidebar === false ? 'Studios' : ''}
                            </a>
                            <ul className="dropdown-menu w-100">
                                <li><Link className="dropdown-item" to="/admin/studios/add">Add Studio</Link></li>
                                <li><Link className="dropdown-item" to="/admin/studios">Studios List</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="db-iconbox">
                                    <i className="fa-solid fa-images"></i>
                                </span>
                                {toggleSidebar === false ? 'Media' : ''}
                            </a>
                            <ul className="dropdown-menu w-100">
                                <li><Link className="dropdown-item" to="/admin/gallery/add">Add Gallery</Link></li>
                                <li><Link className="dropdown-item" to="/admin/gallery">Gallery List</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/admin/icons/add">Add Icon</Link></li>
                                <li><Link className="dropdown-item" to="/admin/icons">Icons List</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="db-iconbox">
                                    <i className="fa-solid fa-file"></i>
                                </span>
                                {toggleSidebar === false ? 'Leads' : ''}
                            </a>
                            <ul className="dropdown-menu w-100">
                                <li><Link className="dropdown-item" to="/admin/appointment">Appointment</Link></li>
                                <li><Link className="dropdown-item" to="/admin/contact">Contact</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item mt-5 text-center">
                            <a className="toggleBtn" onClick={toggleSidebarBtn}>
                                {toggleSidebar === false ?
                                    (
                                        <i className="fa-solid fa-chevron-left"></i>
                                    ) : (
                                        <i className="fa-solid fa-chevron-right"></i>
                                    )
                                }
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default AdminSidebar