import React, { useEffect, useState } from 'react'

const Achievement = () => {
    const [doctors, setDoctors] = useState(0)
    const [staff, setStaff] = useState(0)
    const [nurses, setNurses] = useState(0)
    const [patients, setPatients] = useState(0)
    const [beds, setBeds] = useState(0)
    const [physiotherapists, setPhysiotherapists] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setDoctors(prevDoctors => prevDoctors < 15 ? prevDoctors + 1 : prevDoctors);
            setStaff(prevStaff => prevStaff < 250 ? prevStaff + 1 : prevStaff);
            setNurses(prevNurses => prevNurses < 60 ? prevNurses + 1 : prevNurses);
            setPatients(prevPatients => prevPatients < 600 ? prevPatients + 1 : prevPatients);
            setBeds(prevBeds => prevBeds < 100 ? prevBeds + 1 : prevBeds);
            setPhysiotherapists(prevPhysiotherapists => prevPhysiotherapists < 30 ? prevPhysiotherapists + 1 : prevPhysiotherapists);
        }, 1);

        return () => {
            clearInterval(timer);
        };
    }, [])

    return (
        <>
            <div className="bg-first">
                <div className="container py-5">
                    <div className="text-center text-light">
                        <h4 className="display-4 fw-bold mb-5">PP Reddy in Number</h4>
                        <div className="row g-5 text-light">
                            <div className="col-sm-6 col-md-4" data-aos="fade-right">
                                <i className="fa-solid fa-user-doctor fa-3x mb-3"></i>
                                <h4 className='display-4'>{doctors}+</h4>
                                <h4 className="fs-4">Doctors including super specialists</h4>
                            </div>
                            <div className="col-sm-6 col-md-4" data-aos="fade-up">
                                <i className="fa-solid fa-user-nurse fa-3x mb-3"></i>
                                <h4 className='display-4'>{staff}+</h4>
                                <h4 className="fs-4">Staff to take care of patients</h4>
                            </div>
                            <div className="col-sm-6 col-md-4" data-aos="fade-left">
                                <i className="fa-solid fa-user-nurse fa-3x mb-3"></i>
                                <h4 className='display-4'>{nurses}+</h4>
                                <h4 className="fs-4">Nurses to attend to patients</h4>
                            </div>
                            <div className="col-sm-6 col-md-4" data-aos="fade-right">
                                <i className="fa-solid fa-user-injured fa-3x mb-3"></i>
                                <h4 className='display-4'>{patients}+</h4>
                                <h4 className="fs-4">Happy patients</h4>
                            </div>
                            <div className="col-sm-6 col-md-4" data-aos="fade-up">
                                <i className="fa-solid fa-bed-pulse fa-3x mb-3"></i>
                                <h4 className='display-4'>{beds}+</h4>
                                <h4 className="fs-4">Beds</h4>
                            </div>
                            <div className="col-sm-6 col-md-4" data-aos="fade-left">
                                <i className="fa-solid fa-running fa-3x mb-3"></i>
                                <h4 className='display-4'>{physiotherapists}+</h4>
                                <h4 className="fs-4">Physiotherapists</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Achievement