
var app = angular.module("proofood", []);

app.controller('ProofoodCtrl', function($scope, $http, $sce) {
	$scope.noData = false;
	$scope.selectedTab = 0;
	var parseQueryString = function() {
		var str = window.location.search;
		var objURL = {};

		str.replace(/([^?=&]+)(=([^&]*))?/g, function($0, $1, $2, $3) {
			objURL[$1] = $3;
		});
		return objURL;
	};
	var query = parseQueryString();
	
	var searchKeyword = function(keyword) {
		$scope.data = undefined;
		$scope.items = undefined;
		$scope.pages = undefined;
		$http.get('http://proofood.tw/search.json?' + keyword).then(function(resp) {
			if (resp.status == 200) {
				$scope.data = [];
				$scope.items = [];
				$scope.pages = [];
				_.each(resp.data, function(product) {
					$scope.items.push({ val: Object.keys(product)[0] });
					$scope.data.push(product[ Object.keys(product)[0] ]);
					var page = {
						total_pages: product.total_pages,
						total_count: product.total_count,
						current_page: product.current_page,
						pagination: []
					};
					var start = page.current_page - 4, goal = page.current_page + 4;
					for (var i = start; i <= goal; i++) {
						if (i > 0 && i <= page.total_pages) {
							page.pagination.push(i);
						}
					}
					$scope.pages.push(page);
				});
				$scope.noData = $scope.data.length == 0;
			}
		}, function() {
			console.log('fail');
		});
	};

	if (query.q) {
		$scope.q = decodeURI(query.q);
		console.log($scope.q);
		$scope.result = $scope.q.replace(/[,\s%2C]+/g, ' ');
		$scope.searchParams = 'q=' + $scope.q;

		searchKeyword('q=' + $scope.q);
	} else {
		$scope.data = [];
		$scope.noData = true;
	}

	function replaceURLWithHTMLLinks(text) {
		var re = /(\(.*?)?\b((?:https?|ftp|file):\/\/[-a-z0-9+&@#\/%?=~_()|!:,.;]*[-a-z0-9+&@#\/%=~_()|])/ig;
		return text.replace(re, function(match, lParens, url) {
			var rParens = '';
			lParens = lParens || '';
			var lParenCounter = /\(/g;
			while (lParenCounter.exec(lParens)) {
				var m;
				if (m = /(.*)(\.\).*)/.exec(url) ||
								/(.*)(\).*)/.exec(url)) {
					url = m[1];
					rParens = m[2] + rParens;
				}
			}
			return lParens + "<a href='" + url + "' target='_blank'>" + url + "</a>" + rParens;
		});
	}

	function genSearch(changeKey, pageIndex) {
		var search = [];
		_.each($scope.items, function(item, i) {
			search.push(item.val + 'page=' + (changeKey == item.val ? pageIndex : $scope.pages[i].current_page));
		});
		return search.join('&');
	}

	// 過濾掉 ',' and '■', 並將 url 轉成 link
	$scope.replaceSellChannel = function(str) {
		str = str.replace(/(<([^>]+)>)/ig, '')
			.replace(/,|■/g, '<br>')
			.replace('<br>', '');

		return $sce.trustAsHtml(replaceURLWithHTMLLinks(str));
	}

	$scope.prevTabPage = function(tabIndex) {
		if ($scope.pages[tabIndex].current_page == 1) {
			return;
		}
		$scope.searchParams = 'q=' + $scope.q + '&' + genSearch($scope.items[tabIndex].val, $scope.pages[tabIndex].current_page - 1 );
		searchKeyword($scope.searchParams);
		$scope.selectedTab = tabIndex;
	};

	$scope.toTabPage = function(tabIndex, page) {
		if (page < 1 || page > $scope.pages[tabIndex].total_pages) {
			return;
		}
		$scope.searchParams = 'q=' + $scope.q + '&' + genSearch($scope.items[tabIndex].val, page )
		searchKeyword($scope.searchParams);
		$scope.selectedTab = tabIndex;
	};

	$scope.nextTabPage = function(tabIndex) {
		if ($scope.pages[tabIndex].current_page == $scope.pages[tabIndex].total_pages) {
			return;
		}
		$scope.searchParams = 'q=' + $scope.q + '&' + genSearch($scope.items[tabIndex].val, $scope.pages[tabIndex].current_page + 1 );
		searchKeyword($scope.searchParams);
		$scope.selectedTab = tabIndex;
	};
});

