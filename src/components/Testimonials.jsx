import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Reviews from '../pages/testimonials.json';
import user from '../assets/images/user.png'

const Testimonials = () => {
    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };
    return (
        <>
            <div className="testimonials">
                <div className="container py-5" data-aos="fade-up">
                    <div className="text-center text-light">
                        <h4 className="display-4 fw-bold">Testimonials</h4>
                        <p className="fs-4 mb-5">What our patience say about us?</p>
                    </div>
                    <div className="px-3">
                        <Slider {...settings}>
                            {Reviews.map((testimonial, index) => (
                                <div className='testimonial' key={index}>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-3 my-auto">
                                                    <img src={user} className='w-100 rounded-circle' alt="user" />
                                                </div>
                                                <div className="col-9 my-auto">
                                                    <h5>{testimonial.name}</h5>
                                                    <ul className="nav">
                                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                            <li className="nav-item" key={i}>
                                                                <a className="nav-link ps-0 pe-1 py-0 text-warning" href="#"><i className="fa fa-star"></i></a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <p className='mb-0'>{testimonial.role}</p>
                                                </div>
                                            </div>
                                            <p>{testimonial.testimonial}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonials