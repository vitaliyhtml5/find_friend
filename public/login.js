// Login
document.querySelector('.login-wrap button').addEventListener('click', logIn);
document.addEventListener('keypress', (event) => {
	if (event.code === 'Enter') logIn();
});
function logIn() {
	const input = document.querySelectorAll('.login-wrap input');
	const data = {
		email: input[0].value,
		password: input[1].value
	}
	fetch('http://127.0.0.1:3000/login_user', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(data => {
		if (data.code == 400 || data.code == 401) {
			showStatus(document.querySelector('.login-wrap span'),data.message);
		}
		if (data.code === 200) window.location.href = 'http://127.0.0.1:3000/';
	});
}

// Flash messages
function showStatus(text,data) {
	text.innerText = data;
	text.classList.add('flash-close');
	text.style.backgroundColor = '#f35e5e';
	setTimeout(() => text.classList.remove('flash-close'), 3100);
}

// Show password
document.querySelector('.login-wrap i').addEventListener('click', function(){
	const pass = document.querySelector('#password');
	if (pass.type === 'password') {
		pass.type = 'text';
		this.style.backgroundImage = 'url(img/eye-disabled.svg)';
	} else {
		pass.type = 'password';
		this.style.backgroundImage = 'url(img/eye.svg)'
	} 
});
