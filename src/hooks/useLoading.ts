import { useState, useEffect } from 'react';

export const useLoading = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleLoadingChange = (event: CustomEvent) => {
            setLoading(event.detail);
        };

        window.addEventListener('loadingChange', handleLoadingChange as EventListener);
        return () => window.removeEventListener('loadingChange', handleLoadingChange as EventListener);
    }, []);

    return loading;
};