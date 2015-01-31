
var app = angular.module("proofood", []);

app.controller('ProofoodCtrl', function($scope) {
	var parseQueryString = function() {
		var str = window.location.search;
		var objURL = {};

		str.replace(/([^?=&]+)(=([^&]*))?/g, function($0, $1, $2, $3) {
			objURL[$1] = $3;	
		});
		return objURL;
	};
	
	var query = parseQueryString();

	$scope.data = [];
	$scope.q = decodeURI(query.q);
	_.each(query.q.split(','), function(item) {
		$scope.data.push(decodeURI(item));
	});

	var searchKeyword = function() {

	};

	$scope.testdata = [
		{
			serial_number: "1040130962",
			name: "彩色甜椒(履歷)",
			url: "",
			provider: "保證責任雲林縣漢光果菜生產合作社",
			date: "2015/01/30",
			info: "■實體通路：愛買量販全國分店、家樂福(天母、經國、新店、北投和桂林分店)、大潤發全國分店、全聯福利中心(中南部分店)、頂好Wellcome超市部分分店■網路訂購：http://www.hankuan.org.tw"
		},
		{
			serial_number: "10401300338<",
			name: "甜椒-青椒",
			url: "",
			provider: "雲林縣西螺鎮蔬菜產銷班第85班",
			date: "2015/01/30",
			info: "■實體通路：愛買量販全國分店、家樂福(天母、經國、新店、北投和桂林分店)、大潤發全國分店、全聯福利中心(中南部分店)、頂好Wellcome超市部分分店■網路訂購：http://www.hankuan.org.tw"
		}
	]

});