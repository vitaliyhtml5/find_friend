'use strict';

// Sorting
import {showAll} from './show_users.js';
import {getUserId} from '../script.js';

const columnsArr = ['name', 'age', 'hobby', 'id'];
const sortBtn = document.querySelectorAll('.table-wrap th>span');

sortBtn.forEach( (el, index) => {
    el.addEventListener('click', () => {
        document.querySelector('.search-wrap input').value = '';
        document.querySelector('.search-wrap > label button').style.display = 'none';

        if (!el.classList.contains('asc-active') && !el.classList.contains('desc-active')) {
            sortFriends('/sort_friend_desc', columnsArr[index]);
            sortDefault();
            el.classList.add('desc-active');
        } else if (el.classList.contains('desc-active')) {
            sortFriends('/sort_friend_asc', columnsArr[index]);
            sortDefault();
            el.classList.add('asc-active');
            el.textContent = 'north';
        } else if (el.classList.contains('asc-active')) {
            sortFriends('/sort_friend_desc', columnsArr[index]);
            sortDefault();
            el.classList.add('desc-active');
            el.textContent = 'south';
        } 
    });
});

async function sortFriends(endpoint, column) {
    const res = await fetch(`${endpoint}?column=${column}&user_id=${getUserId()}`);
    const data = await res.json();
    showAll(data);
}

function sortDefault() {
    sortBtn.forEach(el => {
        el.classList.remove('desc-active');
        el.classList.remove('asc-active');
        el.textContent = 'south';
    });
}

document.querySelector('.search-wrap input').addEventListener('click', () => {
    sortFriends('/sort_friend_asc', columnsArr[3]);
    sortDefault();
});

export {sortFriends};