function search() {
	var keyword = document.querySelector('.keyword').value;
	starting = false;
	if (keyword.trim()) {
		chrome.storage.local.set({ keyword: '' }, function() {
			chrome.runtime.sendMessage({ type: 'keyword', data: keyword.split(' ') });
		});
	}
}

document.addEventListener('DOMContentLoaded', function () {
	var starting = false;
	var keywordInput = document.querySelector('.keyword');
	chrome.storage.local.get('keyword', function(obj) {
		keywordInput.value = obj.keyword || '';
	});

	document.querySelector('.search-btn').addEventListener('click', search);
	document.querySelector('.keyword').addEventListener('keypress', function(event) {
		if (event.keyCode === 13) {
			search();
		} else {
			starting = true;
		}
	});
	document.querySelector('.keyword').addEventListener('keyup', function(event) {
		if (event.keyCode !== 13) {
			starting = true;
		}
	});

	setInterval(function(){ 
		if (starting) {
			chrome.storage.local.set({ keyword: document.querySelector('.keyword').value });
		}
	}, 100);
});