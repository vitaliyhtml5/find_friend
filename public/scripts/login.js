'use strict'
//Login
import {showAlert} from './alerts.js';
import {showPassword} from './show_password.js';

const input = document.querySelectorAll('.login-wrap input');
const loginForm = document.querySelector('.login-wrap form');
const alert = document.querySelector('.login-wrap span');

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (!document.querySelector('#email').value || !document.querySelector('#password').value) {
        showAlert(document.querySelector('.flash'),'Please fill all fields', false);
    } else {
		logIn();
	}
});

async function logIn() {
	const userData = {
		email: input[0].value,
		password: input[1].value
	}
	const res = await fetch('/login_user', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(userData)
	});
	const data = await res.json();
	
	if (data.message === 'incorrect credentials') {
		showAlert(alert, 'Incorrect password or login', false);
	}

	if (data.message === 'access is allowed') {
		window.location.href = '/';
	}
}