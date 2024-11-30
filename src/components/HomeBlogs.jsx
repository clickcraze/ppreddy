import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import ENV from '../config.json';

const HomeBlogs = () => {
    const api = ENV.BASE_URL
    const [blogs, setBlogs] = useState()
    useEffect(() => {

        const fetchBlogs = async () => {
            try {
                const response = await axios.get(api + 'blogs/home');
                setBlogs(response.data);
            } catch (error) {
                console.log("Error fetching blog:" + error);
            }
        };

        fetchBlogs();
    }, [])

    function stripHtmlTags(html) {
        const temporaryElement = document.createElement('div');
        temporaryElement.innerHTML = html;
        return temporaryElement.textContent || temporaryElement.innerText;
    }
    return (
        <>
            <div className="bg-white">
                <div className="container py-5" data-aos="fade-up">
                    <div className="text-center">
                        <h4 className="display-4 fw-bold text-first">Blogs</h4>
                        <p className="fs-4 mb-5">Get the latest blog</p>
                    </div>
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
                                        <Link to={`blogs/${item.slug}`} className="btn btn-third rounded-pill border-0 px-5 text-uppercase fw-semibold float-end">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link className="btn btn-third rounded-pill mt-5 px-5 text-uppercase fw-semibold" to="/blogs">View all</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeBlogs