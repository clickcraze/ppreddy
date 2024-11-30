import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import InnerBanner from '../components/InnerBanner'
import Footer from '../components/Footer'
import Preloader from '../components/Preloader'
import MetaTags from '../components/MetaTags'
import { Link } from 'react-router-dom'

const Privacy = () => {
    const title = 'Privacy Policy';
    const [loading, setLoading] = useState(true)
    const [meta, setMeta] = useState([])
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);

        const fetchMeta = async () => {
            try {
                const response = await axios.get(api + 'meta/page/privacy')
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
                        <h1>Privacy Policy</h1>
                        <p><strong>Introduction</strong></p>
                        <p>Welcome to PP Reddy Rehab Care. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your data when you interact with our services.</p>

                        <h2>Information We Collect</h2>
                        <ul>
                            <li><strong>Personal Information:</strong> When you register or use our services, we may collect personal details such as your name, address, email, phone number, date of birth, and medical history.</li>
                            <li><strong>Health Information:</strong> As a healthcare provider, we collect specific health-related information to provide you with appropriate care and treatment.</li>
                            <li><strong>Usage Data:</strong> We may collect information about how you access and use our website, including your IP address, browser type, and pages visited.</li>
                        </ul>

                        <h2>How We Use Your Information</h2>
                        <ul>
                            <li><strong>Provision of Services:</strong> To deliver our rehabilitation services, manage your healthcare, and communicate with you about your treatment.</li>
                            <li><strong>Improvement of Services:</strong> To improve our services, understand patient needs, and enhance user experience.</li>
                            <li><strong>Legal Compliance:</strong> To comply with legal obligations and regulatory requirements.</li>
                            <li><strong>Marketing Communications:</strong> With your consent, to send you information about our services, events, and promotions.</li>
                        </ul>

                        <h2>Sharing Your Information</h2>
                        <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
                        <ul>
                            <li><strong>Healthcare Providers:</strong> To coordinate your care with other healthcare professionals.</li>
                            <li><strong>Service Providers:</strong> Who assist us in operating our website and delivering services (e.g., IT support, payment processors), under strict confidentiality agreements.</li>
                            <li><strong>Legal Authorities:</strong> If required by law or to protect our rights, property, or safety.</li>
                        </ul>

                        <h2>Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li><strong>Access Your Data:</strong> Request a copy of the personal information we hold about you.</li>
                            <li><strong>Correct Your Data:</strong> Ask us to correct any inaccuracies in your personal information.</li>
                            <li><strong>Delete Your Data:</strong> Request the deletion of your personal information, subject to certain conditions.</li>
                            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.</li>
                        </ul>

                        <h2>Data Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, and destruction.</p>

                        <h2>Cookies and Tracking Technologies</h2>
                        <p>Our website uses cookies and similar tracking technologies to enhance user experience and analyze site usage. You can manage your cookie preferences through your browser settings.</p>

                        <h2>Changes to This Privacy Policy</h2>
                        <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The revised policy will be posted on our website with the updated effective date.</p>

                        <h2>Contact Us</h2>
                        <p>If you have any questions or concerns about our Privacy Policy or your personal information, please contact us at:</p>
                        <p>
                            PP Reddy Rehab Care<br />
                            Plot No: 42, Opp Balapur Police Station, RCI Road, Mallapur, Balapur, Hyderabad<br />
                            +91 99513 33523<br />
                            ppreddytrust@gmail.com
                        </p>

                        <p>Thank you for trusting PP Reddy Rehab Care with your personal information. Your privacy and security are of utmost importance to us.</p>
                    </div>
                    <Footer />
                </>
            )}
        </>
    )
}

export default Privacy