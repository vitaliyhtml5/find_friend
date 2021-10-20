// Alerts messages

function showAlert(flash, data, success) {
	flash.textContent = data;
	flash.classList.add('flash-close');

	if (success === false) {
        flash.style.backgroundColor = '#f35e5e';
    } else {
        flash.style.backgroundColor = '#3e9f60';
    }
	setTimeout(() => flash.classList.remove('flash-close'), 3100);
}

export {showAlert};