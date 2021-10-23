'use strict';

// Choose/change avatar in signup/profile menu
let avatarChosen = ['avatar.jpg'];

function chooseAvatar() {
    const overlayAvatar = document.createElement('div');
    document.body.appendChild(overlayAvatar);
    overlayAvatar.innerHTML = `<div class="modal-avatar"><h3>Choose avatar</h3><div class="avatar-img-wrap"><img class="avatar-img_chosen" src="img/user_avatar/avatar.jpg"><img src="img/user_avatar/avatar_2.png"><img src="img/user_avatar/avatar_3.png"><img src="img/user_avatar/avatar_4.png"></div><button>Upload</button></div>`
    overlayAvatar.classList.add('overlay-avatar');
    overlayAvatar.classList.add('show-overlay');

    document.querySelectorAll('.avatar-img-wrap img').forEach(el => {
        el.addEventListener('click', () => {
            setDefaultAvatar();
            el.classList.add('avatar-img_chosen');
            avatarChosen = el.src.split('/').slice(-1);
        });
    });

    document.querySelector('.overlay-avatar button').addEventListener('click', () => {
        document.querySelector('.avatar-wrap img').src = `img/user_avatar/${avatarChosen}`;
        getSrcAvatar();
        closeOverlay();
    });

    // Close profile modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeOverlay();
        }
    });

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

export {chooseAvatar, getSrcAvatar};