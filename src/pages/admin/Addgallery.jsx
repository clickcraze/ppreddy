import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';
import ENV from '../../config.json';

const AddGallery = () => {
    const api = ENV.BASE_URL + 'gallery/create';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        image: null,
        category: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoto = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('name', formData.name);
            form.append('image', formData.image);
            form.append('category', formData.category);

            await axios.post(api, form);
            setSuccessMessage('Gallery created successfully');
            setTimeout(() => {
                navigate('/admin/gallery');
            }, 2000);
        } catch (error) {
            console.error('Error submitting gallery:', error);
            setErrorMessage('Failed to create gallery. Please try again.');
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
                            <h1 className="h2">Add Gallery</h1>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" className="form-control" name='name' value={formData.name} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" className="form-control" name='image' accept='.png, .jpg, .jpeg' onChange={handlePhoto} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Category</label>
                                        <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
                                            <option value="">Select Category</option>
                                            <option value="Rehabilitation">Rehabilitation</option>
                                            <option value="Aquatherapy">Aquatherapy</option>
                                            <option value="Events">Events</option>
                                            <option value="Happy Patients">Happy Patients</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <button type='submit' className="btn btn-success">Submit</button>
                                </form>
                                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <AdminFooter />
        </div>
    );
};

export default AddGallery;
