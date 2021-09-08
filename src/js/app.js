import testFetch from './apiService';
import imgsMarkup from '../templates/photo-card.hbs'


const input = document.querySelector('#search-form');

const onInput = (e) => {
    const query = e.target.value;

    testFetch(query)
    .then(res => document.querySelector('.gallery').insertAdjacentHTML('beforeend', imgsMarkup(res)));

}

// input.addEventListener('input', onInput);  debounce!!!!!!!!!

