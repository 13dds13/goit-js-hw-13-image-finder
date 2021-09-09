import newFetch from './apiService';
import imgsMarkup from '../templates/photo-card.hbs'
const debounce = require('lodash.debounce');

let currentPage = 1;
let currentQuery = '';

const searchDiv = document.querySelector('#search-container');
const form = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const showMoreBtn = document.querySelector('#load-btn');

const onInput = e => {
    const query = e.target.value;
    
    if (!query) {
        return;
    }

    currentQuery = query;
    newFetch(query)
        .then(res => {
            galleryList.innerHTML = imgsMarkup(res);
            showMoreBtn.classList.remove('is-hidden');
        });
};


const onShowMoreBtnClick = () => {
    currentPage += 1;
    newFetch(currentQuery, currentPage)
        .then(res => galleryList.insertAdjacentHTML('beforeend', imgsMarkup(res)));

};

form.addEventListener('input', debounce(onInput, 750));
showMoreBtn.addEventListener('click', onShowMoreBtnClick);

