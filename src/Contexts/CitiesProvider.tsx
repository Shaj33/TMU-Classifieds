import { createContext, useContext, useEffect, useState } from 'react';


const CitiesContext = createContext<string[]>([]);

export const useCities = () => useContext(CitiesContext);

export const CitiesProvider = ({ children }: {children: any}) => {
    const [cities, setCities] = useState<string[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        country: 'Canada',
                        state: 'Ontario'
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    const cityNames = data.data || []; // Assuming the response data has a 'data' field containing city names
                    setCities(cityNames);
                } else {
                    console.error('Failed to fetch city data');
                }
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        };

        fetchCities();
    }, []);

    return (
        <CitiesContext.Provider value={cities}>
            {children}
        </CitiesContext.Provider>
    );
};
