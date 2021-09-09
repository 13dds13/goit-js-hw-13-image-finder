import SearchOptions from './classSearchOptions'
import newFetch from './apiService';
import imgsMarkup from '../templates/photo-card.hbs'
const debounce = require('lodash.debounce');


const parent = '.search-container';
const searchData = new SearchOptions(parent, 'cat')

const { input, form, showMoreBtn, galleryList, errMsg } = searchData.refs

const onUserInput = e => {
    const userInput = e.target.value;
    if (!userInput) return

    searchData.query = userInput;
    searchData.page = 1;

    newFetch(searchData.queryParams())
        .then(res => {
            if (res.total === 0) {
                throw new Error('bad request!');
            }
            galleryList.innerHTML = imgsMarkup(res);
            showMoreBtn.classList.remove('is-hidden');
            errMsg.innerHTML = '';
        }).catch(res => errMsg.innerHTML = res);
};


const onShowMoreBtnClick = () => {
    searchData.page += 1;
    showMoreBtn.disabled = true;
    newFetch(searchData.queryParams())
        .then(res => {
            galleryList.insertAdjacentHTML('beforeend', imgsMarkup(res))
            showMoreBtn.disabled = false;
            showMoreBtn.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                });
        });
};

const onInputFocus = e => e.target.value = '';

form.addEventListener('input', debounce(onUserInput, 750));
showMoreBtn.addEventListener('click', onShowMoreBtnClick);
input.addEventListener('focus', onInputFocus);