'use strict';

import {logOut} from './logout.js';
import {showAlert} from './alerts.js';

//Get profile data
getProfileData();
function getProfileData() {
	const profileFields = document.querySelectorAll('.profile-wrap td');
	const profileBtn = document.querySelector('.profile-wrap button');
	const overlayProfile = document.querySelector('.overlay-profile');
	const modalProfileValue = document.querySelectorAll('.overlay-profile input');
	const modalProfileBtn = document.querySelectorAll('.profile-btn-wrap button');
	let userId;
	
	getAccess();
	async function getAccess() {
		const res = await fetch('/get_access');
		const data = await res.json();
		
		if (data.message === 'Unauthorized') {
			window.location.href = '/error_pages/401';
		} else if (data.message === 'access is allowed') {
			userId = data.user.profile[0].id;
			getData();
		}	
	}

	async function getData() {
		const res = await fetch(`/get_profile_data?id=${userId}`);
		const data = await res.json();

		profileFields[0].textContent = data[0].name; 
		profileFields[1].textContent = data[0].age; 
		profileFields[2].textContent = data[0].hobby; 
		document.querySelector('.header-profile img').src = `img/user_avatar/avatar.jpg`;
		document.querySelector('.profile-wrap img').src = `img/user_avatar/avatar.jpg`;
	}

	profileBtn.addEventListener('click', () => {
		overlayProfile.classList.remove('hide-overlay');
		overlayProfile.classList.add('show-overlay');

		// Close profile modal
		modalProfileBtn[1].addEventListener('click', closeOverlay);
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				closeOverlay();
			}
		});
	});

	//Change profile
	modalProfileBtn[0].addEventListener('click', () => {
		const userData = {
			user_id: userId,
			user_name: modalProfileValue[0].value.trim(),
			user_age: modalProfileValue[1].value.trim(),
			user_hobby: modalProfileValue[2].value.trim(),
		}
		const re = /[a-zA-Z]/;
		const reAge = /^[0-9]{1,3}$/;

		if (!modalProfileValue[0].value || !modalProfileValue[1].value || !modalProfileValue[2].value) {
			showAlert(document.querySelector('.flash'),'Please fill all fields', false);
		} else if(isNaN(modalProfileValue[1].value)) {
			showAlert(document.querySelector('.flash'),'Age should be a number', false);
		} else if (!re.test(modalProfileValue[0].value) || !re.test(modalProfileValue[2].value)) {
			showAlert(document.querySelector('.flash'),'Only English chars can be used', false);
		} else if (modalProfileValue[0].value.length > 20 || modalProfileValue[2].value > 20) {
			showAlert(document.querySelector('.flash'),'Max length is 20 chars', false);
		} else if (!reAge.test(modalProfileValue[1].value)) {
			showAlert(document.querySelector('.flash'),'Max length for age is 3 chars', false);
		} else {
			changeProfile();
		}
		async function changeProfile() {
			const res = await fetch('/update_profile', {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(userData)
			});
			if (res.status === 200) {
				closeOverlay();
				getData();
				showAlert(document.querySelector('.flash'), 'Profile has been updated', true);
			} else if (res.status === 400) {
				showAlert(document.querySelector('.flash'), 'Please check filled data', false);
			}
		}
	});

	function closeOverlay() {
		overlayProfile.classList.remove('show-overlay');
		overlayProfile.classList.add('hide-overlay');
	}
}