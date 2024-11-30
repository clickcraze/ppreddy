import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import InnerBanner from '../components/InnerBanner'
import Footer from '../components/Footer'
import Preloader from '../components/Preloader'
import axios from 'axios';
import { BASE_URL } from '../config';
import MetaTags from '../components/MetaTags'

const Contact = () => {
  const [meta, setMeta] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [message, setMessage] = useState('');
  const title = 'Contact us'
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500);

    const fetchMeta = async () => {
      try {
        const response = await axios.get(BASE_URL + 'meta/page/contact')
        setMeta(response.data)
      } catch (error) {
        console.log("Error fetching meta:" + error)
      }
    }

    fetchMeta()
  }, [])

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

      const response = await axios.post(`${BASE_URL}contact/create`, postData);
      setMessage('Your request is submitted.');
      setFormData({
        name: '',
        email: '',
        mobile: '',
        message: '',
      })
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setMessage('Something went wrong');
    }
  };

  return (
    <>
      <MetaTags meta={meta} />
      {loading ? <Preloader /> : (
        <>
          <Header />
          <InnerBanner title={title} />
          <div className="container py-5">
            <div className="row">
              <div className="col-md-6" data-aos="fade-right">
                <h4 className='display-5 fw-semibold text-first'>Contact us</h4>
                <h1 className='display-4 fw-bold text-first mb-5'>Get in touch with PP Reddy Rehab care</h1>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link text-dark fs-4" href="tel:+919121333542"><i className="fa-solid fa-phone"></i>  +91 91213 33542</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-dark fs-4" href="tel:+919676816044"><i className="fa-solid fa-phone"></i>  +91 96768 16044</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-dark fs-4" href="tel:+919121333523"><i className="fa-solid fa-phone"></i>  +91 91213 33523</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-dark fs-4" href="tel:+919951333523"><i className="fa-solid fa-phone"></i>  +91 99513 33523</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-dark fs-4" href="mailto: ppreddyrehab@gmail.com"><i className="fa-solid fa-envelope"></i> ppreddyrehab@gmail.com</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-dark fs-4" href="#"><i className="fa-solid fa-location-dot"></i> Plot No: 42, Opp Balapur Police Station, RCI Road, Mallapur, Balapur, near by International Airport, Hyderabad</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-dark fs-4" href="tel:+919959631603"><i className="fa-solid fa-phone"></i> <small>For Location Coordination :</small> +91 99596 31603</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-dark fs-4" href="tel:+918008022910"><i className="fa-solid fa-phone"></i> <small>For Location Coordination :</small> +91 80080 22910</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6" data-aos="fade-left">
                <div className="card bg-info-subtle p-3 rounded-4 border-first right-left">
                  <div className="card-body text-first">
                    <form onSubmit={handleSubmit}>
                      <input type="text" className="form-control form-control-lg mb-3" name='name' placeholder='Your Name' value={formData.name} onChange={handleChange} required />
                      <input type="email" className="form-control form-control-lg mb-3" name='email' placeholder='Your Email' value={formData.email} onChange={handleChange} required />
                      <input type="tel" className="form-control form-control-lg mb-3" name='mobile' placeholder='Your Mobile' value={formData.mobile} onChange={handleChange} required />
                      <textarea className='form-control form-control-lg mb-3' name="message" rows="3" placeholder='Your Message' value={formData.message} onChange={handleChange}></textarea>
                      <button className="btn btn-first btn-lg w-100">Submit</button>
                    </form>
                    {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">{message}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.4747973357917!2d78.49470157390353!3d17.292626005530607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba3bc716cec49%3A0x96a4c8052544522!2sP%20P%20Reddy%20Rehabilitation%20Centre%20Hyderabad!5e0!3m2!1sen!2sin!4v1718125904138!5m2!1sen!2sin" className='googleMap fade-in' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <Footer />
        </>
      )}
    </>
  )
}

export default Contact