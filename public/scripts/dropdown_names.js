'use strict';

import {showAlert} from './alerts.js';
import {getUserId} from '../script.js';
import {updateFriend} from './update_user.js';
import {deleteFriend} from './delete_user.js';

let chosenFriendEdit;
let chosenFriendDelete;
function showDropdown(menu) {
    chosenFriendEdit = false;
    chosenFriendDelete = false;
    getAllData();
    async function getAllData() {
        const res = await fetch(`/show_all?user_id=${getUserId()}`);
        const allData = await res.json();
        if (allData.length !== 0) {
            document.querySelectorAll('.change_friend>*').forEach(el => el.style.visibility = 'visible');
            document.querySelectorAll('.delete_friend>*').forEach(el => el.style.visibility = 'visible');
            document.querySelector('.change_friend').classList.remove('empty-state-alt');
            document.querySelector('.delete_friend').classList.remove('empty-state-alt');
            createFriendsList(allData);
        } else {
            document.querySelectorAll('.change_friend>*').forEach(el => el.style.visibility = 'hidden');
            document.querySelectorAll('.delete_friend>*').forEach(el => el.style.visibility = 'hidden');
            document.querySelector('.change_friend').classList.add('empty-state-alt');
            document.querySelector('.delete_friend').classList.add('empty-state-alt');
        }
    }
    
    // Create dropdown
    let ul;
    function createFriendsList(userNames) {
        ul = document.querySelector('.list-name');
        for(let i = 0; i < userNames.length; i++ ) {
            const li = document.createElement('li');
            ul.appendChild(li);
            li.classList.add('name-choose');
            li.textContent = userNames[i].name;
        }
        ul.addEventListener('click', (e) => {
            openDropdown(e,userNames)
        });
        document.querySelector('.name-friend i').addEventListener('click', openDropdown);
    }
    
    // Open and close dropdown
    function openDropdown(e, allData) {
        e.stopPropagation();
        document.querySelector('.content-wrap').addEventListener('click', () => {
            ul.scroll(0,0);
            ul.classList.remove('name-friend-expanced');
            document.querySelector('.name-friend i').classList.remove('icon-rotate');
        });
        ul.scroll(0,0);
        ul.classList.toggle('name-friend-expanced');
        document.querySelector('.name-friend i').classList.toggle('icon-rotate');
        chooseValueDropdown(allData);
    }

    // Choose value in dropdown
    function chooseValueDropdown(allData) {
        document.querySelectorAll('.name-choose').forEach( (el, index) => {
            el.onclick = () =>  {
                const userData = {
                    id: allData[index].id,
                    name: allData[index].name,
                    age: allData[index].age,
                    hobby: allData[index].hobby
                }
                if (menu === 'editFriend') {
                    changeFriend(userData);
                    chosenFriendEdit = true;
                } 
                if (menu === 'deleteFriend') {
                    chosenFriendDelete = true;
                    deleteChosenFriend(userData);
                }
            }
        });
    }
     // Empty data and id validation
    if (menu === 'editFriend') {
        const input = document.querySelectorAll('.change_friend input');
        document.querySelector('.change_friend button').onclick = () => {
            if (!chosenFriendEdit) {
                showAlert(document.querySelector('.change_friend .flash'),'Please choose a friend', false);
            }
        };
    }
    if (menu === 'deleteFriend') {
        document.querySelector('.delete_friend button').onclick = () => {
            if (!chosenFriendDelete) {
                showAlert(document.querySelector('.delete_friend .flash'),'Please choose a friend', false);
            }
        };
    }
}

// Change data of chosen friend
function changeFriend(userData) {
    const input = document.querySelectorAll('.change_friend input');
    input[0].value = userData.name;
    input[1].value = userData.age;
    input[2].value = userData.hobby;

    document.querySelector('.change_friend button').onclick = () => {
        const re = /[a-zA-Z]/;
        const reAge = /^[0-9]{1,3}$/;

        if (!input[0].value || !input[1].value || !input[2].value) {
            showAlert(document.querySelector('.change_friend .flash'),'Please fill all fields', false);
        } else if(isNaN(input[1].value)) {
            showAlert(document.querySelector('.change_friend .flash'),'Age should be a number', false);
        } else if (!re.test(input[0].value) || !re.test(input[2].value)) {
            showAlert(document.querySelector('.change_friend .flash'),'Only English chars can be used', false);
        } else if (input[0].value.length > 20 || input[2].value.length > 20) {
            showAlert(document.querySelector('.change_friend .flash'),'Max length is 20 chars', false);
        } else if (!reAge.test(input[1].value)) {
            showAlert(document.querySelector('.change_friend .flash'),'Max length for age is 3 chars', false);
        } else {
            updateUser();
        }
    };

    async function updateUser() {
        const userNewData = {
            id: userData.id,
            name: input[0].value,
            age: input[1].value,
            hobby: input[2].value,
            user_owner_id: getUserId()
        };
        const res = await fetch('/update_user', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userNewData)
        });
        const result = await res.json();
        if (result.message === 'user was updated') {
            showAlert(document.querySelector('.change_friend .flash'),'Friend was updated', true);
            chosenFriendEdit = false;
            input.forEach(el => el.value = '');
            updateFriend();
        } else {
            showAlert(document.querySelector('.change_friend .flash'),'Something went wrong', false);
        }
    }
}

// Delete a friend
function deleteChosenFriend(userData) {
    const td = document.querySelectorAll('.delete_friend .user-table td');
    td[0].textContent = userData.name;
    td[1].textContent = userData.age;
    td[2].textContent = userData.hobby;
    
    document.querySelector('.delete_friend button').onclick = removeFriend;
    
    async function removeFriend() {
        const res = await fetch(`/delete_user?id=${userData.id}&user_owner_id=${getUserId()}`, {
            method: 'DELETE',
        });
        const result = await res.json();

        if (result.message === 'user was deleted') {
            showAlert(document.querySelector('.delete_friend .flash'),'Friend was removed', true);
            chosenFriendDelete = false;
            td.forEach(el => el.textContent = '');
            deleteFriend();
        } else {
            showAlert(document.querySelector('.delete_friend .flash'),'Something went wrong', false);
        }
    }
}

export {showDropdown};