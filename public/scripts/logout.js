'use strict'

document.querySelector('.header-profile button').addEventListener('click',logOut);

async function logOut() {
    const res = await fetch('/logout');
    window.location.href = '/login';
}

export {logOut};