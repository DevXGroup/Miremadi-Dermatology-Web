import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Reset scroll to top when path changes
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};
