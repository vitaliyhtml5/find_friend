'use strict';

import {getAllFriends} from './scripts/show_users.js';
import {addFriend} from './scripts/add_user.js';
import {updateFriend} from './scripts/update_user.js';
import {deleteFriend} from './scripts/delete_user.js';
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
        if (!el.classList.contains('aside-checked') && index === 0) {
            getAllFriends(userId);
        }
        if (!el.classList.contains('aside-checked') && index === 2) {
            updateFriend();
        }

        if (!el.classList.contains('aside-checked') && index === 3) {
            deleteFriend();
        }

		tabs.forEach(tab => tab.classList.remove('aside-checked'));
		el.classList.add('aside-checked');

		contentBlock.forEach(el => el.classList.remove('content-block_visible'));
		contentBlock[index].classList.add('content-block_visible');
	});
});

export {getUserId};