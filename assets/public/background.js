var searchData;
var window_id;

function popWindow(type) {
	if (type == 'data') {
		chrome.windows.create({
			url: 'index.html?q=' + searchData.join(','),
			type: 'popup',
			left: 50, top: 50,
			width: 800, height: 575
		}, function(win){
			window_id = win.id;
		});
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.type == 'data') {
		searchData = request.data;
	} else if (request.type == 'contextMenus') {
		chrome.contextMenus.create({
			id: 'proofood_context_menu',
			title: '以 proofood 查詢本頁',
			contexts: ['all']
		});
	}
});

chrome.contextMenus.onClicked.addListener(function(event){
	if (event.menuItemId == 'proofood_context_menu') {
		popWindow('data');
	}
});

chrome.browserAction.onClicked.addListener(function(tab){
	chrome.tabs.create({url: 'index.html'});
});