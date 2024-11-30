import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ENV from '../config.json';

const ServiceIcon = ({ icon }) => {
    const [iconData, setIconData] = useState(null);
    const api = `${ENV.BASE_URL}icons/${icon}`;
    useEffect(() => {
        const fetchIcon = async () => {
            try {
                const response = await axios.get(api);
                setIconData(response.data);
            } catch (error) {
                console.error('Error fetching icon:', error);
            }
        };

        fetchIcon();
    }, [api]);

    return (
        <>
            {iconData && (
                <img src={`${ENV.BASE_URL}${iconData.image}`} className='service-icon' alt={iconData.name} />
            )}
        </>
    );
};

export default ServiceIcon;
