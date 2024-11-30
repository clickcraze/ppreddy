import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';
import ENV from '../../config.json';

const Editstudio = () => {
    const { slug } = useParams();
    const [studio, setStudio] = useState({
        title: '',
        subtitle: '',
        description: '',
        description1: '',
        short: '',
        image: '',
        image1: '',
        experts: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        slug: ''
    });
    const api = ENV.BASE_URL;
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudioData = async () => {
            try {
                const response = await axios.get(`${api}studios/${slug}`);
                setStudio(response.data);
            } catch (error) {
                console.error('Error fetching studio:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudioData();
    }, [api, slug]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudio({ ...studio, [name]: value });
    };

    const handlePhoto = (e) => {
        setStudio({ ...studio, image: e.target.files[0] });
    };

    const handlePhoto1 = (e) => {
        setStudio({ ...studio, image1: e.target.files[0] });
    };

    const handleEditorChange = (name, editor, setData) => {
        const data = editor.getData();
        setData(data);
        setStudio({ ...studio, [name]: data });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            function slugify(title) {
                return title.toLowerCase().replace(/\s+/g, '-');
            }
            const form = new FormData();
            form.append('title', studio.title);
            form.append('subtitle', studio.subtitle);
            form.append('description', studio.description);
            form.append('description1', studio.description1);
            form.append('short', studio.short);
            form.append('experts', studio.experts);
            form.append('slug', slugify(studio.title));
            form.append('meta_title', studio.meta_title);
            form.append('meta_description', studio.meta_description);
            form.append('meta_keywords', studio.meta_keywords);
            if (studio.image) {
                form.append('image', studio.image);
            }
            if (studio.image1) {
                form.append('image1', studio.image1);
            }
            await axios.put(`${api}studios/${slug}`, form);
            setSuccessMessage('Studio updated successfully');
            setTimeout(() => {
                navigate('/admin/studios');
            }, 2000);
        } catch (error) {
            console.error('Error updating studio:', error);
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
                            <h1 className="h2">Edit Studio</h1>
                        </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                        <div className="form-group mb-3">
                                            <label>Title</label>
                                            <input type="text" className="form-control" name='title' value={studio.title} onChange={handleChange} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Sub Title</label>
                                            <input type="text" className="form-control" name='subtitle' value={studio.subtitle} onChange={handleChange} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Description</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                name='description'
                                                data={studio.description}
                                                onChange={(event, editor) => handleEditorChange('description', editor, setStudio)}
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Description 1</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                name='description1'
                                                data={studio.description1}
                                                onChange={(event, editor) => handleEditorChange('description1', editor, setStudio)}
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Short description</label>
                                            <input type="text" className="form-control" name='short' value={studio.short} onChange={handleChange} />
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
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Experts message</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                name='experts'
                                                data={studio.experts}
                                                onChange={(event, editor) => handleEditorChange('experts', editor, setStudio)}
                                            />
                                        </div>
                                        <hr />
                                        <h4>SEO meta tags</h4>
                                        <div className="form-group mb-3">
                                            <label>Meta Title</label>
                                            <input type="text" className="form-control" name='meta_title' value={studio.meta_title} onChange={handleChange} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Meta Description</label>
                                            <input type="text" className="form-control" name='meta_description' value={studio.meta_description} onChange={handleChange} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Meta Keywords</label>
                                            <input type="text" className="form-control" name='meta_keywords' value={studio.meta_keywords} onChange={handleChange} />
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

export default Editstudio;
