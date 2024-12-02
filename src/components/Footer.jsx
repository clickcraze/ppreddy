import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo_white.png';
import whatsapp from '../assets/images/whatsapp.png';
import axios from 'axios';
import ENV from '../config.json'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [services, setservices] = useState([])
  const [studios, setstudios] = useState([])
  const api = ENV.BASE_URL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    service: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(api + 'services');
        setservices(response.data);
      } catch (error) {
        console.log("Error fetching service:" + error);
      }
    };

    fetchServices();
    const fetchStudios = async () => {
      try {
        const response = await axios.get(api + 'studios');
        setstudios(response.data);
      } catch (error) {
        console.log("Error fetching studio:" + error);
      }
    };

    fetchStudios();
    function handleScroll() {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
      <footer>
        <div className="bg-linear-gradient">
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-md-6 col-lg-3">
                <img src={logo} className='logo mb-3' alt="logo" />
                <p>At PP Reddy Rehab Care, we understand that each individual’s journey to recovery is unique.we are trailblazers in the realm of wellness, dedicated to revolutionising the way you perceive healthcare.</p>
              </div>
              <div className="col-md-6 col-lg-3">
                <h5 className='mb-3'>Company Info</h5>
                <ul className="nav flex-column menu">
                  <li className="nav-item">
                    <NavLink className="nav-link ps-0" to="/"><i className="fa-solid fa-minus"></i> Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link ps-0" to="/about"><i className="fa-solid fa-minus"></i> About</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link ps-0" to="/image"><i className="fa-solid fa-minus"></i> Images gallery</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link ps-0" to="/video"><i className="fa-solid fa-minus"></i> Videos gallery</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link ps-0" to="/blogs"><i className="fa-solid fa-minus"></i> Blogs</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link ps-0" to="/contact"><i className="fa-solid fa-minus"></i> Contact us</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link ps-0" to="/privacy-policy"><i className="fa-solid fa-minus"></i> Privacy Policy</NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link ps-0" href="https://www.ppreddyrehabcare.com/sitemap.xml"><i className="fa-solid fa-minus"></i> Sitemap</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 col-lg-3">
                <h5 className='mb-3'>Services</h5>
                <ul className="nav flex-column menu">
                  {services.map((item, index) => (
                    <li className='nav-item' key={index}>
                      <a className="nav-link ps-0" href={`/services/${item.slug}`} key={index}><i className="fa-solid fa-minus"></i> {item.subtitle}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-6 col-lg-3">
                <h5 className='mb-3'>Studios</h5>
                <ul className="nav flex-column menu">
                  {studios.map((item, index) => (
                    <li className='nav-item' key={index}>
                      <a className="nav-link ps-0" href={`/studios/${item.slug}`} key={index}><i className="fa-solid fa-minus"></i> {item.subtitle}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-primary-subtle">
        <div className="container">
          <div className="row">
            <div className="col-md-4 py-3 border-end border-dark my-auto">
              <h3 className='mb-0'>PP Reddy Rehabilitation Centre - Hyderabad.</h3>
            </div>
            <div className="col-md-4 py-3 border-end border-dark my-auto">
              <a className="text-decoration-none text-dark fs-5 fw-bold" href="mailto:ppreddyrehab@gmail.com">
                <p><i className="fa-solid fa-envelope"></i> ppreddyrehab@gmail.com</p>
              </a>
              <a className="text-decoration-none text-dark fs-5 fw-bold" href="tel:+919676816044">
                <p className='mb-0'><i className="fa-solid fa-phone"></i> +91 9160 191 794</p>
              </a>
              <a className="text-decoration-none text-dark fs-5 fw-bold" href="tel:+919121333523">
                <p className='mb-0'><i className="fa-solid fa-phone"></i> +91 9160 191 796</p>
              </a>
            </div>
            <div className="col-md-4 py-3 my-auto">
              <a className="text-decoration-none text-dark fs-5 fw-bold" href="#">
                <p className='mb-0'><i className="fa-solid fa-location-dot"></i> Plot No: 42, Opp Balapur Police Station, RCI Road, Mallapur, Balapur, near by International Airport, Hyderabad</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-first-hover mb-5 mb-md-0">
        <div className="container py-3">
          <div className="row">
            <div className="col-md-6 my-auto">
              <small className='mb-0 text-light'>Copyright © 2024 PP Reddy Rehab Care. All rights reserved.</small>
            </div>
            <div className="col-md-6 my-auto">
              <ul className="nav justify-content-start justify-content-md-end">
                <li className="nav-item">
                  <a className="nav-link text-light" href="https://www.facebook.com/profile.php?id=61559967482492" target='_blank'><i className="fa-brands fa-square-facebook"></i></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="https://www.instagram.com/ppreddyrehabcare/" target='_blank'><i className="fa-brands fa-square-instagram"></i></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="#" target='_blank'><i className="fa-brands fa-linkedin"></i></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="https://x.com/ppreddyrehab" target='_blank'><i className="fa-brands fa-square-x-twitter"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={`back-to-top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
        <i className="fa-solid fa-up-long"></i>
      </div>
      <a href='https://api.whatsapp.com/send?phone=919160191794' className="whatsapp" target='_blank'>
        <img src={whatsapp} alt="whatsapp" />
      </a>
      <div className="social right-left">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="https://www.facebook.com/profile.php?id=61559967482492" target="_blank"><i className="text-primary fa-brands fa-facebook-f"></i></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.instagram.com/ppreddyrehab/" target="_blank"><i className="text-danger fa-brands fa-instagram"></i></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" target="_blank"><i className="text-color fa-brands fa-linkedin-in"></i></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://x.com/ppreddyrehab" target="_blank"><i className="text-info fa-brands fa-x-twitter"></i></a>
          </li>
        </ul>
      </div>
      <div className="d-block d-md-none bg-white fixed-bottom border">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 p-1 text-center border-first border-end border-1">
              <a href="tel:+919160191794" className='text-decoration-none'>
                <i className="fa-solid fa-phone text-second fs-2"></i><br />
                <small className='text-first mb-0'>Call Now</small>
              </a>
            </div>
            <div className="col-6 p-1 text-center">
              <a href="#" className='text-decoration-none' data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="fa-regular fa-calendar-days text-second fs-2"></i><br />
                <small className='text-first mb-0'>Book an Appointment</small>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Book an appointment</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
                        <option value={item.title} key={index}>{item.title}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-md">
                    <button className="btn btn-first btn-lg w-100 border-first rounded-0">Submit</button>
                  </div>
                  <div className="col-md-12">
                    {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">{message}</div>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer