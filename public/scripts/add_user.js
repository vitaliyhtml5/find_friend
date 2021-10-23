'use strict';

// Add a new friend
import {showAlert} from './alerts.js';
import {getUserId} from '../script.js';

const input = document.querySelectorAll('.add_friend input');
document.querySelector('.add_friend button').addEventListener('click', addFriend);
function addFriend() {
    const re = /[a-zA-Z]/;
    const reAge = /^[0-9]{1,3}$/;

    if (!input[0].value || !input[1].value || !input[2].value) {
        showAlert(document.querySelector('.add_friend .flash'),'Please fill all fields', false);
    } else if(isNaN(input[1].value)) {
        showAlert(document.querySelector('.add_friend .flash'),'Age should be a number', false);
    } else if (!re.test(input[0].value) || !re.test(input[2].value)) {
        showAlert(document.querySelector('.add_friend .flash'),'Only English chars can be used', false);
    } else if (input[0].value.length > 20 || input[2].value.length > 20) {
        showAlert(document.querySelector('.add_friend .flash'),'Max length is 20 chars', false);
    } else if (!reAge.test(input[1].value)) {
        showAlert(document.querySelector('.add_friend .flash'),'Max length for age is 3 chars', false);
    } else {
        addNewUser();
    }
}

async function addNewUser() {
    const userData = {
		name: input[0].value,
		age: input[1].value,
		hobby: input[2].value,
        user_id: getUserId()
	};

    const res = await fetch('/add_user', {
        method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(userData)
    });

    const result = await res.json();
    if (result.message === 'user was added') {
        input.forEach(el => el.value = '');
        showAlert(document.querySelector('.add_friend .flash'),'Friend was added', true);
    }
}
export {addFriend};
