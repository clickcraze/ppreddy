import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';
import ENV from '../../config.json';

const AddStudio = () => {
    const api = ENV.BASE_URL + 'studios/create';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        description1: '',
        short: '',
        image: null,
        image1: null,
        experts: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoto = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handlePhoto1 = (e) => {
        setFormData({ ...formData, image1: e.target.files[0] });
    };

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('title', formData.title);
            form.append('subtitle', formData.subtitle);
            form.append('description', formData.description);
            form.append('description1', formData.description1);
            form.append('short', formData.short);
            form.append('image', formData.image);
            form.append('image1', formData.image1);
            form.append('experts', formData.experts);
            form.append('slug', slugify(formData.title));
            form.append('meta_title', formData.meta_title);
            form.append('meta_description', formData.meta_description);
            form.append('meta_keywords', formData.meta_keywords);

            await axios.post(api, form);
            setSuccessMessage('Studio created successfully');
            setTimeout(() => {
                navigate('/admin/studios');
            }, 2000);
        } catch (error) {
            console.error('Error submitting studio:', error);
            setErrorMessage('Failed to submit studio');
        }
    };

    const slugify = (title) => {
        return title.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <div>
            <AdminHeader />
            <div className='container-fluid bg-light dashboard'>
                <div className="row">
                    <AdminSidebar />
                    <main className='col-md ms-sm-auto px-md-4'>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Add Studio</h1>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                    <div className="form-group mb-3">
                                        <label>Title</label>
                                        <input type="text" className="form-control" name='title' value={formData.title} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Sub Title</label>
                                        <input type="text" className="form-control" name='subtitle' value={formData.subtitle} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Short description</label>
                                        <input type="text" className="form-control" name='short' value={formData.short} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Description</label>
                                        <CKEditor editor={ClassicEditor} name='description' data={formData.description} onChange={(event, editor) => { const data = editor.getData(); setFormData({ ...formData, description: data }); }} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Description 1</label>
                                        <CKEditor editor={ClassicEditor} name='description1' data={formData.description1} onChange={(event, editor) => { const data = editor.getData(); setFormData({ ...formData, description1: data }); }} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" className="form-control" name='image' accept='.png, .jpg, .jpeg' onChange={handlePhoto} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Image 1</label>
                                        <input type="file" className="form-control" name='image1' accept='.png, .jpg, .jpeg' onChange={handlePhoto} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Experts message</label>
                                        <CKEditor editor={ClassicEditor} name='experts' data={formData.experts} onChange={(event, editor) => { const data = editor.getData(); setFormData({ ...formData, experts: data }); }} />
                                    </div>
                                    <hr />
                                    <h4>SEO meta tags</h4>
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

export default AddStudio;
