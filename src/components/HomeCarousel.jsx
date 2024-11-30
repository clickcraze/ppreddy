import React from 'react'
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import slide1 from '../assets/images/slide1.jpg'
import slide2 from '../assets/images/slide2.jpg'
import slide3 from '../assets/images/slide3.jpg'
import slide4 from '../assets/images/slide4.jpg'
import slide5 from '../assets/images/slide5.jpg'
import slide6 from '../assets/images/slide6.jpg'
import slide7 from '../assets/images/slide7.jpg'
import slide8 from '../assets/images/slide8.jpg'

const HomeCarousel = () => {
    return (
        <>
            <Carousel id="homeCarousel" fade touch={true} interval={5000}>
                <Carousel.Item>
                    <img className="d-block w-100 zoom-in" src={slide2} alt="slide2" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100 zoom-in" src={slide8} alt="slide8" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100 zoom-in" src={slide3} alt="slide3" />
                    <Carousel.Caption className="text-white bottom-top">
                        <h5 className="display-4 fw-bold">Advanced Medical Rehab Center</h5>
                        <p className="display-6 fw-semibold mb-1 mb-md-3">
                            South India's Premier Facility for Robotics, Aquatherapy, and Long-term ICU Care
                        </p>
                        <Link to="/studios/robotic-studio" className="btn btn-third">
                            Know More
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100 zoom-in" src={slide5} alt="slide5" />
                    <Carousel.Caption className="text-white bottom-top">
                        <h5 className="display-4 fw-bold">Advanced Medical Rehab Center</h5>
                        <p className="display-6 fw-semibold mb-1 mb-md-3">
                            South India's Leading Facility for Robotics, Aquatherapy, and Long-term ICU Care
                        </p>
                        <Link to="/studios/robotic-studio" className="btn btn-third">
                            Know More
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100 zoom-in" src={slide6} alt="slide6" />
                    <Carousel.Caption className="text-white bottom-top">
                        <h5 className="display-4 fw-bold">Long-term ICU</h5>
                        <p className="display-6 fw-semibold mb-1 mb-md-3">
                            Care Units with 24/7 Monitoring and Support with Advanced Rehab Facility
                        </p>
                        <Link to="/studios/long-term-icu" className="btn btn-third">
                            Know More
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100 zoom-in" src={slide7} alt="slide7" />
                    <Carousel.Caption className="text-white bottom-top">
                        <h5 className="display-4 fw-bold">Comprehensive Aquatherapy</h5>
                        <p className="display-6 fw-semibold mb-1 mb-md-3">
                            Revitalize, Heal, and Stay Fit with Hydrotherapy
                        </p>
                        <Link to="/studios/aqua-therapy" className="btn btn-third">
                            Know More
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100 zoom-in" src={slide4} alt="slide4" />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default HomeCarousel