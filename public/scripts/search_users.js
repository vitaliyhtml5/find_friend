'use strict';

// Search
import {showAll, getAllFriends} from './show_users.js';
import {getUserId} from '../script.js';

const input = document.querySelector('.search-wrap input');
const clearBtn = document.querySelector('.search-wrap > label button');
const tableSearchWrap = document.querySelector('.show_all .table-wrap');
const tableSearch = document.querySelector('.show_all .table-data');
const paginationSearch = document.querySelector('.pagination');

input.addEventListener('input', () => {
    if (input.value.length === 0) {
        clearBtn.style.display = 'none';
        showTable();
    } else if (input.value.length > 0) {
        clearBtn.style.display = 'block';
    } 
    
    if (input.value.length > 0) {
        searchFriends(input.value);
    } else {
        getAllFriends(getUserId());
    }
});

clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    showTable();
    getAllFriends(getUserId());
});

async function searchFriends(searchValue) {
    const res = await fetch(`/search_user?value=${searchValue}&user_id=${getUserId()}`);
    const data = await res.json();
    
    if (data.length === 0) {
        tableSearch.style.display = 'none';
        paginationSearch.style.display = 'none';
        tableSearchWrap.classList.add('search-empty');
    } else {
        showTable();
        showAll(data);
    }
}

function showTable() {
    tableSearchWrap.classList.remove('search-empty');
    tableSearch.style.display = 'table';
    paginationSearch.style.display = 'flex';
}

export {searchFriends};