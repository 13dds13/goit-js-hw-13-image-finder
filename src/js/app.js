import SearchOptions from './classSearchOptions'
import newFetch from './apiService';
import imgsMarkup from '../templates/photo-card.hbs'
const debounce = require('lodash.debounce');


const parentS = '.search-container';
const searchData = new SearchOptions(parentS);

const { input, form, showMoreBtn, galleryList, errMsg, parent } = searchData.refs;

const onUserInput = e => {
    e.preventDefault();

    const userInput = e.target.value;

    if (!userInput || e.target.key === 'Enter') return

    searchData.newQuerySet(userInput);
    searchData.resetPageNumb();

    newFetch(searchData.queryParams())
        .then(res => {
            if (res.total === 0) {
                throw new Error('bad request!');
            }
            galleryList.innerHTML = imgsMarkup(res);
            showMoreBtn.classList.add('show-more-btn');
            errMsg.innerHTML = '';
        }).catch(res => {
            errMsg.innerHTML = res;
            galleryList.innerHTML = '';
            showMoreBtn.classList.remove('show-more-btn');
            });
};


const onShowMoreBtnClick = () => {
    searchData.increasePageNumb();
    showMoreBtn.disabled = true;
    newFetch(searchData.queryParams())
        .then(res => {
            galleryList.insertAdjacentHTML('beforeend', imgsMarkup(res))
            showMoreBtn.disabled = false;
            parent.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                });
        });
};

const onInputFocus = e => {
    e.target.value = '';
    errMsg.innerHTML = '';
};

form.addEventListener('input', debounce(onUserInput, 750));
showMoreBtn.addEventListener('click', onShowMoreBtnClick);
input.addEventListener('focus', onInputFocus);