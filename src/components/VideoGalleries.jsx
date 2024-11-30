import React from 'react'

const VideoGalleries = () => {
    const iframeProps = {
        allowFullScreen: true,
        referrerPolicy: "strict-origin-when-cross-origin"
    };
    return (
        <>
            <div className="bg-white">
                <div className="container py-5" data-aos="fade-up">
                    <div className="text-center">
                        <h4 className="display-4 fw-bold text-first">Video Galleries</h4>
                        <p className="fs-4 mb-5">Get the latest video galleries</p>
                        <div className="row g-5">
                            <div className="col-md-6" data-aos="fade-right">
                                <a className="video1 text-decoration-none" data-bs-toggle="modal" data-bs-target="#video1">
                                    <div className="text-white p-5 fw-bold text-start">
                                        <h4>PP Reddy - Best in India</h4>
                                        <p>Welcome to PP Reddy Rehabilitation Centre in Hyderabad, where we blend compassionate care with luxurious living for seniors.</p>
                                        <i className="fa-solid fa-circle-play fa-3x"></i>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6" data-aos="fade-left">
                                <a className="video2 text-decoration-none" data-bs-toggle="modal" data-bs-target="#video2">
                                    <div className="text-white p-5 fw-bold text-start">
                                        <h4>PP Reddy</h4>
                                        <p>PP Reddy Rehab Care, where expert rehabilitation services in Hyderabad empower patients on their journey to recovery.</p>
                                        <i className="fa-solid fa-circle-play fa-3x"></i>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="video1" aria-labelledby="video1Label" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <iframe className='w-100' height="360" src="https://www.youtube.com/embed/8J5rH6l3cuI?si=tkzThH-T9BKvqmSG" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" {...iframeProps}></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="video2" aria-labelledby="video2Label" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <iframe className='w-100' height="360" src="https://www.youtube.com/embed/Ll7rdw1uv8Y?si=Gm_3-tMVWteAodtT" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" {...iframeProps}></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoGalleries