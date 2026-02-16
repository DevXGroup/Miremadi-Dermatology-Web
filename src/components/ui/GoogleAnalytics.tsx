import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = "G-1H9WCXQ0R7"; // Miremadi Dermatology GA4 ID

export const GoogleAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Initialize GA4
        ReactGA.initialize(GA_MEASUREMENT_ID);
    }, []);

    useEffect(() => {
        // Track page view on route change
        ReactGA.send({ 
            hitType: "pageview", 
            page: location.pathname + location.search,
            title: document.title 
        });
    }, [location]);

    return null;
};
