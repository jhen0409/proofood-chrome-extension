
var app = angular.module("proofood", []);

app.controller('ProofoodCtrl', function($scope, $http, $sce) {
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
		$http.get('https://proofood.herokuapp.com/search.json?q=' + keyword).then(function(resp) {
			if (resp.status == 200) {
				$scope.data = [];
				$scope.items = [];
				_.each(resp.data, function(product) {
					$scope.items.push({ val: Object.keys(product)[0] });
					$scope.data.push(product[ Object.keys(product)[0] ]);
				})
			}
		}, function() {
			console.log('fail');
		});
	};

	if (query.q) {
		$scope.q = decodeURI(query.q);
		$scope.result = $scope.q;

		searchKeyword($scope.q);
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
			.replace(/,|■/g, '');

		return $sce.trustAsHtml(replaceURLWithHTMLLinks(str));
	}
});

