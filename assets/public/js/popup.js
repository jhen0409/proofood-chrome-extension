function search() {
	var keyword = document.querySelector('.keyword').value;
	if (keyword.trim()) {
		chrome.runtime.sendMessage({ type: 'keyword', data: keyword.split(' ') });
	}
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('.search-btn').addEventListener('click', search);
	document.querySelector('.keyword').addEventListener('keypress', function(event) {
		if (event.keyCode === 13) {
			search();
		}
	});
});