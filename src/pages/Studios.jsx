import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import Preloader from '../components/Preloader';
import ENV from '../config.json'
import axios from 'axios';
import InnerBanner from '../components/InnerBanner';
import MetaTags from '../components/MetaTags';

const Studios = () => {
    const title = 'Our Studio';
    const [meta, setMeta] = useState([]);
    const [studios, setstudios] = useState([])
    const [loading, setLoading] = useState(true)
    const api = ENV.BASE_URL
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 100);

        const fetchStudio = async () => {
            try {
                const response = await axios.get(api + 'studios');
                setstudios(response.data);
            } catch (error) {
                console.log("Error fetching studio:" + error);
            }
        };

        fetchStudio();

        const fetchMeta = async () => {
            try {
                const response = await axios.get(api + 'meta/page/studios')
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
                    <div className="container py-5" data-aos="fade-up">
                        <div className="row g-5 text-center justify-content-center">
                            {studios && studios.map((item, index) => (
                                <div className="col-6 col-sm-4 col-md-4" key={index}>
                                    <Link to={`/studios/${item.slug}`} className="card studio border-0 shadow rounded-4 h-100 text-decoration-none spy-card">
                                        <img src={`${ENV.BASE_URL}${item.image}`} className='card-img-top' alt={item.name} />
                                        <div className="card-body d-flex justify-content-center align-items-center">
                                            <h6 className='text-uppercase'>{item.subtitle}</h6>
                                        </div>
                                    </Link>
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

export default Studios