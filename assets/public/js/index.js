
var app = angular.module("proofood", []);

app.controller('ProofoodCtrl', function($scope, $http) {
	var parseQueryString = function() {
		var str = window.location.search;
		var objURL = {};

		str.replace(/([^?=&]+)(=([^&]*))?/g, function($0, $1, $2, $3) {
			objURL[$1] = $3;
		});
		return objURL;
	};
	var query = parseQueryString();
	$scope.items = [];
	if (query.q) {
		$scope.q = decodeURI(query.q);
		_.each(query.q.split(','), function(item) {
			$scope.items.push({ val: decodeURI(item) });
		});
		$scope.result = $scope.items.map(function(item) { return item.val; }).join(', ');
	}
	
	var searchKeyword = function(keyword) {
		$http.get('https://proofood.herokuapp.com/search.json?q=' + keyword).then(function(resp) {
			if (resp.status == 200) {
				$scope.data = resp.data;

				var tempItems = [];
				_.each($scope.items, function(item) {
					if (_.find($scope.data, function(p) {
						return !!p[item.val];
					})) {
						tempItems.push(item);
					}
				});
				$scope.items = tempItems;
			}
		}, function() {
			console.log('fail');
		});
	};

	searchKeyword($scope.q);
});