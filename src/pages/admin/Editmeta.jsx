import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';
import ENV from '../../config.json';

const Editmeta = () => {
    const { id } = useParams();
    const [meta, setMeta] = useState({
        page: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: ''
    });
    const api = `${ENV.BASE_URL}meta/`;

    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const response = await axios.get(`${api}${id}`);
                setMeta(response.data);
            } catch (error) {
                console.log('Error fetching meta:', error);
            }
        };

        fetchMeta();
    }, [api, id]);

    const handleChange = (e) => {
        setMeta({ ...meta, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${api}${id}`, meta);
            setSuccessMessage('Meta updated successfully');
            setTimeout(() => {
                navigate('/admin/metas');
            }, 2000);
        } catch (error) {
            console.log('Error updating meta:', error);
        }
    };

    return (
        <>
            <AdminHeader />
            <div className='container-fluid bg-light dashboard'>
                <div className="row">
                    <AdminSidebar />
                    <main className='col-md ms-sm-auto px-md-4'>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Edit Meta tag</h1>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Page</label>
                                        <input type="text" className="form-control" name='page' value={meta.page} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta Title</label>
                                        <input type="text" className="form-control" name='meta_title' value={meta.meta_title} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta Description</label>
                                        <input type="text" className="form-control" name='meta_description' value={meta.meta_description} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta Keywords</label>
                                        <input type="text" className="form-control" name='meta_keywords' value={meta.meta_keywords} onChange={handleChange} />
                                    </div>
                                    <button type='submit' className="btn btn-success">Update</button>
                                </form>
                                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <AdminFooter />
        </>
    );
}

export default Editmeta;
