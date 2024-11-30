import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';
import ENV from '../../config.json';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

const Blogs = () => {
    new DataTable('#dataTable');
    const [blogs, setBlogs] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const api = ENV.BASE_URL + 'blogs';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(api);
                setBlogs(response.data);
            } catch (error) {
                console.log('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, [api]);

    const handleDelete = async (slug) => {
        try {
            await axios.delete(api + '/' + slug);
            setSuccessMessage('Blog deleted successfully');
            setTimeout(() => {
                // navigate('/admin/blogs');
                location.reload()
                setSuccessMessage('')
            }, 2000);
        } catch (error) {
            console.log("Error deleting blog: " + error);
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
                                <h1 className="h2">Blogs list</h1>
                                <Link className="btn btn-primary btn-sm" to="/admin/blogs/add"><i className="fa-solid fa-plus"></i> Add</Link>
                            </div>
                            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                            {blogs.length === 0 ? (
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
                                        {blogs.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.title}</td>
                                                <td>{item.description.slice(0, 49)}</td>
                                                <td><img src={ENV.BASE_URL + item.image} alt="" width='100px' /></td>
                                                <td>{item.posted_date}</td>
                                                <td>
                                                    <Link to={`/admin/blogs/edit/${item.slug}`} className="btn btn-info btn-sm me-1"><i className="fa fa-pencil"></i></Link>
                                                    <button className="btn btn-danger btn-sm me-1" onClick={() => handleDelete(item.slug)}><i className="fa fa-trash"></i></button>
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
    );
}

export default Blogs;
