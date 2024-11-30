import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InnerBanner from '../components/InnerBanner';
import Preloader from '../components/Preloader';
import ENV from '../config.json';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import experts from '../assets/images/experts1.jpg';

const SingleStudio = () => {
    const { slug } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        service: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [studio, setStudio] = useState({
        title: '',
        subtitle: '',
        description: '',
        description1: '',
        experts: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: ''
    });
    const api = `${ENV.BASE_URL}studios/`;

    useEffect(() => {
        const fetchStudio = async () => {
            try {
                const response = await axios.get(`${api}${slug}`);
                setStudio(response.data);
            } catch (error) {
                console.log('Error fetching studio:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudio();
    }, [slug]);

    const title = studio.title;
    const htmlContent = studio.description;
    const htmlContent1 = studio.experts;
    const htmlContent2 = studio.description1;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDate = new Date().toISOString().slice(0, 10);
            const postData = { ...formData, posted_date: currentDate };

            const response = await axios.post(`${api}/appointment/create`, postData);
            setMessage('Your request is submitted.');
            setFormData({
                name: '',
                email: '',
                mobile: '',
                service: ''
            });
        } catch (error) {
            console.error('Error creating appointment:', error);
            setMessage('Something went wrong');
        }
    };

    const meta = {
        meta_title: studio.meta_title,
        meta_description: studio.meta_description,
        meta_keywords: studio.meta_keywords
    };

    return (
        <>
            <MetaTags meta={meta} />
            {loading ? <Preloader /> : (
                <>
                    <Header />
                    <InnerBanner title={studio.meta_title} />
                    <div className="page">
                        <div className="bg-info-subtle">
                            <div className="container py-5">
                                <div className="row">
                                    <div className="col-md-7 my-auto" data-aos="fade-right">
                                        <h2 className='mb-4'>{studio.title}</h2>
                                        <p>{studio.short}</p>
                                    </div>
                                    <div className="col-md-5 my-auto" data-aos="fade-left">
                                        <img src={ENV.BASE_URL + studio.image} className='w-100 rounded-4' alt={studio.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 py-5 mt-5" data-aos="fade-right">
                                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-info-subtle p-5" data-aos="fade-up" id='experts'>
                            <div className="container">
                                <h2 className='display-6 fw-semibold mb-3'>Request a Call Back</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-0">
                                        <div className="col-md-3">
                                            <input type="text" className="form-control form-control-lg rounded-0 border-first" name='name' placeholder='Your Name' value={formData.name} onChange={handleChange} required />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="email" className="form-control form-control-lg rounded-0 border-first" name='email' placeholder='Your Email' value={formData.email} onChange={handleChange} required />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="tel" className="form-control form-control-lg rounded-0 border-first" name='mobile' placeholder='Your Mobile' value={formData.mobile} onChange={handleChange} required />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="hidden" name="service" value={studio.title} />
                                            <button className="btn btn-first btn-lg rounded-0 border-first w-100">Submit</button>
                                        </div>
                                    </div>
                                </form>
                                {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">{message}</div>}
                            </div>
                        </div>
                        <div className="bg-white">
                            <div className="container py-5">
                                <div className="row">
                                    <div className="col-md-5" data-aos="fade-right">
                                        <img src={ENV.BASE_URL + studio.image1} className='w-100 rounded-4' alt={studio.title} />
                                    </div>
                                    <div className="col-md-7" data-aos="fade-left">
                                        <div dangerouslySetInnerHTML={{ __html: htmlContent2 }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-info-subtle">
                            <div className="container py-5">
                                <div className="row">
                                    <div className="col-md-7 my-auto" data-aos="fade-right">
                                        <h4 className='fw-semibold mb-4'>Consult our Experts</h4>
                                        <div dangerouslySetInnerHTML={{ __html: htmlContent1 }} />
                                        <a href='#experts' className="btn btn-third px-5 mb-3 mb-md-0 text-uppercase fw-semibold w-100">Book an Appointment</a>
                                    </div>
                                    <div className="col-md-5 my-auto" data-aos="fade-left">
                                        <img src={experts} className="w-100 rounded-4" alt="experts" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
};

export default SingleStudio;
