import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import InnerBanner from '../components/InnerBanner'
import Footer from '../components/Footer'
import about from '../assets/images/about.jpg'
import pp from '../assets/images/RVRZ7026.jpg'
import ppreddy from '../assets/images/PPReddy.jpg'
import Achievement from '../components/Achievement'
import Preloader from '../components/Preloader'
import MetaTags from '../components/MetaTags'
import axios from 'axios'
import ENV from '../config.json'

const About = () => {
  const title = 'About us';
  const [loading, setLoading] = useState(true)
  const [meta, setMeta] = useState([])
  const api = ENV.BASE_URL

  useEffect(() => {

    setTimeout(() => {
      setLoading(false)
    }, 500);

    const fetchMeta = async () => {
      try {
        const response = await axios.get(api + 'meta/page/about')
        setMeta(response.data)
        console.log(meta)
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
            <div className="text-center mb-5">
              <h4 className='display-5 fw-semibold text-first'>PP Reddy</h4>
              <h1 className='display-4 fw-bold text-first'>Rehabilitation Centre in Hyderabad</h1>
            </div>
            <div className="row g-3">
              <div className="col-md-6 my-auto" data-aos="fade-right">
                <p>PP Reddy Rehab Care is a unique facility with a resort style rehab care over a area of 4 acres with world class facilities near by shamshabad international airport hyderabad, we recognize the profound uniqueness of every individual's journey to recovery. Our approach is not merely about treating symptoms but about understanding each person's distinct needs, challenges, and aspirations. We stand as trailblazers in the realm of wellness, committed to reshaping the landscape of healthcare. Our ethos is deeply rooted in innovation, compassion, and an unwavering dedication to excellence. We believe in pushing boundaries, exploring new horizons, and revolutionizing the way healthcare is perceived and delivered.</p>
              </div>
              <div className="col-md-6 my-auto" data-aos="fade-left">
                <img src={about} className='w-100 rounded-4' alt="about" />
              </div>
              <div className="col-md-12" data-aos="fade-up">
                <p>With a team of visionary experts and access to cutting-edge technology, we are equipped to embark on this transformative journey with our patients. We harness the power of avant-garde tools and techniques to provide personalized care that goes beyond conventional treatment methods. Our goal is to illuminate the path to optimal health and well-being for each individual we serve. At PP Reddy Rehab Care, we don't just aim to heal bodies; we strive to inspire, empower, and guide individuals towards a brighter, healthier future, filled with vitality and renewed hope.</p>
              </div>
            </div>
          </div>
          <div className="bg-light">
            <div className="container py-5">
              <div className="row g-5">
                <div className="col-md-4" data-aos="fade-right">
                  <div className="card bg-white h-100 border-0 rounded-4 overflow-hidden shadow spy-card text-center">
                    <div className="card-body">
                      <i className="fa-solid fa-book fa-5x mb-3"></i>
                      <h4>Our Story</h4>
                      <p>Our journey began with a simple yet profound idea: to create a caring rehabilitation center. From humble origins, Sri.PP Reddy Rehab Care grew with a vision to redefine recovery. With unwavering compassion and commitment, our team and facilities have touched countless lives, helping individuals reclaim dignity and independence.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4" data-aos="fade-up">
                  <div className="card bg-white h-100 border-0 rounded-4 overflow-hidden shadow spy-card text-center">
                    <div className="card-body">
                      <i className="fa-solid fa-bullseye fa-5x mb-3"></i>
                      <h4>Our Mission</h4>
                      <p>Empowering individuals on their recovery journey is our mission. Through personalized programs and holistic support, we enhance quality of life. With compassion and excellence, we create a supportive environment where individuals feel motivated to overcome challenges and achieve their goals.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4" data-aos="fade-left">
                  <div className="card bg-white h-100 border-0 rounded-4 overflow-hidden shadow spy-card text-center">
                    <div className="card-body">
                      <i className="fa-solid fa-eye fa-5x mb-3"></i>
                      <h4>Our Vision</h4>
                      <p>We envision a future where everyone receives the care they deserve. Through advanced treatments, we aim for optimal recovery. Beyond individual care, we raise community awareness about rehabilitation's importance. Our vision is to empower individuals to reclaim independence and embrace life fully.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Achievement />
          <div className="bg-light">
            <div className="container py-5" data-aos="fade-up">
              <div className="text-center fade-in">
                <h4 className='display-4 fw-bold text-first'>Why Choose Us</h4>
                <h1 className='fs-4 mb-5'>Choosing Excellence: Why Opt for PP Reddy Rehab Care?</h1>
                <div className="row g-5">
                  <div className="col-md-4" data-aos="fade-right">
                    <div className="card h-100 p-3 shadow border-0 rounded-3 bg-white service">
                      <div className="card-body">
                        <i className="fas fa-user-cog fa-3x mb-3 text-third"></i>
                        <p className="text-first">Personalized care tailored to your unique needs.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4" data-aos="fade-up">
                    <div className="card h-100 p-3 shadow border-0 rounded-3 bg-white service">
                      <div className="card-body">
                        <i className="fas fa-cogs fa-3x mb-3 text-third"></i>
                        <p className="text-first">Innovative rehabilitation approaches for effective recovery.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4" data-aos="fade-left">
                    <div className="card h-100 p-3 shadow border-0 rounded-3 bg-white service">
                      <div className="card-body">
                        <i className="fas fa-users fa-3x mb-3 text-third"></i>
                        <p className="text-first">Experienced multidisciplinary team of professionals.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4" data-aos="fade-right">
                    <div className="card h-100 p-3 shadow border-0 rounded-3 bg-white service">
                      <div className="card-body">
                        <i className="fas fa-hospital fa-3x mb-3 text-third"></i>
                        <p className="text-first">First in hyderabad resort concept rehab care with State-of-the-art facilities for optimal treatment outcomes.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4" data-aos="fade-up">
                    <div className="card h-100 p-3 shadow border-0 rounded-3 bg-white service">
                      <div className="card-body">
                        <i className="fas fa-heart fa-3x mb-3 text-third"></i>
                        <p className="text-first">Dedicated commitment to your well-being and success in rehabilitation.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4" data-aos="fade-left">
                    <div className="card h-100 p-3 shadow border-0 rounded-3 bg-white service">
                      <div className="card-body">
                        <i className="fas fa-hands-helping fa-3x mb-3 text-third"></i>
                        <p className="text-first">Ensuring you receive the highest quality of support on your journey to recovery.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container py-5">
            <div className="text-center mb-3" data-aos="fade-up">
              <h4 className='display-4 fw-bold text-first'>We are one of the Best Rehabilitation Centre in Hyderabad</h4>
            </div>
            <div className="row fade-in">
              <div className="col-md-8 my-auto" data-aos="fade-right">
                <p>Sri P. Parvathal Reddy, a humble and dynamic personality, dedicated his life to building a business empire through sheer hard work and determination. With a compassionate vision to give back to society, he embarked on an ambitious project to establish a rehabilitation center that offers world-class facilities. This vision materialized in the form of PP Reddy Rehab Care, situated on 4 acres of lush, green, and pollution-free land.</p>
                <p className='mb-0'>The center boasts state-of-the-art amenities and a serene environment, making it an ideal place for recovery and rejuvenation. Under his leadership, PP Reddy Rehab Care has become a beacon of hope, providing unparalleled care and support to its patients, and setting a new standard for rehabilitation services in the region.</p>
              </div>
              <div className="col-md-4 text-center my-auto" data-aos="fade-left">
                <img src={ppreddy} className='w-100 rounded-4' alt="pp" />
                <h6 className='mt-3'>Sri Pannala Parvathal Reddy</h6>
                <h6>Founder and Chairman of PP Reddy Trust</h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="container py-5">
            <div className="text-center mb-5" data-aos="fade-up">
              <h4 className='display-4 fw-bold text-first'>Organizational Driving Force</h4>
              {/* <h4 className='fs-4 mb-5'>The Engine Behind Our Organization: Meet the Driving Force of PP Reddy Rehab Care</h4> */}
            </div>
            <div className="row">
              <div className="col-md-5 text-center" data-aos="fade-right">
                <img src={pp} className='w-100 rounded-4' alt="pp" />
                <h6 className='mt-3'>Directors of PP Reddy Rehab Care</h6>
              </div>
              <div className="col-md-7" data-aos="fade-left">
                <p>Vamshidhar Reddy and Kiran Reddy, the sons of Shri P. P. Reddy, are the driving force behind PP Reddy Rehab Care. They stand as the strong pillars of this esteemed organization, channeling their dedication, innovation, and relentless effort into its growth and success. Their unwavering commitment has elevated PP Reddy Rehab Care to become a notable name and a trusted brand in Hyderabad.</p>
                <p>Under the dynamic leadership of Vamshidhar and Kiran, PP Reddy Rehab Care has not only expanded its services but also set a new benchmark in the field of rehabilitation. Their strategic vision and hands-on approach have enabled the center to flourish, achieving significant milestones and growing fourfold. Today, PP Reddy Rehab Care is recognized as the best rehabilitation center in South India, renowned for its exceptional patient care, advanced facilities, and holistic approach to rehabilitation.</p>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

export default About