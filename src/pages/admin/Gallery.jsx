import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';
import ENV from '../../config.json';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

const Gallery = () => {
    new DataTable('#dataTable');
    const [gallerys, setGallery] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const api = ENV.BASE_URL + 'gallery';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get(api);
                setGallery(response.data);
            } catch (error) {
                console.log('Error fetching gallery:', error);
            }
        };

        fetchGallery();
    }, [api]);

    const handleDelete = async (_id) => {
        try {
            await axios.delete(api + '/' + _id);
            setSuccessMessage('Gallery deleted successfully');
            setTimeout(() => {
                // navigate('/admin/gallerys');
                location.reload()
                setSuccessMessage('')
            }, 2000);
        } catch (error) {
            console.log("Error deleting gallery: " + error);
        }
    };

    return (
        <div>
            <AdminHeader />
            <div className="container-fluid bg-light dashboard">
                <div className="row">
                    <AdminSidebar />
                    <main className="col-md ms-sm-auto px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Gallery list</h1>
                            <Link className="btn btn-primary btn-sm" to="/admin/gallery/add"><i className="fa-solid fa-plus"></i> Add</Link>
                        </div>
                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        {gallerys.length === 0 ? (
                            <div className="alert alert-info">No data found yet</div>
                        ) : (
                            <table className="table table-bordered" id='dataTable'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gallerys.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td><img src={ENV.BASE_URL + item.image} alt="" width='100px' /></td>
                                            <td>
                                                <button className="btn btn-danger btn-sm me-1" onClick={() => handleDelete(item._id)}><i className="fa fa-trash"></i></button>
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
    )
}

export default Gallery