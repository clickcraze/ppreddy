import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import ENV from '../config.json';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';

const SingleBlog = () => {
    const { slug } = useParams();
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState({
        title: '',
        description: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: ''
    });
    const api = ENV.BASE_URL + 'blogs/';
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${api}${slug}`);
                setBlog(response.data);
            } catch (error) {
                console.log('Error fetching blog:', error);
            }
        };

        fetchBlog();
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [slug]);
    const meta = { // Added meta object
        title: blog.meta_title,
        description: blog.meta_description,
        keywords: blog.meta_keywords
    };
    const htmlContent = blog.description
    return (
        <>
            <MetaTags meta={meta} />
            {loading ? <Preloader /> : (
                <>
                    <Header />
                    <div className="container py-5" data-aos="fade-up">
                        <img src={ENV.BASE_URL + blog.image} className='w-75 mb-3' alt={blog.title} />
                        <h2>{blog.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                    <Footer />
                </>

            )}
        </>
    )
}

export default SingleBlog