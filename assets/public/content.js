var data = [];

var list = document.querySelector('.recipe-ingredients .ingredients').getElementsByTagName('li');
for (var i = 0; i < list.length; i++) {
	var name = list[i].querySelector('.ingredient-name').innerText;
	var unit = list[i].querySelector('.ingredient-unit').innerText;
	data.push(name);
}

chrome.runtime.sendMessage({ type: 'data', data: data });
chrome.runtime.sendMessage({ type: 'contextMenus' });