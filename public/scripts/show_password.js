'use strict';

// Show password
document.querySelector('#password+i').addEventListener('click', showPassword);

function showPassword() {
    const pass = document.querySelector('#password');
    if (pass.type === 'password') {
        pass.type = 'text';
        this.style.backgroundImage = 'url(img/eye-disabled.svg)';
    } else {
        pass.type = 'password';
        this.style.backgroundImage = 'url(img/eye.svg)'
    } 
}

export {showPassword};