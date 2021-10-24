'use strict';

// Empty state when there are no friends
function addEmptyState() {
    document.querySelector('.table-wrap table').style.display = 'none';
    document.querySelector('.search-wrap').style.display = 'none';
    document.querySelector('.show_all').classList.add('empty-state-main');
    document.querySelectorAll('.change_friend>*').forEach(el => el.style.visibility = 'hidden');
    document.querySelectorAll('.delete_friend>*').forEach(el => el.style.visibility = 'hidden');
    document.querySelector('.change_friend').classList.add('empty-state-alt');
    document.querySelector('.delete_friend').classList.add('empty-state-alt');
}

function removeEmptyState() {
    document.querySelector('.search-wrap').style.display = 'block';
    document.querySelector('.show_all').classList.remove('empty-state-main');
    document.querySelectorAll('.change_friend>*').forEach(el => el.style.visibility = 'visible');
    document.querySelectorAll('.delete_friend>*').forEach(el => el.style.visibility = 'visible');
    document.querySelector('.change_friend').classList.remove('empty-state-alt');
    document.querySelector('.delete_friend').classList.remove('empty-state-alt');
}

export {addEmptyState, removeEmptyState}