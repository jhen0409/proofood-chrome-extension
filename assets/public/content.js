var data = [];

var list = document.querySelector('.recipe-ingredients .ingredients').getElementsByTagName('li');
for (var i = 0; i < list.length; i++) {
	if (list[i].querySelector('.ingredient-name')) {
		data.push(list[i].querySelector('.ingredient-name').innerText);
	}
}

chrome.runtime.sendMessage({ type: 'data', data: data });
chrome.runtime.sendMessage({ type: 'contextMenus' });