
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
		$scope.result = $scope.q

		searchKeyword($scope.q);
	}
});