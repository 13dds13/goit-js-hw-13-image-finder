// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
// 23300016-a284ec07e988de3edbd291fb8 api-ket

export default async function (query, page = 1) {
    const BASE_URL = 'https://pixabay.com/api';
    
    const queryParams = new URLSearchParams({
        image_type: 'photo',
        orientation: 'horizontal',
        q: [query],
        page: [page],
        per_page: 12,
        key: '23300016-a284ec07e988de3edbd291fb8',
    });

    try {
        const res = await fetch(`${BASE_URL}/?${queryParams}`);
        return await res.json();
    } catch (error) {
        return error;
    };
};