import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';
import ENV from '../../config.json';

const Addmeta = () => {
    const api = ENV.BASE_URL + 'meta/create';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        page: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(api, formData);
            setSuccessMessage('Meta tags created successfully');
            setTimeout(() => {
                navigate('/admin/metas');
            }, 2000);
        } catch (error) {
            console.error('Error submitting meta:', error);
        }
    };

    return (
        <div>
            <AdminHeader />
            <div className='container-fluid bg-light dashboard'>
                <div className="row">
                    <AdminSidebar />
                    <main className='col-md ms-sm-auto px-md-4'>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Add Meta Tag</h1>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Page</label>
                                        <input type="text" className="form-control" name='page' value={formData.page} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta Title</label>
                                        <input type="text" className="form-control" name='meta_title' value={formData.meta_title} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta description</label>
                                        <input type="text" className="form-control" name='meta_description' value={formData.meta_description} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta keywords</label>
                                        <input type="text" className="form-control" name='meta_keywords' value={formData.meta_keywords} onChange={handleChange} />
                                    </div>
                                    <button type='submit' className="btn btn-success">Submit</button>
                                </form>
                                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <AdminFooter />
        </div>
    )
}

export default Addmeta;
