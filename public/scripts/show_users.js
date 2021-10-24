'use strict';
// Show table, pagination, sorting, search

import {sortFriends} from './sort_users.js';
import {searchFriends} from './search_users.js';
import {addEmptyState, removeEmptyState} from './empty_state.js';

const table = document.querySelector('.table-wrap table');
const tableBody = document.querySelector('.table-wrap tbody');
const pagination = document.querySelector('.pagination');

async function getAllFriends(user_id) {
    const res = await fetch(`/show_all?user_id=${user_id}`);
    const data = await res.json();
    if (data.length !== 0) {
        removeEmptyState();
        showAll(data);
    } else {
        addEmptyState();
    }
}

function showAll(data) {
    if (data.length !== 0) {
        table.style.display = 'table';
        createTable(data, 0, 8);
    }
}

function createTable(data, start = 0, end = data.length) {
    let trSet = '';
    if (end > data.length) {
        end = data.length;
    }
    for (let i = start; i < end; i++) {
        trSet += `<tr><td>${data[i].name}</td><td>${data[i].age}</td><td>${data[i].hobby}</td></tr>`;
    }
    tableBody.innerHTML = trSet;
    if (data.length > 8) {
        createPagination(data, start);
    } else {
        pagination.style.display = 'none';
    }
}

function createPagination(data, start = 0) {
    const pagination = document.querySelector('.pagination');
    let page = Math.floor(data.length/8);
    let pageBtn = '';

    for (let i = -1; i < page; i++) {
        pageBtn += `<button>${i+2}</button>`; 
    }
    pagination.style.display = 'flex';
    pagination.innerHTML = pageBtn;
    document.querySelectorAll('.pagination button')[start/8].classList.add('pagination-btn_active');

    document.querySelectorAll('.pagination button').forEach((el, index) => {
        el.addEventListener('click', () => {
            if (!el.classList.contains('pagination-btn_active')) {
                createTable(data, index*8, (index*8)+8);
            }
        });
    });
}

export {getAllFriends, showAll};