import axios from 'axios';

const api = axios.create({
    baseURL: 'https://restcountries.com/v3.1',
});

const fetchCountries = async () => {
    try {
        const response = await api.get('/all?fields=name,capital,flags,region,population,area,currencies,timezones,idd,car,languages,maps');
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
};


export default {
    fetchCountries,
};
