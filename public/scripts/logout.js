document.querySelector('.header-profile button').addEventListener('click',logOut);
function logOut() {
    fetch('http://127.0.0.1:3000/logout_user', {
		method: 'GET',
	})
    .then(res => res.json())
    .then(data => {
        if (data.code == 200) window.location.href = 'http://127.0.0.1:3000/login';
    });
}