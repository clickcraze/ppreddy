import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';
import axios from 'axios';
import ENV from '../../config.json'
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

const Appointment = () => {
    new DataTable('#dataTable');
    const [appointments, setAppointments] = useState([]);
    const api = ENV.BASE_URL + 'appointment'

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(api);
                setAppointments(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("Error fetching appointment:" + error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <>
            <div>
                <AdminHeader />
                <div className="container-fluid bg-light dashboard">
                    <div className="row">
                        <AdminSidebar />
                        <main className="col-md ms-sm-auto px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Appointments lead list</h1>
                            </div>
                            {appointments.length === 0 ? (
                                <div className="alert alert-info">No data found yet</div>
                            ) : (
                                <table className="table table-bordered" id='dataTable'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Service</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.mobile}</td>
                                                <td>{item.service}</td>
                                                <td>{item.posted_date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </main>
                    </div>
                </div>
                <AdminFooter />
            </div>
        </>
    );
};

export default Appointment;