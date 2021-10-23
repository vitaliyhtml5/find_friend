'use strict';

// Choose/change avatar in signup/profile menu
import {showAlert} from './alerts.js';

let avatarChosen = ['avatar.jpg'];

function chooseAvatar(uploadImage, userId) {
    const overlayAvatar = document.createElement('div');
    document.body.appendChild(overlayAvatar);
    overlayAvatar.innerHTML = `<div class="modal-avatar"><h3>Choose avatar</h3><div class="avatar-img-wrap"><img class="avatar-img_chosen" src="img/user_avatar/avatar.jpg"><img src="img/user_avatar/avatar_2.png"><img src="img/user_avatar/avatar_3.png"><img src="img/user_avatar/avatar_4.png"></div><div class="profile-btn-wrap"><button>Upload</button><button>Cancel</button></div>`;
    overlayAvatar.classList.add('overlay-avatar');
    overlayAvatar.classList.add('show-overlay');

    document.querySelectorAll('.avatar-img-wrap img').forEach(el => {
        el.addEventListener('click', () => {
            setDefaultAvatar();
            el.classList.add('avatar-img_chosen');
            avatarChosen = el.src.split('/').slice(-1);
        });
    });

    document.querySelectorAll('.overlay-avatar button')[0].addEventListener('click', () => {        
        getSrcAvatar();
        if (!uploadImage) {
            document.querySelector('.avatar-wrap img').src = `img/user_avatar/${avatarChosen}`;
        } else {
            changeProfileAvatar(avatarChosen, userId);
        }
        closeOverlay();
    });

    // Close profile modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeOverlay();
        }
    });
    document.querySelectorAll('.overlay-avatar button')[1].addEventListener('click',closeOverlay);
    function closeOverlay() {
		overlayAvatar.classList.remove('show-overlay');
		overlayAvatar.classList.add('hide-overlay');
        setTimeout(() => overlayAvatar.remove(), 500);
	}

    function setDefaultAvatar() {
        document.querySelectorAll('.avatar-img-wrap img').forEach(el => el.classList.remove('avatar-img_chosen'));
    }
}

let getSrcAvatar = () => avatarChosen[0];

async function changeProfileAvatar(img, userId) {
    const userData = {
        user_id: userId,
        user_avatar: img
    }
    const res = await fetch('/change_avatar', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    const result = await res.json();
    if (result.message === 'avatar was changed') {
        document.querySelector('.profile-wrap img').src = `img/user_avatar/${img}`;
        document.querySelector('.header-profile img').src = `img/user_avatar/${img}`;
        showAlert(document.querySelector('.flash'), 'Avatar has been changed', true);
    }
}

export {chooseAvatar, getSrcAvatar};