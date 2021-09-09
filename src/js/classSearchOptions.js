export default class {

    constructor(parentSelector) {
        this.query = null;
        this.page = 1;
        this.refs = this.findRefs(parentSelector);
    }

    findRefs(parentSelector) {
            const parent = document.querySelector(parentSelector);
            const input = parent.querySelector('.search-input');
            const form = parent.querySelector('#search-form');
            const galleryList = parent.querySelector('.gallery');
        const showMoreBtn = parent.querySelector('#load-btn');
        const errMsg = parent.querySelector('.err-msg');
        return {parent, input, form, galleryList, showMoreBtn, errMsg};
    }

    queryParams() {
        const queryParams = new URLSearchParams({
            image_type: 'photo',
            orientation: 'horizontal',
            q: [this.query],
            page: [this.page],
            per_page: 12,
            key: '23300016-a284ec07e988de3edbd291fb8',
        });
        return queryParams;
    };

    increasePageNumb() {
        this.page += 1;
    }

    resetPageNumb() {
        this.page = 1;
    }

    newQuerySet(newQuery) {
        this.query = newQuery;
    }
}