export default async function (options) {
    const BASE_URL = 'https://pixabay.com/api';

    const res = await fetch(`${BASE_URL}/?${options}`);
    
    return await res.json();

};