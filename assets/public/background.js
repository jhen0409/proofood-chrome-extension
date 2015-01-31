var searchData;
var searchKeywordData;
var window_id;

function closeIfExist() {
	if (window_id > 0) {
		chrome.windows.remove(window_id);
		window_id = chrome.windows.WINDOW_ID_NONE;
	}
}

function popWindow(type) {
	closeIfExist();
	var options = {
		type: 'popup',
		left: 100, top: 100,
		width: 800, height: 575
	};
	if (type == 'data') {
		options.url = 'index.html?q=' + searchData.join(',');
		chrome.windows.create(options, function(win){
			window_id = win.id;
		});
	} else if (type == 'keyword') {
		options.url = 'index.html?q=' + searchKeywordData.join(',');
		chrome.windows.create(options, function(win){
			window_id = win.id;
		});
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch (request.type) {
		case 'data':
			searchData = request.data;
			break;
		case 'contextMenus':
			chrome.contextMenus.create({
				id: 'proofood_context_menu',
				title: '以 proofood 查詢本頁',
				contexts: ['all']
			});
			break;
		case 'keyword':
			searchKeywordData = request.data;
			popWindow('keyword');
			break;
		case 'proof-btn':
			popWindow('data');
			break;
	}
});

chrome.contextMenus.onClicked.addListener(function(event) {
	if (event.menuItemId == 'proofood_context_menu') {
		popWindow('data');
	}
});