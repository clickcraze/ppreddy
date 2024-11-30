import React, { useState, useEffect, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';
import ENV from '../../config.json';

const EditService = () => {
    const { slug } = useParams();
    const [service, setService] = useState({
        title: '',
        subtitle: '',
        description: '',
        description1: '',
        short: '',
        image: '',
        image1: '',
        icon: '',
        experts: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: ''
    });
    const api = ENV.BASE_URL;

    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const [icons, setIcons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await axios.get(`${api}services/${slug}`);
                setService(response.data);
            } catch (error) {
                console.error('Error fetching service:', error);
            }
            setLoading(false);
        };

        fetchServiceData();

        const fetchIconData = async () => {
            try {
                const response = await axios.get(api + 'icons/');
                setIcons(response.data);
            } catch (error) {
                console.error('Error fetching icons:', error);
            }
        };

        fetchIconData();
    }, [api, slug]);

    const handleChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value });
    };

    const handlePhoto = (e) => {
        setService({ ...service, image: e.target.files[0] });
    };

    const handlePhoto1 = (e) => {
        setService({ ...service, image1: e.target.files[0] });
    };

    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setService({ ...service, description: data });
    };

    const handleDescription1Change = (event, editor) => {
        const data = editor.getData();
        setService({ ...service, description1: data });
    };

    const handleExpertsChange = (event, editor) => {
        const data = editor.getData();
        setService({ ...service, experts: data });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            function slugify(title) {
                return title.toLowerCase().replace(/\s+/g, '-');
            }
            const form = new FormData();
            form.append('title', service.title);
            form.append('subtitle', service.subtitle);
            form.append('description', service.description);
            form.append('description1', service.description1);
            form.append('short', service.short);
            form.append('icon', service.icon);
            form.append('experts', service.experts);
            form.append('slug', slugify(service.title));
            form.append('meta_title', service.meta_title);
            form.append('meta_description', service.meta_description);
            form.append('meta_keywords', service.meta_keywords);
            if (service.image) {
                form.append('image', service.image);
            }
            if (service.image1) {
                form.append('image1', service.image1);
            }
            await axios.put(`${api}services/${slug}`, form);
            setSuccessMessage('Service updated successfully');
            setTimeout(() => {
                navigate('/admin/services');
            }, 2000);
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    const memoizedIcons = useMemo(() => {
        return icons.map((item, index) => (
            <option value={item._id} key={index}>{item.name}</option>
        ));
    }, [icons]);

    return (
        <>
            <AdminHeader />
            <div className='container-fluid bg-light dashboard'>
                <div className="row">
                    <AdminSidebar />
                    <main className='col-md ms-sm-auto px-md-4'>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Edit Service</h1>
                        </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                        <div className="form-group mb-3">
                                            <label>Title</label>
                                            <input type="text" className="form-control" name='title' value={service.title} onChange={handleChange} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Sub Title</label>
                                            <input type="text" className="form-control" name='subtitle' value={service.subtitle} onChange={handleChange} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Description</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                name='description'
                                                data={service.description}
                                                onChange={handleDescriptionChange}
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Description 1</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                name='description1'
                                                data={service.description1}
                                                onChange={handleDescription1Change}
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Short description</label>
                                            <textarea name="short" rows="5" className="form-control" onChange={handleChange}>{service.short}</textarea>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>Image</label>
                                                    <input type="file" className="form-control" name='image' accept='.png, .jpg, .jpeg' onChange={handlePhoto} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>Image 1</label>
                                                    <input type="file" className="form-control" name='image1' accept='.png, .jpg, .jpeg' onChange={handlePhoto1} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>Thumbnail icon</label>
                                                    <select name="icon" className='form-control custom-select' value={service.icon} onChange={handleChange}>
                                                        <option value="">Select icon</option>
                                                        {memoizedIcons}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Experts message</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                name='experts'
                                                data={service.experts}
                                                onChange={handleExpertsChange}
                                            />
                                        </div>
                                        <hr />
                                        <h4>SEO meta tags</h4>
                                        <div className="form-group mb-3">
                                            <label>Meta Title</label>
                                            <input type="text" className="form-control" name='meta_title' value={service.meta_title} onChange={handleChange} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Meta Description</label>
                                            <input type="text" className="form-control" name='meta_description' value={service.meta_description} onChange={handleChange} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Meta Keywords</label>
                                            <input type="text" className="form-control" name='meta_keywords' value={service.meta_keywords} onChange={handleChange} />
                                        </div>
                                        <button type='submit' className="btn btn-success">Update</button>
                                    </form>
                                    {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
            <AdminFooter />
        </>
    );
};

export default EditService;
