function search() {
	var data = document.querySelector('.keyword').value.split(' ');
	chrome.runtime.sendMessage({ type: 'keyword', data: data });
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('.search-btn').addEventListener('click', search);
	document.querySelector('.keyword').addEventListener('keypress', function(event) {
		if (event.keyCode === 13) {
			search();
		}
	});
});