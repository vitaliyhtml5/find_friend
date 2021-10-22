'use strict'
//Login
import {showAlert} from './alerts.js';
import {showPassword} from './show_password.js';

const input = document.querySelectorAll('.login-wrap input');
const loginForm = document.querySelector('.login-wrap form');
const alert = document.querySelector('.login-wrap span');

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	logIn();
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
	} else if (data.message !== 'access is allowed') {
		showAlert(alert, 'Please check data again', false);
	}

	if (data.message === 'access is allowed') {
		window.location.href = 'http://127.0.0.1:3000/';
	}


	// const token = await res.json();

	// let header = new Headers();
	// header.append('Authorization', `Bearer ${token.token}`)
	// const req = await fetch('/login', {
	// 	headers: header
	// });
}








// document.querySelector('.login-wrap button').addEventListener('click', logIn);
// document.addEventListener('keypress', (event) => {
// 	if (event.code === 'Enter') logIn();
// });
// function logIn() {
// 	const input = document.querySelectorAll('.login-wrap input');
// 	const data = {
// 		email: input[0].value,
// 		password: input[1].value
// 	}
// 	fetch('http://127.0.0.1:3000/login_user', {
// 		method: 'POST',
// 		headers: {
// 			'content-type': 'application/json'
// 		},
// 		body: JSON.stringify(data)
// 	})
// 	.then(res => res.json())
// 	.then(data => {
// 		if (data.code == 400 || data.code == 401) {
// 			showStatus(document.querySelector('.login-wrap span'),data.message);
// 		}
// 		if (data.code === 200) window.location.href = 'http://127.0.0.1:3000/';
// 	});
// }



