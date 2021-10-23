'use strict';

import {getAllFriends} from './scripts/show_users.js';
import {addFriend} from './scripts/add_user.js';
import {logOut} from './scripts/logout.js';

getAccessIndex();
let userId;

async function getAccessIndex() {
    const res = await fetch('/get_access');
    const data = await res.json();
    
    if (data.message === 'Unauthorized') {
        window.location.href = '/login';
    } else if (data.message === 'access is allowed') {
        const resProfile = await fetch(`/get_profile_data?id=${data.user.profile[0].id}`);
        const profileData = await resProfile.json();
        document.querySelector('.header-profile img').src = `img/user_avatar/${profileData[0].avatar}`;
        userId = data.user.profile[0].id;
        getAllFriends(getUserId()); 
    }
}

const getUserId = () => userId;

// Change tabs
const tabs = document.querySelectorAll('.aside-list li');
const contentBlock = document.querySelectorAll('.content-block');

tabs.forEach((el, index) => {
	el.addEventListener('click', () => {
        if (!el.classList.contains('aside-checked') && index !== 1) {
            getAllFriends(userId);
        }

		tabs.forEach(tab => tab.classList.remove('aside-checked'));
		el.classList.add('aside-checked');

		contentBlock.forEach(el => el.classList.remove('content-block_visible'));
		contentBlock[index].classList.add('content-block_visible');
	});
});



export {getUserId};



// let idUser = false;
// document.querySelector('.change_friend button').addEventListener('click', changeFriend);
// function changeFriend() {
// 	const input = document.querySelectorAll('.change_friend input');
// 	const currentName = document.querySelector('.current-name');
// 	const data = {
// 		userId: idUser,
// 		name: input[0].value,
// 		age: input[1].value,
// 		hobby: input[2].value
// 	}
// 	fetch('http://127.0.0.1:3000/update_user', {
// 		method: 'PUT',
// 		headers: {
// 			'content-type': 'application/json'
// 		},
// 		body: JSON.stringify(data)
// 	})
// 	.then(res => res.json())
// 	.then(data => {
// 		showStatus(document.querySelector('.change_friend span'),data.message);
// 		getAllNames('.change-name-friend',true);
// 		idUser = false;
// 		if (data.code === 200) {
// 			input[0].value = '';
// 			input[1].value = '';
// 			input[2].value = '';
// 		}
// 	})
// 	.catch(err => err);
// }

// document.querySelector('.delete_friend button').addEventListener('click', deleteFriend);
// function deleteFriend() {
// 	const currentName = document.querySelector('.current-name');
// 	const data = {
// 		userId: idUser
// 	}
// 	fetch('http://127.0.0.1:3000/remove_user', {
// 		method: 'DELETE',
// 		headers: {
// 			'content-type': 'application/json'
// 		},
// 		body: JSON.stringify(data)
// 	})
// 	.then(res => res.json())
// 	.then(data => { 
// 		showStatus(document.querySelector('.delete_friend span'),data.message);
// 		document.querySelectorAll('.user-table td').forEach(el => el.innerText = '');
// 		getAllNames('.delete-name-friend');
// 		idUser = false;
// 	})
// 	.catch(err => err)
// }


// // Get all data for change
// tabs[2].addEventListener('click', () => getAllNames('.change-name-friend',true));
// tabs[3].addEventListener('click', () => getAllNames('.delete-name-friend'));

// function getAllNames(content,edit=false) {
// 	idUser = false;
// 	fetch('http://127.0.0.1:3000/show_users')
// 	.then(res => res.json())
// 	.then(data => {
// 		if (edit === true) fillListNames(data, content, true);
// 		else fillListNames(data, content, false);
// 	})
// 	.catch(err => err)
// }

// function fillListNames(data, content, edit) {
// 	const arrName = data.map(item => item.name);

// 	document.querySelector('.change-name-friend').innerHTML = ``;
// 	document.querySelector('.delete-name-friend').innerHTML = ``;

// 	document.querySelector(content).innerHTML = `<ul class="list-name"></ul><i class="material-icons">expand_more</i></div>`;

// 	const ul = document.querySelector('.list-name');
// 	ul.innerHTML = `<li class="current-name">Choose a friend</li>`;

// 	for(let i = 0; i < arrName.length; i++ ) {
// 		const li = document.createElement('li');
// 		ul.appendChild(li);
// 		li.classList.add('name-choose');
// 		li.innerText = arrName[i];
// 	}
// 	ul.addEventListener('click', openDropdown);
// 	document.querySelector('.name-friend i').addEventListener('click', openDropdown);

// 	function openDropdown(e) {
// 		e.stopPropagation();
// 		document.querySelector('.content-wrap'),addEventListener('click', () => {
// 			ul.scroll(0,0);
// 			ul.classList.remove('name-friend-expanced');
// 			document.querySelector('.name-friend i').classList.remove('icon-rotate');
// 		});
// 		ul.scroll(0,0);
// 		ul.classList.toggle('name-friend-expanced');
// 		document.querySelector('.name-friend i').classList.toggle('icon-rotate');
// 	}
// 	const nameItem = document.querySelectorAll('.list-name>li');
// 	document.querySelectorAll('.name-choose').forEach( (element, index) => {
// 		element.addEventListener('click', () => {
// 			prefillForm();
// 			function prefillForm() {
// 				if (edit === true) {
// 					const userFields = document.querySelectorAll('.change_friend input');
// 					userFields[0].value = data[index].name;
// 					userFields[1].value = data[index].age;
// 					userFields[2].value = data[index].hobby;
// 					idUser = data[index].id;
// 				}
// 				else {
// 					const deleteUserFields = document.querySelectorAll('.user-table td');
// 					deleteUserFields[0].innerText = data[index].name;
// 					deleteUserFields[1].innerText = data[index].age;
// 					deleteUserFields[2].innerText = data[index].hobby;
// 					idUser = data[index].id;
// 				}	
// 			}
// 		});
// 	});
// }