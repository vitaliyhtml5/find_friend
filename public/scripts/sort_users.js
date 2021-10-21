'use strict';
// Sorting
import {showAll} from './show_users.js';

const columnsArr = ['name', 'age', 'hobby'];
const sortBtn = document.querySelectorAll('.table-wrap th>span');

sortBtn.forEach( (el, index) => {
    el.addEventListener('click', () => {
        sortDefault();
        if (!el.classList.contains('asc-active') && !el.classList.contains('desc-active')) {
            sortFriends('/sort_friend_desc', columnsArr[index]);
            el.classList.remove('sort-default');
            el.classList.add('desc-active');
        } else if (el.classList.contains('desc-active')) {
            sortFriends('/sort_friend_asc', columnsArr[index]);
            el.classList.remove('sort-default', 'desc-active');
            el.classList.add('asc-active');
            el.textContent = 'north';
        } else if (el.classList.contains('asc-active')) {
            sortFriends('/sort_friend_desc', columnsArr[index]);
            el.classList.remove('sort-default', 'asc-active');
            el.classList.add('desc-active');
            el.textContent = 'south';
        } 
    });
});

async function sortFriends(endpoint, column) {
    const res = await fetch(`${endpoint}?column=${column}`);
    const data = await res.json();
    showAll(data);
}

function sortDefault() {
    sortBtn.forEach(el => {
        el.classList.add('sort-default');
        el.textContent = 'south';
    });
}

export {sortFriends};