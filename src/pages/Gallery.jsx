import React, { useEffect, useState, useMemo, useRef, lazy, Suspense } from 'react';
import axios from 'axios';
import ENV from '../config.json';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import InnerBanner from '../components/InnerBanner';
import MetaTags from '../components/MetaTags';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyLoad from 'react-lazyload';

const Footer = lazy(() => import('../components/Footer'));

const Gallery = () => {
    const title = 'Image Gallery';
    const api = ENV.BASE_URL;
    const [loading, setLoading] = useState(true);
    const [galleries, setGalleries] = useState({
        Rehabilitation: [],
        Aquatherapy: [],
        Events: [],
        HappyPatients: []
    });
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [meta, setMeta] = useState([]);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1.current);
        setNav2(sliderRef2.current);
    }, []);

    useEffect(() => {
        const categories = ['Rehabilitation', 'Aquatherapy', 'Events', 'Happy Patients', 'Other'];

        const fetchGalleryByCategory = (category) =>
            axios.get(`${api}gallery/category/${category}`)
                .then(response => ({ category, data: response.data }))
                .catch(error => {
                    console.log(`Error fetching gallery for category ${category}:`, error);
                    return { category, data: [] };
                });

        const fetchMeta = axios.get(`${api}meta/page/gallery`)
            .then(response => response.data)
            .catch(error => {
                console.log("Error fetching meta:", error);
                return [];
            });

        setTimeout(() => {
            setLoading(false)
        }, 500);
        Promise.all([
            ...categories.map(fetchGalleryByCategory),
            fetchMeta
        ]).then(results => {
            const newGalleries = results.slice(0, categories.length).reduce((acc, { category, data }) => {
                acc[category] = data;
                return acc;
            }, {});
            setGalleries(newGalleries);
            setMeta(results[results.length - 1]);
            setLoading(false);
        });
    }, [api]);

    const openLightbox = (image) => {
        setSelectedImage(image);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        setLightboxOpen(false);
    };

    const sliderSettings = useMemo(() => ({
        dots: true,
        lazyLoad: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }), []);

    const renderGallery = useMemo(() => (gallery) => (
        gallery.map(item => (
            <div key={item._id}>
                <button className="lightbox-trigger" onClick={() => openLightbox(item.image)}>
                    <LazyLoad height={200} offset={100} once>
                        <img src={`${ENV.BASE_URL}${item.image}`} alt={item.name} className="img-fluid" />
                    </LazyLoad>
                </button>
            </div>
        ))
    ), []);

    return (
        <>
            <MetaTags meta={meta} />
            {loading ? <Preloader /> : (
                <>
                    <Header />
                    <InnerBanner title={title} />
                    <div className="container-fluid py-5 text-center">
                        {Object.keys(galleries).map(category => (
                            <div key={category} className="card galleries border-first mb-5">
                                <div className="card-header bg-first text-white">
                                    <h4 className='mb-0'>{category == 'Happy Patients' ? 'Happy Residents' : category}</h4>
                                </div>
                                <div className="card-body p-5 pt-3">
                                    <Slider
                                        asNavFor={nav2}
                                        ref={sliderRef1}
                                        {...sliderSettings}
                                    >
                                        {renderGallery(galleries[category])}
                                    </Slider>
                                </div>
                            </div>
                        ))}
                    </div>
                    {lightboxOpen && (
                        <div className="lightbox">
                            <button className="close-lightbox" onClick={closeLightbox}>Close</button>
                            <img src={`${ENV.BASE_URL}${selectedImage}`} alt="Lightbox" />
                        </div>
                    )}
                    <Suspense fallback={<Preloader />}>
                        <Footer />
                    </Suspense>
                </>
            )}
        </>
    );
};

export default Gallery;
