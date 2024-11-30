import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';
import ENV from '../../config.json';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

const Metas = () => {
    new DataTable('#dataTable');
    const [metas, setMetas] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const api = ENV.BASE_URL + 'meta';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const response = await axios.get(api);
                setMetas(response.data);
            } catch (error) {
                console.log('Error fetching metas:', error);
            }
        };

        fetchMeta();
    }, [api]);

    const handleDelete = async (_id) => {
        try {
            await axios.delete(api + '/' + _id);
            setSuccessMessage('Meta tag deleted successfully');
            setTimeout(() => {
                // navigate('/admin/metas');
                location.reload()
                setSuccessMessage('')
            }, 2000);
        } catch (error) {
            console.log("Error deleting meta: " + error);
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
                                <h1 className="h2">Meta tags list</h1>
                                <Link className="btn btn-primary btn-sm" to="/admin/metas/add"><i className="fa-solid fa-plus"></i> Add</Link>
                            </div>
                            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                            {metas.length === 0 ? (
                                <div className="alert alert-info">No data found yet</div>
                            ) : (
                                <table className="table table-bordered" id='dataTable'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Page</th>
                                            <th>Meta Title</th>
                                            <th>Meta Description</th>
                                            <th>Meta Keywords</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {metas.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.page}</td>
                                                <td>{item.meta_title}</td>
                                                <td>{item.meta_description}</td>
                                                <td>{item.meta_keywords}</td>
                                                <td>
                                                    <Link to={`/admin/metas/edit/${item._id}`} className="btn btn-info btn-sm me-1"><i className="fa fa-pencil"></i></Link>
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
        </>
    )
}

export default Metas