import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';
import axios from 'axios';
import ENV from '../../config.json'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

const Studios = () => {
    new DataTable('#dataTable');
    const [studios, setstudios] = useState([])
    const api = ENV.BASE_URL + 'studios'

    useEffect(() => {
        const fetchstudio = async () => {
            try {
                const response = await axios.get(api);
                setstudios(response.data);
            } catch (error) {
                console.log("Error fetching studio:" + error);
            }
        };

        fetchstudio();
    }, []);

    const handleDelete = async (slug) => {
        try {
            await axios.delete(api + '/' + slug);
            useNavigate('/admin/studios')
        } catch (error) {
            console.log("Error deleting studio: " + error);
        }
    };
    return (
        <>
            <div>
                <AdminHeader />
                <div className="container-fluid bg-light dashboard">
                    <div className="row">
                        <AdminSidebar />
                        <main className="col-md ms-sm-auto px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Studios list</h1>
                                <Link className="btn btn-primary btn-sm" to="/admin/studios/add"><i className="fa-solid fa-plus"></i> Add</Link>
                            </div>
                            {studios.length === 0 ? (
                                <div className="alert alert-info">No data found yet</div>
                            ) : (
                                <table className="table table-bordered" id='dataTable'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Image</th>
                                            <th>Posted date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studios.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.title}</td>
                                                <td>{item.description.slice(0, 49)}</td>
                                                <td><img src={ENV.BASE_URL + item.image} alt="" width='100px' /></td>
                                                <td>{item.posted_date}</td>
                                                <td>
                                                    <Link to={`/admin/studios/edit/${item.slug}`} className="btn btn-info btn-sm me-1"><i className="fa fa-pencil"></i></Link>
                                                    <button onClick={() => handleDelete(item.slug)} className="btn btn-danger btn-sm me-1"><i className="fa fa-trash"></i></button>
                                                </td>
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
    )
}

export default Studios