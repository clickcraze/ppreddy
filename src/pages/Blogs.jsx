import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import ENV from '../config.json';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';

const Blogs = () => {
    const api = ENV.BASE_URL
    const [meta, setMeta] = useState([]);
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState()
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);

        const fetchBlogs = async () => {
            try {
                const response = await axios.get(api + 'blogs');
                setBlogs(response.data);
            } catch (error) {
                console.log("Error fetching blog:" + error);
            }
        };

        fetchBlogs();

        const fetchMeta = async () => {
            try {
                const response = await axios.get(api + 'meta/page/blogs')
                setMeta(response.data)
            } catch (error) {
                console.log("Error fetching meta:" + error)
            }
        }

        fetchMeta()
    }, [])

    function stripHtmlTags(html) {
        const temporaryElement = document.createElement('div');
        temporaryElement.innerHTML = html;
        return temporaryElement.textContent || temporaryElement.innerText;
    }

    return (
        <>
            <MetaTags meta={meta} />
            {loading ? <Preloader /> : (
                <>
                    <Header />
                    <div className="container py-5" data-aos="fade-up">
                        <div className="row g-5 pt-3">
                            {blogs && blogs.map((item, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="card bg-light h-100 border-0 rounded-4 overflow-hidden shadow spy-card">
                                        <img src={ENV.BASE_URL + item.image} className="card-img-top" alt="blog" />
                                        <div className="card-body">
                                            <h4 className='text-third'>{item.title}</h4>
                                            <p className='mb-0'>{stripHtmlTags(item.description).slice(0, 99)}...</p>
                                        </div>
                                        <div className="card-footer bg-transparent">
                                            <Link to={`${item.slug}`} className="btn btn-third rounded-pill border-0 px-5 text-uppercase fw-semibold float-end">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    )
}

export default Blogs