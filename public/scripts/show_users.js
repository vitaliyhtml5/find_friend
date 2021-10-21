'use strict';
// Show table, pagination, sorting, search

import {sortFriends} from './sort_users.js';

const table = document.querySelector('.table-wrap table');
const tableBody = document.querySelector('.table-wrap tbody');
const pagination = document.querySelector('.pagination');

getAllFriends();
async function getAllFriends() {
    const res = await fetch('/show_all');
    const data = await res.json();
    showAll(data);
}

function showAll(data) {
    if (data !== '') {
        createTable(data, 0, 8);
    } else {
        table.style.display = 'none';
        // !!! add function for empty state
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