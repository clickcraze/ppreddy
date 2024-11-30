import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import InnerBanner from '../components/InnerBanner';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import ENV from '../config.json';

const Video = () => {
    const title = 'Video Gallery';
    const [meta, setMeta] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = ENV.BASE_URL;

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);

        const fetchMeta = async () => {
            try {
                const response = await axios.get(api + 'meta/page/video')
                setMeta(response.data)
            } catch (error) {
                console.log("Error fetching meta:" + error)
            }
        }

        fetchMeta()
    }, []);

    return (
        <>
            <MetaTags meta={meta} />
            {loading ? (
                <Preloader />
            ) : (
                <>
                    <Header />
                    <InnerBanner title={title} />
                    <div className="container py-5">
                        <h1>{title}</h1>
                        <iframe src="https://85df8f8d153c4f76b9f5bac7ae7865db.elf.site" className='elfsight' frameborder="0"></iframe>
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
};

export default Video;
