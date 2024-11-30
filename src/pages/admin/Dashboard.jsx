import React from 'react'
import AdminHeader from '../../components/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar'
import AdminFooter from '../../components/AdminFooter'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <>
            <div>
                <AdminHeader />
                <div className="container-fluid bg-light dashboard">
                    <div className="row">
                        <AdminSidebar />
                        <main className="col-md ms-sm-auto px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Dashboard</h1>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-3 text-center">
                                                    <i className="fa-solid fa-file fa-5x text-forth"></i>
                                                </div>
                                                <div className="col-9 my-auto">
                                                    <h4>Appointment Leads</h4>
                                                    <Link className="dropdown-item" to="/admin/appointment">View list <i className="fa-solid fa-chevron-right"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-3 text-center">
                                                    <i className="fa-solid fa-file fa-5x text-forth"></i>
                                                </div>
                                                <div className="col-9 my-auto">
                                                    <h4>Contact Leads</h4>
                                                    <Link className="dropdown-item" to="/admin/contact">View list <i className="fa-solid fa-chevron-right"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <AdminFooter />
            </div>
        </>
    )
}

export default Dashboard