import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config';
import building from '../assets/images/building.png'
import ENV from '../config.json'
import Aos from 'aos';
import 'aos/dist/aos.css'

import Header from '../components/Header';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import MetaTags from '../components/MetaTags';
import ServiceIcon from '../components/ServiceIcon';
import Testimonials from '../components/Testimonials';
import Achievement from '../components/Achievement';
import Tables from '../components/Tables';
import HomeCarousel from '../components/HomeCarousel';
import VideoGalleries from '../components/VideoGalleries';
import HomeBlogs from '../components/HomeBlogs';

const Home = () => {
  const [services, setservices] = useState([])
  const api = ENV.BASE_URL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    service: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true)
  const [meta, setMeta] = useState([])
  const [studios, setstudios] = useState([])

  useEffect(() => {
    Aos.init({ duration: 2000 });

    setTimeout(() => {
      setLoading(false)
    }, 100);

    const fetchMeta = async () => {
      try {
        const response = await axios.get(api + 'meta/page/home')
        setMeta(response.data)
      } catch (error) {
        console.log("Error fetching meta:" + error)
      }
    }

    fetchMeta()

    const fetchServices = async () => {
      try {
        const response = await axios.get(api + 'services/home');
        setservices(response.data);
      } catch (error) {
        console.log("Error fetching service:" + error);
      }
    };

    fetchServices();

    const fetchStudio = async () => {
      try {
        const response = await axios.get(api + 'studios');
        setstudios(response.data);
      } catch (error) {
        console.log("Error fetching studio:" + error);
      }
    };

    fetchStudio();

  }, []);


  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const currentDate = new Date().toISOString().slice(0, 10);
      const postData = { ...formData, posted_date: currentDate };

      const response = await axios.post(`${BASE_URL}/appointment/create`, postData);
      setMessage('Your request is submitted.');
      setFormData({
        name: '',
        email: '',
        mobile: '',
        service: '',
      })
    } catch (error) {
      console.error('Error creating appointment:', error);
      setMessage('Something went wrong');
    }
  };

  return (
    <>
      <MetaTags meta={meta} />
      {loading ? <Preloader /> : (
        <>
          <Header />
          <HomeCarousel />
          <div className="bg-info-subtle d-none d-md-block">
            <div className="container py-5" data-aos="fade-up">
              <form onSubmit={handleSubmit}>
                <div className="row g-0 bg-first border border-first">
                  <div className="col-md">
                    <input type="text" className="form-control form-control-lg text-first border-first rounded-0" name='name' placeholder='Your Name' value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md">
                    <input type="email" className="form-control form-control-lg text-first border-first rounded-0" name='email' placeholder='Your Email' value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col-md">
                    <input type="tel" className="form-control form-control-lg text-first border-first rounded-0" name='mobile' placeholder='Your Mobile' value={formData.mobile} onChange={handleChange} required />
                  </div>
                  <div className="col-md">
                    <select className="form-control form-select form-control-lg text-first border-first rounded-0" name='service' value={formData.service} onChange={handleChange} required>
                      <option value="">Select service</option>
                      {services.map((item, index) => (
                        <option value={item.title} key={index}>{item.subtitle}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-md">
                    <button className="btn btn-first btn-lg w-100 border-first rounded-0">Submit</button>
                  </div>
                </div>
                {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">{message}</div>}
              </form>
            </div>
          </div>
          <div className="bg-light">
            <div className="container py-5">
              <div className="row g-3">
                <div className="col-md-6 my-auto py-3" data-aos="fade-right">
                  <h4 className='display-5 fw-semibold text-first'>PP Reddy</h4>
                  <h1 className='display-4 fw-bold text-first mb-3'>Rehabilitation Centre in Hyderabad</h1>
                  <p className='fs-5'>At PP Reddy Rehab Care, we understand that each individual’s journey to recovery is unique.we are trailblazers in the realm of wellness, dedicated to revolutionising the way you perceive healthcare.Our ethos is rooted in innovation, compassion and unwavering commitment to excellence.With a team of visionary experts and avant- garde technology at our disposal, we strive to illuminate the path to optimal health and well being.</p>
                  <Link className="btn btn-third rounded-pill px-5 text-uppercase fw-semibold" to="/about">Know more</Link>
                </div>
                <div className="col-md-6 my-auto" data-aos="fade-left">
                  <img src={building} className='w-100' alt="building" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <div className="container py-5" data-aos="fade-up">
              <div className="text-center">
                <h4 className="display-4 fw-bold text-first">PP Reddy Rehab Services</h4>
                <p className="fs-4 mb-5">PP Reddy Rehab Care offers a comprehensive range of rehabilitation services designed to promote healing and maximize potential.</p>
                <div className="row g-3">
                  {services.map((item, index) => (
                    <div className="col-6 col-sm-4 col-md-4 col-lg-2" key={index}>
                      <Link to={`services/${item.slug}`} className="card service shadow-sm rounded-4">
                        <div className="card-body">
                          <ServiceIcon icon={item.icon} />
                          <h6>{item.subtitle}</h6>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <Link className="btn btn-third rounded-pill mt-5 px-5 text-uppercase fw-semibold" to="/services">View all</Link>
              </div>
            </div>
          </div>
          <div className="doctors d-none d-md-block"></div>
          <Tables />
          <Testimonials />
          <div className="bg-light">
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
          </div>
          <VideoGalleries />
          <Achievement />
          <HomeBlogs />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
