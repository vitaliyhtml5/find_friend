'use strict';

// Signup for a new user 
import {showAlert} from './alerts.js';
import {chooseAvatar, getSrcAvatar} from './choose_avatar.js';
import {showPassword} from './show_password.js';

const firstStep = document.querySelector('.first-step');
const firstStepBtn = document.querySelector('.first-step button');
const secondStep = document.querySelector('.second-step');
const secondStepBtn = document.querySelector('.second-step button');
const inputValue = document.querySelectorAll('.signup-wrap input');
secondStep.style.display = 'none';
let userDataFirst;

// Choose avatar
document.querySelector('.avatar-wrap').addEventListener('click', chooseAvatar);

firstStepBtn.addEventListener('click', (e) => {
    e.preventDefault();
    validateFirstStep();
});

secondStepBtn.addEventListener('click', (e) => {
    e.preventDefault();
    validateSecondStep();
});

function validateFirstStep() {
    const re = /[a-zA-Z]/;
    const reAge = /^[0-9]{1,3}$/;

    if (!inputValue[0].value || !inputValue[1].value || !inputValue[2].value) {
        showAlert(document.querySelector('.flash'),'Please fill all fields', false);
    } else if(isNaN(inputValue[1].value)) {
        showAlert(document.querySelector('.flash'),'Age should be a number', false);
    } else if (!re.test(inputValue[0].value) || !re.test(inputValue[2].value)) {
        showAlert(document.querySelector('.flash'),'Only English chars can be used', false);
    } else if (inputValue[0].value.length > 20 || inputValue[2].value.length > 20) {
        showAlert(document.querySelector('.flash'),'Max length is 20 chars', false);
    } else if (!reAge.test(inputValue[1].value)) {
        showAlert(document.querySelector('.flash'),'Max length for age is 3 chars', false);
    } else {
        userDataFirst = {
            name: inputValue[0].value,
            age: inputValue[1].value,
            hobby: inputValue[2].value,
            avatar: getSrcAvatar()
        }
        openSecondStep();
    }
    function openSecondStep() {
        firstStep.style.display = 'none';
        secondStep.style.display = 'block';
    }
}

function validateSecondStep() {
    const reEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (!inputValue[3].value || !inputValue[4].value || !inputValue[5].value) {
        showAlert(document.querySelector('.flash'),'Please fill all fields', false);
    } else if (!reEmail.test(inputValue[3].value)) {
        showAlert(document.querySelector('.flash'),'Email format is incorrect', false);
    } else if (inputValue[3].value.length > 20 || inputValue[4].value.length > 20 || inputValue[5].value.length > 20) {
        showAlert(document.querySelector('.flash'),'Max length is 20 chars', false);
    }  else if (inputValue[4].value !== inputValue[5].value) {
        showAlert(document.querySelector('.flash'),'The passwords are not equal', false);
    } else {
        checkUniqueEmail(inputValue[3].value);
    } 
    
    async function checkUniqueEmail(emailValue) {
        const email = {
            email: emailValue
        }
        const res = await fetch('/check_email', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(email)
        });
        const result = await res.json();

        if (result.message === 'email is used') {
            showAlert(document.querySelector('.flash'),'Email is already used', false);
        } else if (result.message === 'email is not used') {
            createAccount();
        }
    }

    async function createAccount() {
        const userData = {
            name: userDataFirst.name,
            age: userDataFirst.age,
            hobby: userDataFirst.hobby,
            avatar: userDataFirst.avatar,
            email: inputValue[3].value,
            password: inputValue[4].value
        }

        const res = await fetch('/create_account', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const result = await res.json();
        if (result.message === 'account was created') {
            logIn(userData.email, userData.password);
        }
    }

    async function logIn(email, password) {
        const userData = {
            email: email,
            password: password
        }
        const res = await fetch('/login_user', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        window.location.href = '/';
    }
   
    function openSecondStep() {
        firstStep.style.display = 'none';
        secondStep.style.display = 'block';
    }
}

document.querySelector('#confirm-password+i').addEventListener('click', showConfirmPassword);

function showConfirmPassword() {
    const pass = document.querySelector('#confirm-password');
    if (pass.type === 'password') {
        pass.type = 'text';
        this.style.backgroundImage = 'url(img/eye-disabled.svg)';
    } else {
        pass.type = 'password';
        this.style.backgroundImage = 'url(img/eye.svg)'
    } 
}

