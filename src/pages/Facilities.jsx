import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import InnerBanner from '../components/InnerBanner'
import Footer from '../components/Footer'
import Preloader from '../components/Preloader'
import MetaTags from '../components/MetaTags'
import { Link } from 'react-router-dom'

const Facilities = () => {
    const title = 'Facilities';
    const [loading, setLoading] = useState(true)
    const [meta, setMeta] = useState([])
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);

        const fetchMeta = async () => {
            try {
                const response = await axios.get(api + 'meta/page/facilities')
                setMeta(response.data)
            } catch (error) {
                console.log("Error fetching meta:" + error)
            }
        }

        fetchMeta()

    }, [])

    return (
        <>
            <MetaTags meta={meta} />
            {loading ? <Preloader /> : (
                <>
                    <Header />
                    <InnerBanner title={title} />
                    <div className="container py-5">
                        <h1>Pillars of Excellence:</h1>
                        <p>Experience the difference at PP Reddy Rehab Care, where we prioritize your journey to recovery with unwavering dedication. With a focus on excellence, we strive to elevate your care experience and empower you towards optimal health and wellness.</p>

                        <h1>State-of-the-Art Facilities:</h1>
                        <p>Benefit from our cutting-edge rehabilitation facilities designed to advance your recovery journey. Our state-of-the-art amenities provide the perfect environment for your rehabilitation, ensuring precision, comfort, and effective post-hospitalization support.</p>

                        <h1>Comprehensive Care:</h1>
                        <p>At PP Reddy Rehab Care, your well-being is paramount. Our comprehensive approach to post-hospitalization support goes beyond traditional therapies. Step into Ucchvas, our transitional care center, where personalized care and holistic well-being are prioritized to support your journey to recovery.</p>

                        <h1>Guided Healing Haven:</h1>
                        <p>Ucchvas serves as your sanctuary for guided healing and assisted recovery. With our compassionate team and nurturing environment, we're dedicated to supporting you every step of the way towards restored health and vitality. Your well-being is our top priority at PP Reddy Rehab Care.</p>
                        <div className="row g-5 mt-3">
                            <div className="col-sm-4 col-md-4 col-lg-3">
                                <Link to='/services' className="card service border-0 shadow-sm rounded-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-9">
                                                <h6>Services</h6>
                                            </div>
                                            <div className="col-3">
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-3">
                                <Link to='/blogs' className="card service border-0 shadow-sm rounded-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-9">
                                                <h6>Blogs</h6>
                                            </div>
                                            <div className="col-3">
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-3">
                                <Link to='/gallery' className="card service border-0 shadow-sm rounded-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-9">
                                                <h6>Image gallery</h6>
                                            </div>
                                            <div className="col-3">
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-3">
                                <Link to='/video' className="card service border-0 shadow-sm rounded-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-9">
                                                <h6>Video gallery</h6>
                                            </div>
                                            <div className="col-3">
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    )
}

export default Facilities