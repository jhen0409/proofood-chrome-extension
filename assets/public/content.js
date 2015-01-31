// load icook recipes data
var data = [];
var list = document.querySelector('.recipe-ingredients .ingredients').getElementsByTagName('li');
for (var i = 0; i < list.length; i++) {
	if (list[i].querySelector('.ingredient-name')) {
		data.push(list[i].querySelector('.ingredient-name').innerText);
	}
}

// send data to background
chrome.runtime.sendMessage({ type: 'data', data: data });

chrome.runtime.sendMessage({ type: 'contextMenus' });

// append proofood button
var btn = document.createElement('button');
btn.className = 'btn btn-warning';
btn.innerText = '食 Proof';
btn.style.float = 'right';
btn.onclick = function() {
	chrome.runtime.sendMessage({ type: 'proof-btn' });
};

document.querySelector('.recipe-ingredients').appendChild(btn)