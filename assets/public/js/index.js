
var app = angular.module("proofood", []);

app.controller('ProofoodCtrl', function($scope, $http, $sce) {
	$scope.noData = false;
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
		$http.get('http://proofood.tw/search.json?q=' + keyword).then(function(resp) {
			if (resp.status == 200) {
				$scope.data = [];
				$scope.items = [];
				_.each(resp.data, function(product) {
					$scope.items.push({ val: Object.keys(product)[0] });
					$scope.data.push(product[ Object.keys(product)[0] ]);
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

		searchKeyword($scope.q);
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

	// 過濾掉 ',' and '■', 並將 url 轉成 link
	$scope.replaceSellChannel = function(str) {
		str = str.replace(/(<([^>]+)>)/ig, '')
			.replace(/,|■/g, '<br>')
			.replace('<br>', '');

		return $sce.trustAsHtml(replaceURLWithHTMLLinks(str));
	}
});

